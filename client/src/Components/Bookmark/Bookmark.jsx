import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import Header from "../Header/Header";
import BookmarkPost from "./BookmarkPost/BookmarkPost";
import styles from "./Bookmark.module.css";
import { PageData } from "../../provider/PageProvider";

export default function Bookmark() {
  const { userData } = useContext(PageData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const postUrl = import.meta.env.VITE_API_URL;

  // ref가 화면에 보이는지 감지
  const { ref, inView } = useInView({
    threshold: 0.5, // 조금 더 일찍 로드되도록 threshold를 0.5로 설정 (50% 이상 보여졌을 때 로드)
  });

  const loadPosts = async () => {
    console.log("게시글 호출");
    if (loading || !hasMore) return;

    setLoading(true);
    console.log("로딩 시작");
    try {
      const limit = 5;
      const response = await axios.get(`${postUrl}/bookmark`, {
        params: {
          limit: limit,
          offset: offset,
        },
      });
      console.log(response.data.data);
      setPosts((prevPosts) => {
        const newPosts = response.data.data.filter((newPost) => !prevPosts.some((post) => post.id === newPost.id));
        return [...prevPosts, ...newPosts];
      });

      if (response.data.data.length < limit) {
        setHasMore(false);
      }

      // offset 업데이트
      setOffset((prevOffset) => prevOffset + 5); // limit과 동일하게 증가

      console.log("성공");
      console.log(response);
      console.log(posts);
    } catch (error) {
      console.error("게시글을 불러오는 데 실패했습니다.", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    loadPosts();
  }, []); // 초기 로드 시 실행

  // offset 상태 변경 및 inView가 true일 때 로드
  useEffect(() => {
    if (inView && !loading && hasMore) {
      loadPosts();
    }
  }, [inView, offset]); // offset, inView가 변경될 때마다 loadPosts 호출

  return (
    <>
      <Header showBackButton={true} showWriteButton={true} backgroundColor={"#ffffff"} backButtonFunction={"/home"}>
        책갈피
      </Header>
      <section className={styles.bookmark}>
        {posts.map((post, index) => (
          <BookmarkPost key={`${post.id}-${index}`} post={post} />
        ))}
        {/* 관찰 대상 요소 */}
        {hasMore && (
          <div ref={ref} className={styles.loading}>
            {loading ? "로딩 중..." : ""}
          </div>
        )}
        {!hasMore && <div className={styles.endMessage}>더 이상 데이터가 없습니다.</div>}
      </section>
    </>
  );
}
