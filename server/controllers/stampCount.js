const db = require("../config/db");

const stampCount = async (req, res) => {
  const { userId } = req.query; // 쿼리 파라미터로 userId 받음
  console.log("Received userId:", userId);

  if (!userId) {
    return res.status(400).json({ status: "error", message: "userId가 필요합니다.", data: null });
  }

  const QUERY = `
    SELECT
        stamp_location, stamp_type, create_at
    FROM
        STAMPS
    WHERE
        user_id=?
    ORDER BY
        create_at DESC
`;
  try {
    // 데이터베이스에서 stamp 정보를 가져옴
    const [stamp] = await db.execute(QUERY, [userId]);

    if (!stamp || stamp.length === 0) {
      return res.status(404).json({ status: "error", message: "스탬프 정보를 찾을 수 없습니다.", data: null });
    }
    console.log("스탬프 정보 전송");
    return res.json({ status: "success", message: "스탬프 정보를 전송하였습니다.", data: stamp });
  } catch (error) {
    console.error("DB 쿼리 에러:", error);
    return res.status(500).json({ status: "error", message: "서버 에러", data: null });
  }
};

module.exports = stampCount;
