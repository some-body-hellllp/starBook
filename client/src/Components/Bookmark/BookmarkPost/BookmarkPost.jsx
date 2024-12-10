// 컴포넌트
import BookmarkContent from "../BookmarkContent/BookmarkContent";
import BookmarkFooter from "../BookmarkFooter/BookmarkFooter";
import BookmarkHeader from "../BookmarkHeader/BookmarkHeader";
import UserProfile from "../UserProfile/UserProfile";

// 스타일
import styles from "./BookmarkPost.module.css";

export default function BookmarkPost() {
  return (
    <>
      <article className={styles.bookmark_post}>
        <UserProfile />
        <div className={styles.bookmark_content}>
          <BookmarkHeader />
          <BookmarkContent />
          <BookmarkFooter />
        </div>
      </article>
    </>
  );
}
