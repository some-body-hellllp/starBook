import styles from "./CommentForm.module.css";

export default function CommentForm() {
  return (
    <>
      <form action="" className={styles.comment_write}>
        <div className={styles.comment_write_innerWrap}>
          <input type="text" className={styles.comment_text} placeholder="댓글 입력하기" />
          <button type="submit" className={styles.comment_submit}>
            게시
          </button>
        </div>
      </form>
    </>
  );
}
