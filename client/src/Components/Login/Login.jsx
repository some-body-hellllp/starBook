import { PageData } from "../../provider/PageProvider";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";

//이미지
import KAKAO from "../../assets/img/Login/KAKAO.png";
import NAVER from "../../assets/img/Login/NAVER.png";
import Icon from "../../assets/img/Login/Icon.png";

// 스타일
import style from "./Login.module.css";
export default function Login() {
  const { page, setPage } = useContext(PageData);
  const navigate = useNavigate();

  useEffect(() => {
    if (page) {
      navigate(page === "home" ? "/" : `/${page}`);
    }
  }, [page, navigate]);

  function pageHandler(word) {
    setPage(word); // 상태 변경만 수행
  }
  return (
    <>
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
            <img src={KAKAO} alt="KAKAO" />
          </div>
          <div>
            <img src={NAVER} alt="NAVER" />
          </div>
        </section>
      </section>
    </>
  );
}
