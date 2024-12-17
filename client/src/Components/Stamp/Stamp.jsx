import styles from "./Stamp.module.css"; // CSS 모듈 파일 임포트
import stampCheck from "../../assets/img/stamp/stampcheck.svg";
import stampNoneCheck from "../../assets/img/stamp/stampdoncheck.svg";
import StampInfo from "./StampInfo/StampInfo";
import Header from "../Header/Header";

export default function Stamp() {
  return (
    <>
      <Header>스탬프</Header>
      <section className={styles.stampSection}>
        <div className={styles.stampBox}>
          <div className={styles.stampBoxHeader}>
            <strong className={styles.stampName}>코딩몬스터</strong>님
            <br />
            모으신 스탬프를 확인해보세요
          </div>
          <div className={styles.stampBoxBody}>방문시 스탬프 1개, 책 구매시 스탬프를 1개 더 드립니다.</div>
          <div className={styles.stampCardName}>Stamp Card</div>
          <div className={styles.stampCard}>
            <div className={styles.stampGrid}>
              <img src={stampCheck} alt="Stamp" />
              <img src={stampCheck} alt="Stamp" />
              <img src={stampCheck} alt="Stamp" />
              <img src={stampNoneCheck} alt="Stamp" />
              <img src={stampNoneCheck} alt="Stamp" />
              <img src={stampNoneCheck} alt="Stamp" />
              <img src={stampNoneCheck} alt="Stamp" />
              <img src={stampNoneCheck} alt="Stamp" />
            </div>
            <div className={styles.stampText}>
              <p>스탬프 3개를 완료하면 5%쿠폰</p>
              <p>스탬프 5개를 완료하면 10%쿠폰</p>
              <p>스탬프 8개를 완료하면 15%쿠폰을 드립니다!</p>
            </div>
          </div>
        </div>
        <section className={styles.stampWrap}>
          <StampInfo />
          <StampInfo />
        </section>
      </section>
    </>
  );
}
