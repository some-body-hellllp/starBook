const User = require("../models/user.js");
const bcrypt = require("bcrypt");

async function join(req, res) {
  try {
    const { user_login_id, user_login_pw, user_name } = req.body;

    // ID와 PW가 들어오지 않으면 에러를 송신
    // 400번 에러 BAD REQUEST
    if (!user_login_id || !user_login_pw) {
      return res.status(400).json({ status: "error", message: "id,pw는 필수입니다", data: null });
    }

    // id 중복 확인
    const existingUser = await User.findOne({ where: { user_login_id } });
    if (existingUser) {
      return res.status(400).json({ error: "이미 사용 중인 id입니다." });
    }

    // 비밀번호 암호화
    const encryptPw = await bcrypt.hash(user_login_pw, 10);

    // 새로운 사용자 생성
    const newUser = await User.create({ user_login_id, user_login_pw: encryptPw, user_name });
    console.log("새 사용자 추가됨:", newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("사용자 생성 중 오류 발생:", error);
    res.status(500).json({ error: "사용자를 생성하지 못했습니다." });
  }
}

module.exports = join;
