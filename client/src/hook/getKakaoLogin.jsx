import axios from "axios";
import { useContext, useCallback } from "react";
import { PageData } from "../provider/PageProvider";
import { useNavigate } from "react-router-dom";

export function useKakaoLogin() {
  const navigate = useNavigate();
  const { setUserData } = useContext(PageData);
  const postUrl = import.meta.env.VITE_API_URL;
  const client_id = import.meta.env.VITE_KAKAO_LOGIN_REST_API;
  const redirect_uri = import.meta.env.VITE_KAKAO_REDIRECT_URL;

  // 카카오 토큰 요청
  const getKakaoToken = useCallback(async (code) => {
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
      // 토큰을 이용해 사용자 정보 요청
      await getKakaoUser(response.data.access_token);
    } catch (error) {
      console.error("토큰 요청 오류:", error);
    }
  }, []);

  // 카카오 사용자 정보 요청
  const getKakaoUser = useCallback(async (ACCESS_TOKEN) => {
    try {
      const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });
      console.log(response.data);
      // 사용자 정보로 카카오 로그인 처리
      await kakaoLogin(response.data.id, response.data.properties.profile_image);
    } catch (error) {
      console.error("사용자 정보 요청 오류:", error);
    }
  }, []);

  // 백엔드 로그인 요청
  const kakaoLogin = useCallback(async (kakaoId, kakaoImg) => {
    try {
      const response = await axios.post(`${postUrl}/auth/login`, {
        id: kakaoId,
      });

      // 로그인 성공 후 데이터 처리
      window.localStorage.setItem("token", response.data.data.token);
      const userId = response.data.data.user.id;
      const name = response.data.data.user.name;
      const profile = response.data.data.user.profile;
      const stamp = response.data.data.stamps;
      console.log(response.data.data);
      console.log(response.data.data.user.profile);

      setUserData({
        userId: userId,
        profile: profile, // 프로필 사진 미구현
        nickName: name,
        stamp: stamp,
        stampCount: stamp.length,
        isLogin: true,
      });

      // 계정 페이지로 이동
      navigate("/account");
    } catch (error) {
      console.error("로그인 오류:", error);

      if (error.response && error.response.status === 404) {
        // 사용자가 없으면 회원가입 페이지로 이동
        navigate(`/signup?code=${kakaoId}&profile=${kakaoImg}`);
      } else if (error.code === "ERR_NETWORK") {
        alert("네트워크에 문제가 발생했습니다. 메인으로 이동합니다.");
        navigate("home");
      }
    }
  }, []);

  // 카카오 로그인 함수 반환
  return getKakaoToken;
}
