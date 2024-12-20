import { useState } from "react";
import styles from "../CouponBox.module.css";
import CouponClick from "../../../assets/img/Coupon/CouponClick.svg";
import axios from "axios";

export default function CouponModal({ isModalOpen, coupon, modalHandler, coupon_id, userId, setSelectedTab }) {
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const postUrl = import.meta.env.VITE_API_URL;

  async function useCoupon() {
    if (!coupon_id || !userId) {
      alert("쿠폰 정보가 올바르지 않습니다.");
      return;
    }
    setIsLoading(true);
    try {
      const result = await axios.put(`${postUrl}/coupon`, {
        userId: userId,
        couponId: coupon_id,
      });
      console.log("쿠폰 사용 성공", result);
      alert("쿠폰을 사용하였습니다.");
      setSelectedTab(false);
      modalHandler();
    } catch (error) {
      console.log("전송 실패:", error);
      alert("쿠폰 사용을 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }

  if (!isModalOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>{coupon?.percent || "-"} COUPON</div>
        <div className={styles.modalButtonBox}>
          <div
            className={`${styles.modalbacod} ${isLoading ? styles.disabled : ""}`}
            id={styles.useButton}
            onClick={useCoupon}
          >
            <img src={CouponClick} alt="사용하기" />
          </div>
          <div className={styles.modalDetail}>서점의 담당자에게 보여주세요</div>
          <div className={styles.test}>
            <button
              className={styles.modalButton}
              id={styles.cancellButton}
              onClick={modalHandler}
              disabled={isLoading}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
