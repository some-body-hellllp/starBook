const db = require("../config/db");

async function userModify(req, res) {
  const userData = req.body;
  console.log("요청 데이터:", userData);

  const { id, currentNickname, newNickname } = userData;

  // 1. 유효성 검사
  if (!id || !currentNickname || !newNickname) {
    return res.status(400).json({
      status: "error",
      message: "필수 데이터가 누락되었습니다.",
      data: null,
    });
  }

  if (currentNickname === newNickname) {
    return res.status(409).json({
      status: "error",
      message: "같은 닉네임으로 변경할 수 없습니다.",
      data: null,
    });
  }

  const QUERY = `
    UPDATE 
        USERS
    SET 
        user_name = ?
    WHERE 
        user_id = ? AND user_name = ?;`;

  try {
    // 2. 쿼리 실행
    const [result] = await db.execute(QUERY, [newNickname, id, currentNickname]);

    console.log("쿼리 결과:", result);

    if (result.affectedRows > 0) {
      return res.status(200).json({
        status: "success",
        message: "닉네임이 변경되었습니다.",
        data: null,
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "닉네임 변경에 실패했습니다. 기존 닉네임을 확인해주세요.",
        data: null,
      });
    }
  } catch (error) {
    console.error("닉네임 변경 중 오류 발생:", error);
    return res.status(500).json({
      status: "error",
      message: "서버 오류가 발생했습니다.",
      data: null,
    });
  }
}

module.exports = userModify;
