import { useState, useEffect, useRef } from "react";
import Header from "../Header/Header";
import BookmarkPost from "./BookmarkPost/BookmarkPost";
import styles from "./Bookmark.module.css";
import dummyPosts from "./Bookmarkdummy"; // 더미 데이터를 import

export default function Bookmark() {
  const [posts, setPosts] = useState(dummyPosts.slice(0, 5)); // 처음에는 7개의 포스트만 보이도록 설정
  const observerRef = useRef(null); // IntersectionObserver를 위한 ref

  // 스크롤 끝에 도달하면 더 많은 포스트를 추가하는 함수
  const loadMorePosts = () => {
    setPosts((prevPosts) => {
      // 더 많은 포스트를 배열에 추가
      return [
        ...prevPosts,
        ...dummyPosts.slice(prevPosts.length, prevPosts.length + 3), // 한 번에 1개씩 추가
      ];
    });
  };

  // IntersectionObserver 설정
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadMorePosts(); // 마지막 포스트가 보일 때 새로운 포스트를 로드
        }
      });
    });

    if (observerRef.current) {
      observer.observe(observerRef.current); // 마지막 BookmarkPost를 감시
    }

    // clean up the observer on component unmount
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [posts]); // posts가 변경될 때마다 observer를 새로 설정

  return (
    <>
      <Header showBackButton={true} showWriteButton={true} backgroundColor={"#ffffff"} backButtonFunction={"/"}>
        책갈피
      </Header>
      <section className={styles.bookmark}>
        {posts.map((post) => (
          <BookmarkPost key={post.id} post={post} id={post.id} />
        ))}
        <div ref={observerRef} style={{ height: "20px" }}></div> {/* Observer가 감시하는 마지막 요소 */}
      </section>
    </>
  );
}
