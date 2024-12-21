const db = require("../config/db.js");

const comments = async (req, res) => {
  try {
    // SQL 쿼리 작성: 댓글과 유저의 프로필 사진을 가져옴
    const QUERY = `
      SELECT c.*, u.image_path 
      FROM COMMENTS c
      JOIN USERS u ON c.user_id = u.id
    `;

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
