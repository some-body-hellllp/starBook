const db = require("../config/db");
const { CurrentTime } = require("../config/date");
const visit = async (req, res) => {
  const loginUserId = req.user.user_id;
  const courseQr = req.body.location;
  const courseQrType = req.body.qrType;
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
  const visit = await db.execute(QUERY2, [loginUserId, course.course_name, courseQrType, time]);

  console.log(visit);

  if (visit.length > 0) {
    // visit에서 create_at 값 추출
    const visitTimeString = visit[0].create_at; // "2024-12-18 11:27:38"

    // 1. 문자열에서 괄호와 공백 제거
    const cleanedTime = time.replace(/[()]/g, "").trim(); // "2024-12-19 11:27:38"
    const cleanedVisitTime = visitTimeString.replace(/[()]/g, "").trim(); // "2024-12-18 11:27:38"

    // 2. 날짜만 추출 (시각을 제외)
    const currentDate = cleanedTime.split(" ")[0]; // "2024-12-19"
    const visitDate = cleanedVisitTime.split(" ")[0]; // "2024-12-18"

    // 3. Date 객체로 변환 (시각은 무시하고 날짜만 비교)
    const visitDateObj = new Date(visitDate);
    const currentDateObj = new Date(currentDate);

    // 4. 날짜 차이 계산
    const timeDifferenceInMilliseconds = currentDateObj - visitDateObj;
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 하루를 밀리초로 변환

    // 5. 하루 차이 여부 확인
    const isOneDayDifferent = Math.abs(timeDifferenceInMilliseconds) >= oneDayInMilliseconds;

    console.log(isOneDayDifferent); // true 또는 false
    if (!isOneDayDifferent) {
      return res.status(409).json({ status: "error", message: "이미 방문한 서점입니다.", data: null });
    }
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
