const db = require("../config/db.js");

const users = async (req, res) => {
  try {
    // SQL 쿼리 작성
    const QUERY = "SELECT * FROM USERS";

    // db.execute로 쿼리 실행
    const [users] = await db.execute(QUERY);

    // 결과 반환
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "사용자 목록을 가져오지 못했습니다." });
  }
};

module.exports = users;
