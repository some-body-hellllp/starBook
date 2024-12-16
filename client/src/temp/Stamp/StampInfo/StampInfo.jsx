import styles from "./StampInfo.module.css"; // CSS 모듈 파일 임포트

export default function StampInfo() {
  return (
    <section className={styles.stampInfoSection}>
      <div className={styles.stampInfoBox}>
        <div className={styles.stampFlex}>
          <div className={styles.stampInfoHeader}>2024년 12월 05일 (목)</div>
          <div className={styles.stampInfoSide}>스탬프 1개</div>
        </div>
        <div className={styles.stampInfoText}>심플책방(구매)</div>
      </div>
    </section>
  );
}
