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
      const postUrl = import.meta.env.VITE_API_URL;
      try {
        // 1. 네이버 로그인 요청
        const tokenResponse = await axios.post(`${postUrl}/auth/naverLogin`, {
          code: code,
          state: "test",
          redirect_uri: redirect_uri, // 리다이렉트 URI
        });
        // console.log(tokenResponse);
        console.log("id :", tokenResponse.data.data.response.id);
        console.log("image :", tokenResponse.data.data.response.profile_image);

        // 네이버 토큰으로 조회한 유저 아이디
        const id = tokenResponse.data.data.response.id;
        const profile = tokenResponse.data.data.response.profile_image;

        try {
          // 로그인 요청
          const login = await axios.post(`${postUrl}/auth/login`, {
            id: id,
          });
          console.log(login);

          // 3. 사용자 정보 처리 및 로컬 저장
          window.localStorage.setItem("token", login.data.data.token);
          const userId = login.data.data.user.id;
          const name = login.data.data.user.name;
          const stamp = login.data.data.stamps;
          console.log("스탬프 개수 :", stamp.length);

          setUserData({
            userId: userId,
            profile: null, // 프로필 사진 미구현
            nickName: name,
            stamp: stamp,
            stampCount: stamp.length,
            isLogin: true,
          });

          // 로그인 후 account 페이지로 이동
          navigate("/account");
        } catch (error) {
          console.error("로그인 오류:", error);

          if (error.response && error.response.status === 404) {
            // 사용자가 없을 경우 회원가입 페이지로 리다이렉트
            navigate(`/signup?code=${id}&profile=${profile}`);
          } else if (error.code === "ERR_NETWORK") {
            alert("네트워크에 문제가 발생했습니다. 메인으로 이동합니다.");
            navigate("home");
          }
        }
      } catch (error) {
        console.error("에러 :", error);
        if (error.code === "ERR_NETWORK") {
          alert("네트워크에 문제가 발생했습니다. 메인으로 이동합니다.");
          navigate("home");
        }
      }
    };
    getNaverLogin();
  }, []);
  return <>처리중..</>;
}
