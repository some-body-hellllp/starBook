const db = require("../config/db");
async function userModify(req, res) {
  const userData = req.body;

  console.log(userData);
  const { id, currentNickname, newNickname } = userData;

  if (currentNickname === null || currentNickname === newNickname) {
    return res.status(409).json({ status: "error", message: "같은 닉네임 입니다.", data: null });
  }
  const QUERY2 = `
    UPDATE 
        USERS
    SET 
        user_name = ?
    WHERE 
        user_id = ? AND user_name = ?;`;
  try {
    const CurrentNickName = await db.execute(QUERY2, [id, currentNickname, newNickname]);
    console.log(CurrentNickName);
    return res.status(200).json({ status: "success", message: "닉네임이 변경되었습니다", data: null });
  } catch (error) {
    console.log(error);
  }
}

module.exports = userModify;
