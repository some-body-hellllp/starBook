import { useEffect, useContext } from "react";
import { PageData } from "../../provider/PageProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NaverAuth() {
  const navigate = useNavigate();
  const { setUserData } = useContext(PageData);
  const code = new URL(window.location.href).searchParams.get("code") || null;

  useEffect(() => {
    const getNaverLogin = async () => {
      // 환경변수에서 네이버 로그인 관련 정보 가져오기
      // const client_id = import.meta.env.VITE_NAVER_LOGIN_CLIENT_API;
      // const client_secret = import.meta.env.VITE_NAVER_LOGIN_SECRET_API;
      const redirect_uri = import.meta.env.VITE_NAVER_REDIRECT_URL;
      const postUrl = import.meta.env.VITE_POST_URL;
      try {
        // 1. 네이버 로그인 요청
        const tokenResponse = await axios.post(`${postUrl}/auth/naverLogin`, {
          code: code,
          state: "test",
          redirect_uri: redirect_uri, // 리다이렉트 URI
        });
        // console.log(tokenResponse);
        console.log("id :", tokenResponse.data.data.response.id);

        // 3. 사용자 정보 처리 및 로컬 저장
        const id = tokenResponse.data.data.response.id;

        // 사용자 정보 상태 업데이트
        // setUserData({
        //   userId: naverId, // 네이버 사용자 ID
        //   nickName: userName, // 사용자 이  름
        //   email: userEmail, // 이메일
        //   isLogin: true, // 로그인 여부
        // });
      } catch (error) {
        console.error("에러 :", error);
      }
    };
    getNaverLogin();
  }, []);
  return <></>;
}
