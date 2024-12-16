import { useEffect, useContext } from "react";
import { PageData } from "../../provider/PageProvider";
import { useNavigate } from "react-router-dom";
import getKakaoLogin from "../../function/getKakaoLogin";
import axios from "axios";

export default function Auth() {
  const navigate = useNavigate();
  const { setUserData } = useContext(PageData);
  const code = new URL(window.location.href).searchParams.get("code") || null;
  const social = new URL(window.location.href).searchParams.get("social") || null;
  // const postUrl = import.meta.env.VITE_POST_URL;
  // const client_id = import.meta.env.VITE_KAKAO_LOGIN_REST_API;
  // const redirect_uri = import.meta.env.VITE_KAKAO_REDIRECT_URL;

  useEffect(() => {
    // console.log(code);
    // console.log(social);
    // `code` 값이 없으면 잘못된 접근으로 리디렉션
    if (code === null) {
      alert("잘못된 접근입니다");
      setTimeout(() => {
        navigate(`/`);
      }, 0);
    }
    if (social === "naver") {
      const getNaverLogin = async (code, setUserData) => {
        // 환경변수에서 네이버 로그인 관련 정보 가져오기
        const client_id = import.meta.env.VITE_NAVER_LOGIN_CLIENT_API;
        const client_secret = import.meta.env.VITE_NAVER_LOGIN_SECRET_API;
        const redirect_uri = import.meta.env.VITE_NAVER_REDIRECT_URL;

        try {
          // 1. 토큰 발급 요청
          const tokenResponse = await axios.post(
            "https://nid.naver.com/oauth2.0/token",
            new URLSearchParams({
              grant_type: "authorization_code", // 인증 방식
              client_id: client_id,
              client_secret: client_secret,
              code: code, // 로그인 코드
              state: "your_state_value", // CSRF 보호용 상태 값 (optional)
              redirect_uri: redirect_uri, // 리다이렉트 URI
            }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
          );

          // 2. 네이버 사용자 정보 요청
          const userResponse = await axios.get("https://openapi.naver.com/v1/nid/me", {
            headers: {
              Authorization: `Bearer ${tokenResponse.data.access_token}`,
            },
          });

          // 3. 사용자 정보 처리 및 로컬 저장
          const naverId = userResponse.data.response.id;
          const userName = userResponse.data.response.name;
          const userEmail = userResponse.data.response.email;

          // 사용자 정보 상태 업데이트
          setUserData({
            userId: naverId, // 네이버 사용자 ID
            nickName: userName, // 사용자 이름
            email: userEmail, // 이메일
            isLogin: true, // 로그인 여부
          });
        } catch (error) {
          console.error("네이버 로그인 오류:", error);
        }
      };
      getNaverLogin();
    } else {
      getKakaoLogin(); // 카카오 로그인 함수 호출
    }
  }, []);

  return <div>처리 중...</div>;
}
