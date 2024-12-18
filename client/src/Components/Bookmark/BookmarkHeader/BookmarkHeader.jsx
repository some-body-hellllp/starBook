// 스타일
import styles from "./BookmarkHeader.module.css";
export default function BookmarkHeader({ author }) {
  return (
    <>
      <header className={styles.title}>
        <div className={styles.title_innerWrap}>
          <span className={styles.user_name}>{author}</span>
          <div className={styles.info}>@서점명</div>
        </div>
        <div className={styles.info}>작성일자</div>
      </header>
    </>
  );
}
