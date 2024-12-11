import { useState } from "react";
import styles from "./Coupon.module.css"; // CSS 모듈을 import

export default function Coupon() {
  // 모달 열림/닫힘 상태를 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달을 여는 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달을 닫는 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 탭 상태 관리
  const [selectedTab, setSelectedTab] = useState("myCoupon");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <section className={styles.couponBox}>
      <div className={styles.couponSelect}>
        <div className={`${styles.couponTab} ${selectedTab === "myCoupon" ? styles.active : ""}`} id="myCoupon" onClick={() => handleTabClick("myCoupon")}>
          내 쿠폰
        </div>
        <div className={`${styles.couponTab} ${selectedTab === "expiration" ? styles.active : ""}`} id="expiration" onClick={() => handleTabClick("expiration")}>
          만료 쿠폰
        </div>
      </div>

      <div className={styles.eventCouponBox}>
        <div className={styles.eventCoupon}>
          <div>
            <div className={styles.percent}>5%</div>
            <div className={styles.stamp}>스탬프 3개 완료</div>
            <div className={styles.maximum}>최대 2000원 할인</div>
          </div>
          <div>
            <div className={styles.eventButtonBox}>
              {/* '사용하기' 버튼 클릭 시 모달 열기 */}
              <button className={styles.eventButton} onClick={openModal}>
                사용하기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 모달 창 */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>5%</div>
            <div className={styles.modalBody}></div>
            쿠폰을 사용하시겠습니까?
            <div className={styles.modalDetail}>
              버튼은 서점의 담당자만 사용할 수 있습니다
              <br /> 확인 후 진행해 주세요
              <br /> 사용시 쿠폰을 다시 사용할 수 없습니다
            </div>
            <div className={styles.modalButtonBox}>
              <button className={styles.modalButton} id={styles.useButton} onClick={closeModal}>
                사용
              </button>
              <button className={styles.modalButton} id={styles.cancellButton} onClick={closeModal}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
