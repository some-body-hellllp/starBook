import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios"; // axios 추가
import Header from "../Header/Header";
import BookmarkPost from "./BookmarkPost/BookmarkPost";
import styles from "./Bookmark.module.css";
import { PageData } from "../../provider/PageProvider"; // userData를 가져오는 context

export default function Bookmark() {
  const { userData } = useContext(PageData); // PageData context에서 userData 가져오기
  const [posts, setPosts] = useState([]); // 게시글 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [offset, setOffset] = useState(0); // 현재 offset
  const [hasMore, setHasMore] = useState(true); // 더 가져올 게시글 여부
  const containerRef = useRef(null); // 스크롤 이벤트 대상 ref
  const postUrl = import.meta.env.VITE_API_URL;

  const loadPosts = async () => {
    if (loading || !hasMore) return; // 로딩 중이거나 데이터가 더 이상 없으면 종료

    setLoading(true);

    try {
      const limit = 5; // 한 번에 가져올 데이터 수
      const response = await axios.get(`${postUrl}/bookmark`, {
        params: {
          // GET 요청은 params로 전달
          limit: limit,
          offset: offset,
        },
      });

      // 새 게시글 추가 (중복된 데이터는 추가하지 않도록 처리)
      setPosts((prevPosts) => {
        const newPosts = response.data.filter(
          (newPost) => !prevPosts.some((post) => post.id === newPost.id) // ID로 중복 검사
        );
        return [...prevPosts, ...newPosts]; // 새 게시글을 기존에 추가
      });

      // 데이터가 limit보다 적으면 더 이상 로드할 데이터 없음
      if (response.data.length < limit) {
        setHasMore(false);
      }

      // offset 업데이트
      setOffset((prevOffset) => prevOffset + limit);
    } catch (error) {
      console.error("게시글을 불러오는 데 실패했습니다.", error);
      setHasMore(false); // 오류 발생 시 로드 중지
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    // 스크롤이 바닥에 닿았을 때 데이터 로드
    if (scrollHeight - scrollTop <= clientHeight * 1.1 && hasMore) {
      loadPosts();
    }
  };

  useEffect(() => {
    // 초기 데이터 로드
    loadPosts();

    // 스크롤 이벤트 추가
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [offset, hasMore]); // offset과 hasMore 상태가 변경될 때마다 useEffect가 실행

  return (
    <>
      <Header showBackButton={true} showWriteButton={true} backgroundColor={"#ffffff"} backButtonFunction={"/home"}>
        책갈피
      </Header>
      <section ref={containerRef} className={styles.bookmark}>
        {posts.map((post, index) => (
          <BookmarkPost key={index} post={post} />
        ))}
        {loading && <div className={styles.loading}>로딩 중...</div>}
        {!hasMore && <div className={styles.endMessage}>더 이상 데이터가 없습니다.</div>}
      </section>
    </>
  );
}
