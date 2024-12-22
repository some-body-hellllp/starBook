import styles from "./BookmarkHeader.module.css";

export default function BookmarkHeader({ author, location, time }) {
  // 날짜 차이 계산 함수
  const formatTime = (time) => {
    const postDate = new Date(time);
    const currentDate = new Date();

    // 날짜 차이 계산
    const diffTime = currentDate - postDate; // 밀리초 단위
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // 일 단위로 변환
    const diffMonths = Math.floor(diffDays / 30); // 대략적으로 1개월을 30일로 계산

    if (diffMonths >= 1) {
      return `${diffMonths}달 전`; // 1개월 이상 차이
    } else if (diffDays >= 1) {
      return `${diffDays}일 전`; // 1일 이상 차이
    } else {
      return "오늘"; // 오늘
    }
  };

  return (
    <>
      <header className={styles.title}>
        <div className={styles.title_innerWrap}>
          <span className={styles.user_name}>{author}</span>
          <div className={styles.info}>@{location}</div>
        </div>
        <div className={styles.info}>{formatTime(time)}</div>
      </header>
    </>
  );
}
