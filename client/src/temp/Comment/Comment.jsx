// 컴포넌트
import Header from "../Header/Header";
import CommentItem from "./CommentItem/CommentItem";
import CommentForm from "./CommentForm/CommentForm";
// 스타일
import styles from "./Comment.module.css";

// className={styles.}

export default function Comment() {
  return (
    <>
      <Header showCancleButton={true} backgroundColor="#ffffff" />
      <section className={styles.comment}>
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentForm />
      </section>
    </>
  );
}
