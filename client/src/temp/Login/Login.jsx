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

  const Rest_api_key = import.meta.env.VITE_KAKAO_LOGIN_REST_API; //REST API KEY
  const redirect_uri = import.meta.env.VITE_KAKAO_REDIRECT_URL; //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <>
      <Header showBackButton={true}></Header>
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
                handleLogin();
              }}
            />
            {/* <img
              src={KAKAO}
              alt="KAKAO"
              onClick={() => {
                updateUserData("islogin", "login");
                navigate("/account");
              }}
            /> */}
          </div>
          <div>
            <img src={NAVER} alt="NAVER" onClick={() => navigate("/signup")} />
          </div>
        </section>
      </section>
    </>
  );
}
