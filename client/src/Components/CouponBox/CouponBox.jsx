import { useEffect, useState, useContext } from "react";
import styles from "./Couponbox.module.css";
import Header from "../Header/Header";
import Coupon from "./Coupon/Coupon";
import axios from "axios";
import { PageData } from "../../provider/PageProvider";

export default function CouponBox() {
  const [selectedTab, setSelectedTab] = useState(true); // 탭 상태 관리
  const [filteredCoupons, setFilteredCoupons] = useState([]); // 필터링된 쿠폰 리스트
  const { userData } = useContext(PageData);
  const postUrl = import.meta.env.VITE_API_URL;

  // 탭 변경 함수
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  // 쿠폰 데이터 가져오기
  useEffect(() => {
    async function fetchCoupons() {
      try {
        const { data } = await axios.get(`${postUrl}/coupon`, {
          params: { userId: userData.userId },
        });

        if (data?.data) {
          couponFiltering(data.data); // 가져온 데이터를 필터링
        } else {
          console.error("쿠폰 데이터가 비어 있습니다.");
        }
      } catch (error) {
        console.error("쿠폰 데이터를 가져오는 중 에러 발생:", error);
      }
    }

    fetchCoupons();
  }, []);

  // 쿠폰 데이터 필터링 함수
  function couponFiltering(fetchCoupons) {
    if (!Array.isArray(fetchCoupons)) {
      console.error("fetchCoupons는 배열이어야 합니다.");
      return;
    }

    // 필터링 로직
    const filtered = fetchCoupons.filter((coupon) =>
      selectedTab ? coupon.coupon_state === "able" : coupon.coupon_state === "disable"
    );

    setFilteredCoupons(filtered);
  }

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
            className={`${styles.couponTab} ${selectedTab ? styles.active : ""}`}
            onClick={() => handleTabClick(true)}
          >
            내 쿠폰
          </div>
          <div
            className={`${styles.couponTab} ${!selectedTab ? styles.active : ""}`}
            onClick={() => handleTabClick(false)}
          >
            만료 쿠폰
          </div>
        </div>

        {/* 필터링된 쿠폰 표시 영역 */}
        <div className={styles.eventCouponBox}>
          {filteredCoupons.length > 0 ? (
            filteredCoupons.map((coupon, index) => <Coupon key={index} coupons={coupon} />)
          ) : (
            <div className={styles.noCoupons}>표시할 쿠폰이 없습니다.</div>
          )}
        </div>
      </section>
    </>
  );
}
