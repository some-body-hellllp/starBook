// 스타일
import styles from "./BookmarkHeader.module.css";
export default function BookmarkHeader({ author, location, time }) {
  return (
    <>
      <header className={styles.title}>
        <div className={styles.title_innerWrap}>
          <span className={styles.user_name}>{author}</span>
          <div className={styles.info}>{location}</div>
        </div>
        <div className={styles.info}>{time}</div>
      </header>
    </>
  );
}
