// 컴포넌트
import Header from "../Header/Header";
import BookmarkPost from "./BookmarkPost/BookmarkPost";

// 스타일
import styles from "./Bookmark.module.css";

export default function Bookmark() {
  return (
    <>
      <Header showBackButton={true} showWriteButton={true} backgroundColor={"#ffffff"}>
        책갈피
      </Header>
      <section className={styles.bookmark}>
        <BookmarkPost />
        <BookmarkPost />
        <BookmarkPost />
        <BookmarkPost />
        <BookmarkPost />
        <BookmarkPost />
        <BookmarkPost />
      </section>
    </>
  );
}
