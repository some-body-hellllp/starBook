import styles from "./Stamp.module.css"; // CSS 모듈 파일 임포트
import stampCheck from "../../assets/img/stamp/stampcheck.svg";
import stampNoneCheck from "../../assets/img/stamp/stampdoncheck.svg";
import StampInfo from "./StampInfo/StampInfo";
import Header from "../Header/Header";
import { useContext, useEffect, useState } from "react";
import { PageData } from "../../provider/PageProvider";
import axios from "axios";

export default function Stamp() {
  const { userData, setUserData } = useContext(PageData); // PageData Context에서 userData 가져오기
  const [stampImages, setStampImages] = useState([]); // 스탬프 이미지 배열 상태
  const [stampCount, setStampCount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const postUrl = import.meta.env.VITE_API_URL;
  const token = window.localStorage.getItem("token");

  // 스탬프 이미지 배열 생성
  const createStampImages = () => {
    const remainder = userData.stampCount % 8; // 8로 나눈 나머지 계산
    // 나머지 만큼 stampCheck, 나머지는 stampNoneCheck
    return Array.from({ length: 8 }, (_, index) => (index < remainder ? stampCheck : stampNoneCheck));
  };

  // 스탬프 정보 가져오는 함수
  const fetchStamp = async () => {
    const headers = {
      Authorization: ` Bearer ${token}`,
    };

    try {
      const getStamp = await axios.get(`${postUrl}/auth/stamp`, {
        headers: headers,
        params: { userId: userData.userId },
      });

      // console.log(getStamp);
      console.log("스탬프 :", getStamp.data.data);
      setUserData((prevData) => ({
        ...prevData,
        stamp: getStamp.data.data,
        stampCount: getStamp.data.data.length,
      }));
      setStampCount(getStamp.data.data.length);
    } catch (error) {
      console.error("Error fetching stamp:", error);
    }
  };
  // 쿠폰 발급 함수
  const getStampReward = async (remainder) => {
    try {
      const coupon = await axios.post(`${postUrl}/coupon`, {
        userId: userData.userId,
        stampCard: remainder,
      });
      console.log(coupon);
      alert(coupon.data.message);
    } catch (error) {
      console.log("쿠폰 에러 :", error);
    } finally {
      console.log("쿠폰 발급 종료");
    }
  };

  useEffect(() => {
    if (isLoading) return;
    setIsLoading(true);
    console.log("데이터 호출");

    const fetchData = async () => {
      try {
        await fetchStamp(); // 스탬프 정보 가져오기
        const remainder = userData.stampCount % 8;
        setStampImages(createStampImages());
        if (userData.stampCount === 0) return;
        if (remainder === 3 || remainder === 5 || remainder === 0) {
          await getStampReward(remainder);

          // alert(`${discount}% 할인 쿠폰이 발급 되었습니다.`);
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    // setIsLoading(false);
  }, [stampCount]); // 필요한 의존성 추가
  // [userData.stampCount]

  return (
    <>
      <Header stampCaution={true} backgroundColor={"white"}>
        <div style={{ paddingLeft: "40px" }}>{null}</div>스탬프{" "}
      </Header>
      <section className={styles.stampSection}>
        <div className={styles.stampBox}>
          <div className={styles.stampBoxHeader}>
            <strong className={styles.stampName}>{userData.nickName || "코딩몬스터"}</strong>님
            <br />
            모으신 스탬프를 확인해보세요
          </div>
          <div className={styles.stampBoxBody}>방문시 스탬프 1개, 책 구매시 스탬프를 1개 더 드립니다.</div>
          <div className={styles.stampCardName}>Stamp Card</div>
          <div className={styles.stampCard}>
            <div className={styles.stampGrid}>
              {stampImages.map((stamp, index) => (
                <img key={index} src={stamp} alt={`Stamp ${index + 1}`} />
              ))}
            </div>
            <div className={styles.stampText}>
              <p>스탬프 3개를 완료하면 5%쿠폰</p>
              <p>스탬프 5개를 완료하면 10%쿠폰</p>
              <p>스탬프 8개를 완료하면 15%쿠폰을 드립니다!</p>
            </div>
          </div>
        </div>

        <section className={styles.stampWrap}>
          {userData.stamp ? userData.stamp.map((stamp, index) => <StampInfo key={index} stamp={stamp} />) : ""}
        </section>
      </section>
    </>
  );
}
