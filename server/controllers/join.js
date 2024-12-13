const db = require("../config/db");
const bcrypt = require("bcrypt");
const { CurrentTime } = require("../config/date");
async function join(req, res) {
  // body
  const loginId = req.body.id;
  const loginPw = req.body.pw;
  const name = req.body.name;

  // 서버 유효성검사 (필수), 클라이언트(react, html) 유효성검사 (선택)
  if (!loginId || !loginPw) {
    // 400 - Bad Request
    return res.status(400).json({ status: "error", message: "id, pw는 필수 입니다.", data: null });
  }

  // 중복 검사 loginId
  let QUERY1 = `
        SELECT 
            user_id, user_login_id, user_login_pw, user_name
        FROM 
 	        USERS
        WHERE
            user_login_id = ?`;

  const user = await db.execute(QUERY1, [loginId]).then((result) => result[0][0]);
  if (user) {
    return res.status(409).json({ status: "error", message: "이미 존재하는 id입니다.", data: null });
  }

  if (name) {
    return res.status(409).json({ status: "error", message: "이름은 필수입력 입니다.", data: null });
  }

  // 비밀번호 암호화
  const encryptPw = await bcrypt.hash(loginPw, 10);
  const time = CurrentTime();
  // 데이터베이스 사용자 정보 저장
  const QUERY2 = `
        INSERT INTO USERS
        (
	        user_login_id,
	        user_login_pw,
	        user_name,
          create_at
        )
        VALUES
        (
            ?,
            ?,
            ?,
            ?
        )`;

  await db.execute(QUERY2, [loginId, encryptPw, name, time]);

  // 성공 응답
  return res.status(200).json({ status: "success", message: "회원가입 성공", data: null });
}

module.exports = join;
