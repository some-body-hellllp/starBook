import styles from "./StampInfo.module.css"; // CSS 모듈 파일 임포트

export default function StampInfo({ stamp }) {
  // 스탬프 정보 추출
  const { stamp_location, stamp_type, create_at } = stamp;

  // 날짜 포맷팅 함수
  function formatDate(create_at) {
    const date = new Date(create_at);

    // 요일 이름 배열
    const days = ["일", "월", "화", "수", "목", "금", "토"];

    // 원하는 포맷으로 변환
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
    const day = date.getDate();
    const weekday = days[date.getDay()];

    return `${year}년 ${month.toString().padStart(2, "0")}월 ${day.toString().padStart(2, "0")}일 (${weekday})`;
  }
  function getBookstoreKoreanName(stamp_location) {
    switch (stamp_location) {
      case "damdambookstore":
        return "담담책방";
      case "pollock":
        return "더폴락";
      case "ghostbooks":
        return "고스트북스";
      case "chabangbookstore":
        return "차방책방";
      case "surchag":
        return "수르채그";
      case "ilgeulcheak":
        return "일글책";
      case "simplebookstore":
        return "심플책방";
      case "travelerbook":
        return "여행자의 책";
      case "sasohanchaegbang":
        return "사소한 책방";
      case "daebongwalk":
        return "대봉산책";
      case "publicbookstore":
        return "책방공공";
      case "chaegbangsilgyeog":
        return "책방실격";
      case "cornerbooks":
        return "더코너북스";
      case "areteinliterature":
        return "아레테인문학";
      case "chaegbangdadog":
        return "책방다독";
      default:
        return "알 수 없는 서점";
    }
  }
  function getTypes(stamp_type) {
    switch (stamp_type) {
      case "visit":
        return "방문";
      case "buy":
        return "구매";

      default:
        "알수없음";
        break;
    }
  }

  return (
    <section className={styles.stampInfoSection}>
      <div className={styles.stampInfoBox}>
        <div className={styles.stampFlex}>
          {/* 포맷된 날짜를 출력 */}
          <div className={styles.stampInfoHeader}>{formatDate(create_at)}</div>
          <div className={styles.stampInfoSide}>스탬프 1개</div>
        </div>
        <div className={styles.stampInfoText}>
          {getBookstoreKoreanName(stamp_location)} {`(${getTypes(stamp_type)})`}
        </div>
      </div>
    </section>
  );
}
