import styles from "./HomeHeader.module.css"; // CSS 모듈을 불러옵니다.
import StarBook from "../../../assets/img/Main/mainimg.svg";

function HomeHeader() {
  return (
    <section className={styles.mainHeaderBox}>
      <div>
        <img className={styles.mainImg} src={StarBook} alt="메인이미지" />
      </div>
      <div className={styles.mainHeaderText}>
        독립서점에서 찾은
        <br />특<span className={styles.mainStarColor}>별</span>한 책, 특<span className={styles.starColor}>별</span>한 순간
      </div>
      <div className={styles.mainHeaderSubText}>QR 코드를 스캔하여 선물을 받으세요.</div>
    </section>
  );
}

export default HomeHeader;
