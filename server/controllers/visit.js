const db = require("../config/db");
const { CurrentTime } = require("../config/date");

const visit = async (req, res) => {
  const loginUserId = req.user.user_id;
  const courseQr = req.body.location;
  const courseQrType = req.body.qrType;
  console.log(req.body);

  // 생성 시간 설정
  const time = CurrentTime();

  if (!loginUserId || !courseQr || !courseQrType) {
    return res.status(400).json({ status: "error", message: "id, qr, type 정보는 필수입니다", data: null });
  }

  // QR 정보 유효성 확인
  const QUERY1 = `
    SELECT
        course_id,
        course_name,
        course_latitude,
        course_longitude,
        course_QR
    FROM
        COURSES
    WHERE
        course_QR=?
  `;
  const course = await db.execute(QUERY1, [courseQr]).then((result) => result[0][0]);

  if (!course) {
    return res.status(404).json({ status: "error", message: "코스 정보가 없습니다.", data: null });
  }

  // 하루 방문한 QR 인증 수 확인
  const QUERY2 = `
    SELECT COUNT(*) as visit_count
    FROM STAMPS
    WHERE
        user_id = ?
        AND DATE(REPLACE(REPLACE(create_at, '(', ''), ')', '')) = CURDATE()
  `;
  const [visitCountResult] = await db.execute(QUERY2, [loginUserId]);
  const visitCount = visitCountResult[0]?.visit_count || 0;

  if (visitCount >= 4) {
    return res.status(429).json({
      status: "error",
      message: "하루에 스탬프 적립은 최대 4번까지만 가능합니다.",
      data: null,
    });
  }

  // 당일 방문한 코스인지 확인
  const QUERY3 = `
    SELECT
        user_id,
        stamp_location,
        stamp_type,
        create_at
    FROM
        STAMPS
    WHERE
        user_id = ? 
        AND stamp_location = ? 
        AND stamp_type = ?
        AND DATE(REPLACE(REPLACE(create_at, '(', ''), ')', '')) = CURDATE()
    ORDER BY
        REPLACE(REPLACE(create_at, '(', ''), ')', '') DESC
    LIMIT 1;
  `;
  const [visitResult] = await db.execute(QUERY3, [loginUserId, course.course_name, courseQrType]);

  if (visitResult.length > 0 && courseQrType === "buy") {
    return res.status(409).json({ status: "error", message: "이미 결제한 서점입니다.", data: null });
  }

  if (visitResult.length > 0) {
    console.log("이미 방문한 서점입니다.");
    return res.status(409).json({ status: "error", message: "이미 방문한 서점입니다.", data: null });
  }

  // 스탬프 테이블에 컬럼 추가
  const QUERY4 = `
    INSERT INTO STAMPS
    (
        user_id,
        stamp_location,
        stamp_type,
        create_at
    )
    VALUES
    (
        ?,
        ?,
        ?,
        ?
    )
  `;

  // 방문한 코스 등록
  await db.execute(QUERY4, [loginUserId, course.course_name, courseQrType, time]);

  return res.json({ status: "success", message: "QR 인증이 완료되었습니다.", data: null });
};

module.exports = visit;
