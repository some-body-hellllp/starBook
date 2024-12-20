import { useState } from "react";
import styles from "../CouponBox.module.css";
import CouponModal from "../CouponModal/CouponModal";

export default function Coupon({ coupon, userId, setSelectedTab }) {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태를 관리
  // console.log(coupon);
  const couponText = convertText(coupon);
  // console.log(couponText);
  const couponClass = `${styles.eventCoupon} ${coupon?.coupon_state === "disable" ? styles.expiredCoupon : ""}`;

  // 모달 열고 닫는 함수
  const modalHandler = () => {
    setIsModalOpen((prev) => !prev);
  };

  // 할인율을 기준으로 텍스트 변형
  function convertText(Coupon) {
    if (Coupon?.coupon_discount_rate == 5) {
      return { percent: "5%", stamp: "스탬프 3개 완료", maximum: "최대 1000원 할인" };
    }
    if (Coupon?.coupon_discount_rate == 10) {
      return { percent: "10%", stamp: "스탬프 5개 완료", maximum: "최대 1500원 할인" };
    }
    if (Coupon?.coupon_discount_rate == 15) {
      return { percent: "15%", stamp: "스탬프 8개 완료", maximum: "최대 3000원 할인" };
    }
    return { percent: "-", stamp: "정보 없음", maximum: "정보 없음" }; // 기본값 설정
  }

  return (
    <>
      <div className={couponClass}>
        <div>
          <div className={styles.percent}>{couponText?.percent}</div>
          <div className={styles.stamp}>{couponText?.stamp}</div>
          <div className={styles.maximum}>{couponText?.maximum}</div>
        </div>
        <div>
          <div className={styles.eventButtonBox}>
            <button
              onClick={modalHandler}
              className={`${styles.eventButton} ${coupon?.coupon_state === "disable" ? styles.disabledButton : ""}`}
            >
              {coupon?.coupon_state === "disable" ? "사용완료" : "사용하기"}
            </button>
          </div>
        </div>
      </div>
      <CouponModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalHandler={modalHandler}
        coupon={couponText}
        onClick={modalHandler}
        coupon_id={coupon.coupon_id}
        userId={userId}
        setSelectedTab={setSelectedTab}
      />
    </>
  );
}
