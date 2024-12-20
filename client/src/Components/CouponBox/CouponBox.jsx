import { useEffect, useState, useContext } from "react";
import styles from "./Couponbox.module.css";
import Header from "../Header/Header";
import Coupon from "./Coupon/Coupon";
import axios from "axios";
import { PageData } from "../../provider/PageProvider";

export default function CouponBox() {
  const [selectedTab, setSelectedTab] = useState(true); // 탭 상태 관리
  const [filteredCoupons, setFilteredCoupons] = useState("");
  const { userData } = useContext(PageData);
  const postUrl = import.meta.env.VITE_API_URL;

  // 탭 변경 함수
  const handleTabClick = () => {
    setSelectedTab((prev) => !prev);
  };

  useEffect(() => {
    try {
      const result = axios.get(`${postUrl}/coupon`, {
        userId: userData.userId,
      });
      console.log(result);
      // couponFiltering("");
    } catch (error) {
      console.log(error);
    }
  }, []);
  // 쿠폰 데이터 필터링 함수
  function couponFiltering(fetchCoupons) {
    // 배열 확인
    if (!Array.isArray(fetchCoupons)) {
      console.error("fetchCoupons는 배열이어야 합니다.");
      return [];
    }

    // 필터링 로직
    const filteredCoupons = fetchCoupons.filter((coupon) =>
      selectedTab === "myCoupon" ? coupon.coupon_state === "able" : coupon.coupon_state === "disable"
    );

    return setFilteredCoupons(filteredCoupons);
  }

  // 필터링된 쿠폰 리스트
  // 쿠폰의 상태를 저장하는 스테이트가 변경될때 마다 필터를 사용해서 출력되는 쿠폰을 구분해서 출력함

  return (
    <>
      <Header showBackButton={true}>
        쿠폰함
        <div style={{ paddingRight: "40px" }}>{null}</div>
      </Header>
      <section className={styles.couponBox}>
        {/* 상단부 탭 */}
        <div className={styles.couponSelect}>
          <div
            className={`${styles.couponTab} ${selectedTab === true ? styles.active : ""}`}
            onClick={() => handleTabClick()}
          >
            내 쿠폰
          </div>
          <div
            className={`${styles.couponTab} ${selectedTab === false ? styles.active : ""}`}
            onClick={() => handleTabClick()}
          >
            만료 쿠폰
          </div>
        </div>

        {/* 필터링된 쿠폰 표시 영역 */}
        <div className={styles.eventCouponBox}>
          {filteredCoupons?.length > 0 ? (
            filteredCoupons.map((coupon, index) => <Coupon key={index} coupons={coupon} />)
          ) : (
            <div className={styles.noCoupons}>표시할 쿠폰이 없습니다.</div>
          )}
        </div>
      </section>
    </>
  );
}
