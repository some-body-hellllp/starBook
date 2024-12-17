import axios from "axios";
import { useContext } from "react";
import { PageData } from "../provider/PageProvider";
import { useNavigate } from "react-router-dom";

export default function getKakaoLogin(code) {
  const navigate = useNavigate();
  const { setUserData } = useContext(PageData);
  const postUrl = import.meta.env.VITE_POST_URL;
  const client_id = import.meta.env.VITE_KAKAO_LOGIN_REST_API;
  const redirect_uri = import.meta.env.VITE_KAKAO_REDIRECT_URL;
  // 카카오 토큰을 요청하는 함수
  const getKakaoToken = async () => {
    try {
      const response = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        new URLSearchParams({
          grant_type: "authorization_code",
          client_id: client_id,
          redirect_uri: redirect_uri,
          code: code,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );
      // 토큰 받았으면 유저 정보 요청
      getKakaoUser(response.data.access_token);
    } catch (error) {
      console.error("토큰 요청 오류:", error);
    }
  };

  // 카카오 사용자 정보 요청
  const getKakaoUser = async (ACCESS_TOKEN) => {
    try {
      const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });
      // 사용자 정보 받았으면 카카오 로그인
      kakaoLogin(response.data.id);
    } catch (error) {
      console.error("사용자 정보 요청 오류:", error);
    }
  };

  // 카카오 로그인 처리
  const kakaoLogin = async (kakaoId) => {
    try {
      const response = await axios.post(`${postUrl}/auth/login`, {
        id: kakaoId,
      });
      console.log(response);

      // 로그인 성공 후 토큰과 유저 데이터 저장
      window.localStorage.setItem("token", response.data.data.token);
      const userId = response.data.data.user.id;
      const name = response.data.data.user.name;
      const stamp = response.data.data.stamps;
      console.log(stamp.length);

      setUserData({
        userId: userId,
        profile: null, // 프로필 사진 미구현
        nickName: name,
        stamp: stamp,
        stampCount: stamp.length,
        islogin: true,
      });

      // 로그인 후 account 페이지로 이동
      navigate("/account");
    } catch (error) {
      console.error("로그인 오류:", error);

      if (error.response && error.response.status === 404) {
        // 사용자가 없을 경우 회원가입 페이지로 리다이렉트
        navigate(`/signup?code=${kakaoId}`);
      } else if (error.code === "ERR_NETWORK") {
        alert("네트워크에 문제가 발생했습니다. 메인으로 이동합니다.");
        navigate("/");
      }
    }
  };

  // 카카오 로그인 시작
  getKakaoToken();
}
