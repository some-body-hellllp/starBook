import { PageData } from "../../provider/PageProvider";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";

//이미지
import KAKAO from "../../assets/img/Login/KAKAO.png";
import NAVER from "../../assets/img/Login/NAVER.png";
import Icon from "../../assets/img/Login/Icon.png";

// 컴포넌트
import Header from "../Header/Header";

// 스타일
import style from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  // 카카오
  const kakao_Rest_api_key = import.meta.env.VITE_KAKAO_LOGIN_REST_API; //REST API KEY
  const kakao_Redirect_uri = import.meta.env.VITE_KAKAO_REDIRECT_URL; //Redirect URI
  // 네이버
  const naver_client_api_key = import.meta.env.VITE_NAVER_LOGIN_CLIENT_API; //REST API KEY
  const naver_Redirect_uri = import.meta.env.VITE_NAVER_REDIRECT_URL; //Redirect URI

  console.log(kakao_Redirect_uri);
  console.log(kakao_Rest_api_key);
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao_Rest_api_key}&redirect_uri=${kakao_Redirect_uri}&response_type=code`;
  const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naver_client_api_key}&state=test&redirect_uri=${naver_Redirect_uri}`;
  console.log(kakaoURL);
  const handleLogin = (social) => {
    if (social === "kakao") {
      window.location.href = kakaoURL;
    } else {
      window.location.href = naverURL;
    }
  };

  return (
    <>
      <Header showBackButton={true} backButtonFunction={"/account"}></Header>
      <section className={style.Login}>
        <div className={style.Icon_wrap}>
          <img className={style.Icon} src={Icon} alt="Icon" />
        </div>
        <section className={style.text}>
          <div>간편하게 로그인하고</div>
          <div>다양한 서비스를 이용해보세요</div>
        </section>

        <section className={style.social_login}>
          <div className={style.social_wrap}>
            <img
              src={KAKAO}
              alt="KAKAO"
              onClick={() => {
                handleLogin("kakao");
              }}
            />
          </div>
          <div>
            <img src={NAVER} alt="NAVER" onClick={() => handleLogin("naver")} />
          </div>
        </section>
      </section>
    </>
  );
}
