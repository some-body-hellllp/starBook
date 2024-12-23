import styles from "./stampModal.module.css"; // CSS 모듈 파일 임포트

export default function StampModal({ modalHandler, onClick, isModalOpen }) {
  if (!isModalOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={modalHandler}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>스탬프 적립 및 사용 안내사항</div>
        <div className={styles.modalButtonBox}>
          <div className={`${styles.modalbacod} `} id={styles.useButton}></div>
          <div className={styles.modalDetail}>
            <span className={styles.modalSpan}>
              <span className={styles.midlejum}>·</span>하루 최대 4개의 스탬프 적립이 가능합니다.
            </span>
            <div className={styles.flex}>
              <span className={styles.midlejum}>·</span>
              <li className={styles.modalLi}>
                <span className={styles.modalSpan}>하루 동안 동일한 서점에서 중복으로 스탬프를 적립할 수 없습니다. </span>
                <br />
                (방문 및 구매 모두 포함)
              </li>
            </div>
            <div className={styles.flex}>
              <li className={styles.modalLi}>
                <span className={styles.midlejum}>·</span>
                <span className={styles.modalSpan}>5% 할인권</span> : 최대 1,000원까지 할인
              </li>
            </div>
            <div className={styles.flex}>
              <li className={styles.modalLi}>
                <span className={styles.modalSpan}>
                  <span className={styles.midlejum}>·</span>10% 할인권
                </span>
                : 최대 2,000원까지 할인
              </li>
            </div>
            <div className={styles.flex}>
              <li className={styles.modalLi}>
                <span className={styles.modalSpan}>
                  <span className={styles.midlejum}>·</span>15% 할인권
                </span>
                : 최대 3,000원까지 할인
              </li>
            </div>
          </div>
          <div className={styles.test}></div>
        </div>
      </div>
    </div>
  );
}
