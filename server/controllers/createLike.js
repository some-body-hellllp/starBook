const db = require("../config/db");

const createLike = async (req, res) => {
  console.log(req.body);
  const data = {
    userId: req.body.id,
    postId: req.body.postId,
    name: req.body.name,
  };

  const userId = data.userId;
  const postId = data.postId;
  const name = data.name;

  // 유효성 검사
  if (!userId || !postId || !name) {
    return res.status(400).json({
      status: "error",
      message: "잘못된 접근 입니다.",
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
    const [rows] = await db.execute(QUERY1, [userId, name]);
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

  // 좋아요 처리 쿼리
  const QUERY2 = `
    INSERT INTO LIKES (post_id,user_id)
    VALUES (?,?);
  `;

  try {
    // 좋아요 처리
    const [result] = await db.execute(QUERY2, [postId, userId]);
    console.log(result);
    return res.status(201).json({
      status: "success",
      message: "좋아요 처리가 정상적으로 완료되었습니다.",
      data: null,
    });
  } catch (error) {
    console.error("좋아요 처리 중 오류:", error);
    return res.status(500).json({
      status: "error",
      message: "좋아요 처리 중 문제가 발생했습니다. 다시 시도해주세요.",
    });
  }
};

module.exports = createLike;
