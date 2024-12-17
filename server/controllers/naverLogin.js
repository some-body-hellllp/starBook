const axios = require("axios");

const naverLogin = async (req, res, next) => {
  // 환경변수에서 네이버 로그인 관련 정보 가져오기
  const client_id = process.env.NAVER_LOGIN_CLIENT_API;
  const client_secret = process.env.NAVER_LOGIN_SECRET_API;

  try {
    const { code, state, redirect_uri } = req.body;
    // console.log(code);
    const response = await axios.post(
      "https://nid.naver.com/oauth2.0/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        client_id: client_id,
        client_secret: client_secret,
        code: code,
        state: state,
        redirect_uri: redirect_uri,
      })
    );

    req.token = response.data;
    // console.log(req.token);
    next();
  } catch (error) {
    console.error("Error fetching token:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch token" });
  }
};

module.exports = naverLogin;
