const db = require("../config/db");

const removeLike = async (req, res) => {
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

  // 좋아요 제거 쿼리
  const QUERY2 = `
DELETE FROM LIKES
WHERE post_id = ? AND user_id = ?;
`;

  try {
    // 좋아요 제거
    const [result] = await db.execute(QUERY2, [postId, userId]);
    console.log(result);

    // 삭제된 레코드가 있으면 처리 완료
    if (result.affectedRows > 0) {
      return res.status(200).json({
        status: "success",
        message: "좋아요가 정상적으로 제거되었습니다.",
        data: null,
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "좋아요가 존재하지 않거나 이미 제거되었습니다.",
      });
    }
  } catch (error) {
    console.error("좋아요 처리 중 오류:", error);
    return res.status(500).json({
      status: "error",
      message: "좋아요 처리 중 문제가 발생했습니다. 다시 시도해주세요.",
    });
  }
};

module.exports = removeLike;
