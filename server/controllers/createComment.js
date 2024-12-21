const db = require("../config/db");
const { CurrentTime } = require("../config/date");

const createComment = async (req, res) => {
  const time = CurrentTime();
  const { postId, id, content, name } = req.body; // 클라이언트로부터 받은 데이터
  console.log(postId, id, content, name);
  // 유효성 검사
  if (!postId || !id || !content || !name) {
    return res.status(400).json({
      status: "error",
      message: " 잘못 된 접근입니다.",
    });
  }

  // 유저 존재 확인 쿼리
  const QUERY1 = `
      SELECT COUNT(*) AS userExists 
      FROM USERS 
      WHERE user_id = ? AND user_name = ?;
    `;

  try {
    // 유저 확인
    const [rows] = await db.execute(QUERY1, [id, name]);
    const userExists = rows[0].userExists;

    if (!userExists) {
      return res.status(404).json({
        status: "error",
        message: "해당 유저를 찾을 수 없습니다.",
      });
    }
  } catch (error) {
    console.error("유저 확인 중 오류:", error);
    return res.status(500).json({
      status: "error",
      message: "유저 확인 중 오류가 발생했습니다.",
    });
  }

  // 게시글 작성 쿼리
  const QUERY2 = `
      INSERT INTO COMMENTS (
      post_id,
      user_id, 
      user_name,
      comment_content,
      create_at)
      VALUES (?,?, ?, ?, ?);
    `;

  try {
    // 게시글 작성
    const [result] = await db.execute(QUERY2, [postId, id, name, content, time]);
    console.log(result);
    return res.status(201).json({
      status: "success",
      message: "댓글이 성공적으로 작성되었습니다.",
      data: { result },
    });
  } catch (error) {
    console.error("댓글 작성 중 오류:", error);
    return res.status(500).json({
      status: "error",
      message: "댓글 작성 중 오류가 발생했습니다.",
    });
  }
};

module.exports = createComment;
