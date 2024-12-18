import { useState, useEffect, useRef } from "react";
import Header from "../Header/Header";
import BookmarkPost from "./BookmarkPost/BookmarkPost";
import styles from "./Bookmark.module.css";

export default function Bookmark() {
  const [posts, setPosts] = useState(Array(7).fill(null)); // 초기 7개의 BookmarkPost 로드
  const observerRef = useRef(null); // IntersectionObserver를 위한 ref

  // 스크롤 끝에 도달하면 새로운 BookmarkPost를 추가하는 함수
  const loadMorePosts = () => {
    setPosts((prevPosts) => [
      ...prevPosts,
      ...Array(3).fill(null), // 3개의 새로운 포스트 추가
    ]);
  };

  // IntersectionObserver 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadMorePosts(); // 마지막 포스트가 보일 때 더 로드
          }
        });
      },
      {
        rootMargin: "100px", // 100px 전에 트리거되도록 설정
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current); // 마지막 BookmarkPost를 감시
    }

    // clean up the observer on component unmount
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  return (
    <>
      <Header showBackButton={true} showWriteButton={true} backgroundColor={"#ffffff"} backButtonFunction={"/"}>
        책갈피
      </Header>
      <section className={styles.bookmark}>
        {posts.map((_, index) => (
          <BookmarkPost key={index} />
        ))}
        <div ref={observerRef} style={{ height: "20px" }}></div> {/* Observer가 감시하는 마지막 요소 */}
      </section>
    </>
  );
}
