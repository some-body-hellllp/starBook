import styles from "./HomeBody.module.css"; // CSS 모듈 import
import bookMark from "../../../assets/img/Main/bookmark.svg";
import arrow from "../../../assets/img/Main/arrow.svg";
import user from "../../../assets/img/Main/user.svg";

import { useNavigate } from "react-router-dom";

function HomeBody() {
  const navigate = useNavigate();
  return (
    <section>
      <div className={styles.homeBodyText}>
        <div>
          <img className={styles.bookMarkImg} src={bookMark} alt="책갈피" />
          <li className={styles.bookMarText}>책갈피</li>
        </div>
        <div>
          <li className={styles.seeMore} onClick={() => navigate("/bookmark")}>
            더보기
          </li>
          <img className={styles.arrow} src={arrow} alt="화살표" />
        </div>
      </div>

      <div className={styles.bookMark}>
        <div className={styles.bookMarkBoxMom}>
          <div className={styles.bookMarkBox}>
            <div className={styles.bookMarkBoxBox}>
              <li>@담담책방</li>
              <li className={styles.boxText}>한번 가보고싶었는데 드디어! 예쁜 공간 잘 둘러보고 갑니다.</li>
              <div className={styles.userImgBox}>
                <img className={styles.userImg} src={user} alt="사용자 이미지" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeBody;
