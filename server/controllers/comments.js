const db = require("../config/db.js");

const comments = async (req, res) => {
  try {
    // SQL 쿼리 작성
    const QUERY = "SELECT * FROM COMMENTS";

    // db.execute로 쿼리 실행
    const [comments] = await db.execute(QUERY);

    // 결과 반환
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "댓글 목록을 가져오지 못했습니다." });
  }
};

module.exports = comments;
