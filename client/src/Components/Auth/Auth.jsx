import axios from "axios";
import { useEffect, useContext } from "react";
import { PageData } from "../../provider/PageProvider";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  const { setUserData } = useContext(PageData);
  const code = new URL(window.location.href).searchParams.get("code") || null;
  const postUrl = import.meta.env.VITE_POST_URL;
  const client_id = import.meta.env.VITE_KAKAO_LOGIN_REST_API;
  const redirect_uri = import.meta.env.VITE_KAKAO_REDIRECT_URL;

  useEffect(() => {
    // `code` 값이 없으면 잘못된 접근으로 리디렉션
    if (code === null) {
      alert("잘못된 접근입니다");
      return navigate(`/`);
    }

    // 카카오 토큰을 요청하는 함수
    const getKakaoToken = () => {
      axios
        .post(
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
        )
        .then((res) => {
          getKakaoUser(res.data.access_token);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const getKakaoUser = (ACCESS_TOKEN) => {
      axios
        .get("https://kapi.kakao.com/v2/user/me", {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        })
        .then((res) => {
          console.log(res.data.id);
          kakaoLogin(res.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // 토큰 발급 함수
    function kakaoLogin(kakaoId) {
      axios
        .post(`${postUrl}/auth/login`, {
          id: kakaoId,
        })
        .then((res) => {
          console.log(res);

          window.localStorage.setItem("token", res.data.data.token);
          const userId = res.data.data.user.id;
          const name = res.data.data.user.name;
          const stamp = res.data.data.stamps;
          setUserData({
            userId: userId, // 유저 아이디
            profile: null, // 유저 프로필 사진 (미구현)
            nickName: name, // 유저 닉네임
            stamp: stamp, // 스탬프 현황
            stampCount: stamp.length, // 누적 스탬프 갯수
            islogin: true, // 로그인 확인
          });
          navigate("/account");
        })
        .catch((error) => {
          console.log(error);

          if (error.response && error.response.status === 404) {
            // 사용자가 없을 경우 회원가입 페이지로 리다이렉트
            navigate(`/signup?code=${kakaoId}`);
            if (error.code === "ERR_NETWORK") {
              alert("네트워크에 문제가 발생했습니다 메인으로 이동합니다.");
              navigate("/");
            }
          }
        });
    }

    getKakaoToken(); // 함수 호출
  }, []);

  return <div>처리 중...</div>;
}
