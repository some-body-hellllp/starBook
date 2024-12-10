import { HeartIcon, CommetIcon } from "../../../assets/img/Bookmark/Bookmark_image";
// 스타일
import styles from "./BookmarkFooter.module.css";
export default function BookmarkFooter() {
  return (
    <>
      <footer className={styles.bookmark_footer}>
        <div className={styles.icons}>
          <button className={styles.icon_wrap} aria-label="좋아요">
            <HeartIcon />
          </button>
          <button className={styles.icon_wrap} aria-label="댓글">
            <CommetIcon />
          </button>
        </div>
        <div className={styles.reactions}>댓글 1 · 좋아요 2</div>
      </footer>
    </>
  );
}
