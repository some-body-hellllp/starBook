const db = require("../config/db");
const bcrypt = require("bcrypt");
const { CurrentTime } = require("../config/date");
async function join(req, res) {
  // body
  const loginId = req.body.code?.trim();
  const loginName = req.body.nickName?.trim();
  const loginProfile = req.body.profile?.trim();

  // 중복 검사 loginId
  const QUERY1 = `
        SELECT 
            user_id, user_login_id, user_login_pw, user_name
        FROM 
 	        USERS
        WHERE
            user_login_id = ?`;

  const user = await db.execute(QUERY1, [loginId]).then((result) => result[0][0]);
  // 계정이 존재함
  if (user) {
    return res.status(409).json({ status: "error", message: "이미 존재하는 계정 입니다.", data: null });
  }
  // 닉네임이 입력되지 않음
  if (!loginName) {
    return res.status(410).json({ status: "error", message: "이름은 필수입력 입니다.", data: null });
  }

  // 중복 검사 Isname
  const QUERY4 = `
   SELECT 
       user_id, user_login_id, user_login_pw, user_name
   FROM 
      USERS
   WHERE
       user_name = ?`;

  const Isname = await db.execute(QUERY4, [loginName]).then((result) => result[0][0]);
  if (Isname) {
    return res.status(409).json({ status: "error", message: "이미 존재하는 닉네임 입니다.", data: null });
  }
  // 비밀번호 암호화
  const encryptPw = await bcrypt.hash(loginId, 10);
  const time = CurrentTime();

  // console.log(`코드 : ${loginId},인코딩한 코드 : ${encryptPw},닉네임 : ${loginName},가입시간 : ${time}`);
  // 데이터베이스 사용자 정보 저장
  const QUERY2 = `
        INSERT INTO USERS
        (
	        user_login_id,
	        user_login_pw,
	        user_name,
          user_profile,
          create_at
        )
        VALUES
        (
            ?,
            ?,
            ?,
            ?,
            ?
        )`;

  await db.execute(QUERY2, [loginId, encryptPw, loginName, loginProfile, time]);

  // 성공 응답
  return res.status(200).json({ status: "success", message: "회원가입 성공", data: null });
}

module.exports = join;
