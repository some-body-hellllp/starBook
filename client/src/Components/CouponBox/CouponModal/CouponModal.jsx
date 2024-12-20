import styles from "../CouponBox.module.css";
import CouponClick from "../../../assets/img/Coupon/CouponClick.svg";

export default function CouponModal({ isModalOpen, coupons, modalHandler, onClick }) {
  return (
    <>
      {isModalOpen === true && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>{coupons.percent} CUPON</div>

            <div className={styles.modalButtonBox}>
              <div className={styles.modalbacod} id={styles.useButton} onClick={modalHandler}>
                <img src={CouponClick} />
              </div>
              <div className={styles.modalDetail}>서점의 담당자에게 보여주세요</div>
              <div className={styles.test}>
                <button className={styles.modalButton} id={styles.cancellButton} onClick={modalHandler}>
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
