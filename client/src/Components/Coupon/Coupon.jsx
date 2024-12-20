import { useState } from "react";
import styles from "./Coupon.module.css";
import Header from "../Header/Header";
import CouponClick from "../../assets/img/Coupon/CouponClick.svg";

export default function Coupon() {
  // 모달 열림/닫힘 상태를 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 쿠폰 사용 여부 상태 관리
  const [isCouponUsed, setIsCouponUsed] = useState(false);
  // 탭 상태 관리
  const [selectedTab, setSelectedTab] = useState("myCoupon");

  // 모달을 여는 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 쿠폰 사용 및 모달 닫기 함수
  const handleUseCoupon = () => {
    setIsCouponUsed(true);
    setIsModalOpen(false);
  };

  // 모달을 닫는 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <Header showBackButton={true}>
        쿠폰함
        <div style={{ paddingRight: "40px" }}>{null}</div>
      </Header>
      <section className={styles.couponBox}>
        <div className={styles.couponSelect}>
          <div className={`${styles.couponTab} ${selectedTab === "myCoupon" ? styles.active : ""}`} id="myCoupon" onClick={() => handleTabClick("myCoupon")}>
            내 쿠폰
          </div>
          <div className={`${styles.couponTab} ${selectedTab === "expiration" ? styles.active : ""}`} id="expiration" onClick={() => handleTabClick("expiration")}>
            만료 쿠폰
          </div>
        </div>

        {/* 쿠폰 표시 영역 */}
        <div className={styles.eventCouponBox}>
          {/* 내 쿠폰일 때만 보이고, 사용되지 않은 상태일 때만 표시 */}
          {selectedTab === "myCoupon" && !isCouponUsed && (
            <div className={styles.eventCoupon}>
              <div>
                <div className={styles.percent}>5%</div>
                <div className={styles.stamp}>스탬프 3개 완료</div>
                <div className={styles.maximum}>최대 2000원 할인</div>
              </div>
              <div>
                <div className={styles.eventButtonBox}>
                  <button className={styles.eventButton} onClick={openModal}>
                    사용하기
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 만료 쿠폰일 때만 보이고, 사용된 상태일 때만 표시 */}
          {selectedTab === "expiration" && isCouponUsed && (
            <div className={`${styles.eventCoupon} ${styles.expiredCoupon}`}>
              <div>
                <div className={styles.percent}>5%</div>
                <div className={styles.stamp}>스탬프 3개 완료</div>
                <div className={styles.maximum}>최대 2000원 할인</div>
              </div>
              <div>
                <div className={styles.eventButtonBox}>
                  <button className={`${styles.eventButton} ${styles.disabledButton}`} disabled>
                    사용완료
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 모달 창 */}
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>5% CUPON</div>

              <div className={styles.modalButtonBox}>
                <div
                  className={styles.modalbacod}
                  id={styles.useButton}
                  onClick={handleUseCoupon} // 여기를 수정
                >
                  <img src={CouponClick} />
                </div>
                <div className={styles.modalDetail}>서점의 담당자에게 보여주세요</div>
                <div className={styles.test}>
                  <button className={styles.modalButton} id={styles.cancellButton} onClick={closeModal}>
                    취소
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
