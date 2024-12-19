const db = require("../config/db");

const stampCount = async (req, res) => {
  const { userId } = req.body;

  const QUERY = `
    SELECT
        stamp_location,stamp_type,create_at
    FROM
        STAMPS
    WHERE
        user_id=?
  `;
  const stamp = await db.execute(QUERY, [userId]).then((result) => result[0]);
  return res.json({ status: "success", message: "QR 인증이 완료되었습니다.", data: stamp });
};

module.exports = stampCount;
