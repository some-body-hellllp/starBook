const User = require("../models/user"); // User 모델 가져오기
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const loginId = req.body.user_login_id;
  const loginPw = req.body.user_login_pw;

  // 유효성 검사
  if (!loginId || !loginPw) {
    return res.status(400).json({ status: "error", message: "id, pw는 필수입니다", data: null });
  }

  try {
    // 시퀄라이즈의 findOne 메서드를 사용하여 사용자 검색
    const user = await User.findOne({ where: { user_login_id: loginId } });

    // 사용자 존재 여부 확인
    if (!user) {
      return res.status(404).json({ status: "error", message: "id, pw가 틀립니다", data: null });
    }
    console.log("입력된 비밀번호:", loginPw);
    console.log("저장된 해시된 비밀번호:", user.user_login_pw);

    // 비밀번호 비교
    const isMatch = await bcrypt.compare(loginPw, user.user_login_pw);
    if (!isMatch) {
      return res.status(401).json({ status: "error", message: "비밀번호가 일치하지 않습니다", data: null });
    }

    // JWT 토큰 발급
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user.user_id }, secretKey, { expiresIn: "10d" });

    return res.status(200).json({ status: "success", message: "로그인 성공", data: { token } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: "서버 오류", data: null });
  }
};

module.exports = login;
