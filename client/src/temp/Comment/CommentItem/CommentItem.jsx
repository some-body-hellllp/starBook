import styles from "./CommentItem.module.css";
import icon from "../../../assets/img/Bookmark/profile.png";
export default function CommentItem() {
  return (
    <>
      <article className={styles.comment_content}>
        <aside>
          <img src={icon} alt="프로필 아이콘" />
        </aside>
        <div className={styles.comment_details}>
          <header className={styles.comment_header}>
            <div>타이틀</div>
            <div>2일전</div>
          </header>
          <div className={styles.comment_body}>내용</div>
        </div>
      </article>
    </>
  );
}
