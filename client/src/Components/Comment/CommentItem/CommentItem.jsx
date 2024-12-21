import styles from "./CommentItem.module.css";
import icon from "../../../assets/img/Bookmark/profile.png";
export default function CommentItem({ tag = "독립서점", time = "2일전", content = "매장 분위기가 좋아요" }) {
  return (
    <>
      <article className={styles.comment_content}>
        <aside>
          <img src={icon} alt="프로필 아이콘" />
        </aside>
        <div className={styles.comment_details}>
          <header className={styles.comment_header}>
            <div>{tag}</div>
            <div>{time}</div>
          </header>
          <div className={styles.comment_body}>{content}</div>
        </div>
      </article>
    </>
  );
}
