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
    return res.status(400).json({ status: "error", message: "id,qr,type 정보는 필수입니다", data: null });
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
        course_QR=?`;
  const course = await db.execute(QUERY1, [courseQr]).then((result) => result[0][0]);

  if (!course) {
    return res.status(404).json({ status: "error", message: "코스 정보가 없습니다.", data: null });
  }

  // 당일 방문한 코스인지 확인
  const QUERY2 = `
    SELECT
        user_id,
        stamp_location,
        stamp_type,
        create_at
    FROM
        STAMPS
    WHERE
        user_id = ? 
        AND
        stamp_location = ? 
        AND 
        stamp_type = ?
        AND
        DATE(REPLACE(REPLACE(create_at, '(', ''), ')', '')) = CURDATE() -- 괄호 제거 후 날짜 비교
    ORDER BY
        REPLACE(REPLACE(create_at, '(', ''), ')', '') DESC -- 괄호 제거 후 최신 순 정렬
    LIMIT 1;
  `;
  const [visitResult] = await db.execute(QUERY2, [loginUserId, course.course_name, courseQrType]);
  console.log(visitResult[0]);
  if (visitResult.length > 0 && courseQrType === "buy") {
    return res.status(409).json({ status: "error", message: "이미 결제한 서점입니다.", data: null });
  }

  if (visitResult.length > 0) {
    console.log("이미 방문한 서점입니다.");
    return res.status(409).json({ status: "error", message: "이미 방문한 서점입니다.", data: null });
  }

  // 스탬프 테이블에 컬럼 추가
  const QUERY3 = `
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
  await db.execute(QUERY3, [loginUserId, course.course_name, courseQrType, time]);

  return res.json({ status: "success", message: "QR 인증이 완료되었습니다.", data: null });
};

module.exports = visit;
