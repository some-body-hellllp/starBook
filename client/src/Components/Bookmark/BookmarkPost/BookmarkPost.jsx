// 컴포넌트
import BookmarkContent from "../BookmarkContent/BookmarkContent";
import BookmarkFooter from "../BookmarkFooter/BookmarkFooter";
import BookmarkHeader from "../BookmarkHeader/BookmarkHeader";
import UserProfile from "../UserProfile/UserProfile";

// 스타일
import styles from "./BookmarkPost.module.css";

export default function BookmarkPost({ post }) {
  // console.log(post);
  return (
    <>
      <article className={styles.bookmark_post}>
        <UserProfile post={post.user_profile} />
        <div className={styles.bookmark_content}>
          <BookmarkHeader author={post.user_name} location={post.post_location} time={post.create_at} />
          <BookmarkContent content={post.post_content} imageUrl={post.image_path} />
          <BookmarkFooter postId={post.post_id} postComments={post.comment_count} postLikes={post.like_count} />
        </div>
      </article>
    </>
  );
}
