const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  const loginId = req.body.id;
  const loginPw = String(req.body.id); // 비밀번호는 클라이언트에서 받는 값 사용
  const userTokken = req.body.tokken || null; // 토큰 받아오기
  console.log("로그인 ID:", loginId);
  console.log("로그인 PW:", loginPw);

  // 토큰이 있다면 유효성 검사 후 로그인 처리
  if (userTokken) {
    const secretKey = process.env.JWT_SECRET;

    let decoded;
    try {
      // 토큰 유효성 검사 및 디코딩
      decoded = jwt.verify(userTokken, secretKey);
    } catch (error) {
      // 토큰이 유효하지 않다면 오류 반환
      return res.status(401).json({ status: "error", message: "토큰이 유효하지 않아 로그아웃 됩니다.", data: null });
    }

    // 디코딩된 id로 사용자 정보 조회
    const QUERY = `
      SELECT 
        user_id,
        user_login_pw,
        user_name
      FROM
        USERS
      WHERE
        user_id = ?`;
    const user = await db.execute(QUERY, [decoded.id]).then((result) => result[0][0]);

    // 사용자 정보 반환
    console.log("토큰 로그인 성공");
    return res.status(200).json({ status: "success", message: "로그인 성공", data: { user } });
  }

  // 토큰 만료 시 로그인 처리

  // ID, PW가 없으면 오류 처리
  if (!loginId || !loginPw) {
    return res.status(400).json({ status: "error", message: "id와 pw는 필수입니다.", data: null });
  }

  // ID로 사용자 정보 조회
  const QUERY1 = `
    SELECT 
        user_id,
        user_login_id,
        user_login_pw,
        user_name
    FROM 
        USERS
    WHERE 
        user_login_id = ?`;
  const user = await db.execute(QUERY1, [loginId]).then((result) => result[0][0]);

  // 유저 정보
  console.log("유저 :", user);

  // 사용자 정보가 없으면 404 처리
  if (!user) {
    return res.status(404).json({ status: "error", message: "가입된 정보가 없습니다.", data: null });
  }
  console.log("User Input Password:", loginPw); // 사용자 입력 비밀번호
  console.log("User Hash Password:", user.user_login_pw); // DB에서 조회한 비밀번호

  // 비밀번호 확인
  const isMatch = await bcrypt.compare(loginPw, user.user_login_pw);
  if (!isMatch) {
    return res.status(401).json({ status: "error", message: "비밀번호가 일치하지 않습니다.", data: null });
  }

  // 유저의 누적 스탬프 확인
  const QUERY2 = `
    SELECT
        stamp_location,
        stamp_type,
        create_at
    FROM
        STAMPS
    WHERE
        user_id = ?`;
  const stamps = await db.execute(QUERY2, [user.user_id]).then((result) => result[0]);

  console.log("스탬프 : ", stamps);

  // 로그인 성공 시 토큰 발급
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign({ id: user.user_id }, secretKey, { expiresIn: "10d" });

  // 사용자 정보와 스탬프 데이터, 토큰을 함께 반환
  res.status(200).json({
    status: "success",
    message: "로그인 성공",
    data: {
      token: token,
      user: {
        id: user.user_id,
        name: user.user_name,
        loginId: user.user_login_id,
      },
      stamps: stamps,
    },
  });
};

module.exports = login;
