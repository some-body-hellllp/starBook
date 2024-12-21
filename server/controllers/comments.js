const db = require("../config/db.js");

const comments = async (req, res) => {
  const { postId } = req.query; // 쿼리에서 postId 받아오기
  try {
    if (!postId) {
      return res.status(400).json({ error: "postId를 제공해야 합니다." });
    }

    // SQL 쿼리 작성: 특정 게시글에 해당하는 댓글과 유저 프로필 사진 가져오기
    const QUERY = `
      SELECT c.*, u.user_profile 
      FROM COMMENTS c
      JOIN USERS u ON c.user_id = u.user_id
      WHERE c.post_id = ?;
    `;

    // db.execute로 쿼리 실행, postId를 파라미터로 전달
    const [comments] = await db.execute(QUERY, [postId]);

    // 결과 반환
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "댓글 목록을 가져오지 못했습니다." });
  }
};

module.exports = comments;
