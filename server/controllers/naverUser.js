const axios = require("axios");

const naverUser = async (req, res) => {
  if (!req.token || !req.token.access_token) {
    return res.status(400).json({ error: "Invalid token" });
  }

  const token = req.token.access_token;
  console.log("Access Token:", req.token.access_token);

  try {
    const userResponse = await axios.get("https://openapi.naver.com/v1/nid/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //   console.log(userResponse.data);
    console.log(userResponse.data.response.id);

    return res.status(200).json({ status: "success", message: "인증 성공", data: userResponse.data });
  } catch (error) {
    console.log(error);
  }
};

module.exports = naverUser;
