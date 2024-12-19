import styles from "./Stamp.module.css"; // CSS 모듈 파일 임포트
import stampCheck from "../../assets/img/stamp/stampcheck.svg";
import stampNoneCheck from "../../assets/img/stamp/stampdoncheck.svg";
import StampInfo from "./StampInfo/StampInfo";
import Header from "../Header/Header";
import { useContext, useState } from "react";
import { PageData } from "../../provider/PageProvider";

export default function Stamp() {
  const { userData } = useContext(PageData);
  const [stampCount, setStampCount] = useState(0); // 현재 스탬프 개수
  const [stampInfoList, setStampInfoList] = useState([]); // StampInfo 컴포넌트를 관리하는 상태

  // 스탬프 이미지 배열 생성
  const stampImages = Array.from({ length: 8 }, (_, index) => (index < stampCount ? stampCheck : stampNoneCheck));

  // 스탬프를 추가하는 함수
  const addStamp = () => {
    if (stampCount < 8) {
      const newStampCount = stampCount + 1;

      // stampCount가 8에 도달하면 0으로 리셋
      if (newStampCount === 8) {
        setStampCount(0);
      } else {
        setStampCount(newStampCount);
      }

      // `StampInfo`를 한 번 클릭할 때마다 추가
      setStampInfoList((prev) => [...prev, <StampInfo key={prev.length} />]);
    }
  };

  return (
    <>
      <Header>스탬프</Header>
      <section className={styles.stampSection}>
        <div className={styles.stampBox}>
          <div className={styles.stampBoxHeader}>
            <strong className={styles.stampName}>코딩몬스터</strong>님
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

        <button onClick={addStamp} className={styles.addStampButton}>
          스탬프 추가
        </button>

        <section className={styles.stampWrap}>{stampInfoList}</section>
      </section>
    </>
  );
}
