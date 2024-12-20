// 컴포넌트
import BookmarkContent from "../BookmarkContent/BookmarkContent";
import BookmarkFooter from "../BookmarkFooter/BookmarkFooter";
import BookmarkHeader from "../BookmarkHeader/BookmarkHeader";
import UserProfile from "../UserProfile/UserProfile";
import bookMarkImg from "../../../assets/img/Bookmark/bookMarkImg.svg";

// 스타일
import styles from "./BookmarkPost.module.css";

export default function BookmarkPost({ post, id }) {
  console.log(post);
  return (
    <>
      <article className={styles.bookmark_post}>
        <UserProfile />
        <div className={styles.bookmark_content}>
          <BookmarkHeader author={post.author} />
          <BookmarkContent content={post.content} imageUrl={bookMarkImg} />
          <BookmarkFooter />
        </div>
      </article>
    </>
  );
}
