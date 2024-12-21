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

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const loadPosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const limit = 5;
      const response = await axios.get(`${postUrl}/bookmark`, {
        params: {
          limit: limit,
          offset: offset,
        },
      });

      const newData = response.data.data; // 서버 응답 구조에 맞춤
      console.log(newData); // 서버에서 받아온 데이터

      setPosts((prevPosts) => {
        const newPosts = newData.filter((newPost) => !prevPosts.some((post) => post.post_id === newPost.post_id));
        console.log("newPosts :", newPosts);
        return [...prevPosts, ...newPosts];
      });
      // offset 값을 갱신해야 하므로 이곳에서 처리
      setOffset((prevOffset) => prevOffset + 3); // offset 값 갱신
      if (newData.length < limit) {
        setHasMore(false); // 더 이상 로드할 데이터가 없으면
      }
    } catch (error) {
      console.error("게시글을 불러오는 데 실패했습니다.", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // inView 상태가 변경될 때만 추가 로드
  useEffect(() => {
    if (inView && !loading && hasMore) {
      setLoading(true);
      loadPosts(); // 스크롤이 뷰포트에 도달하면 호출
      console.log("수정");
      setLoading(false);
    }
  }, [inView, loading, hasMore]); // inView, loading, hasMore 상태에 따라 의존성 변경

  return (
    <>
      <Header showBackButton={true} showWriteButton={true} backgroundColor={"#ffffff"} backButtonFunction={"/home"}>
        책갈피
      </Header>
      <section className={styles.bookmark} onClick={() => console.log(posts)}>
        {posts.map((post, index) => (
          <BookmarkPost key={index} post={post} />
        ))}
        {/* 관찰 대상 요소 */}
        {hasMore && (
          <div ref={ref} className={styles.loading}>
            {loading ? "로딩 중..." : ""}
          </div>
        )}
        {!hasMore && posts.length > 0 && <div className={styles.endMessage}>더 이상 데이터가 없습니다.</div>}
        {!hasMore && posts.length === 0 && <div className={styles.endMessage}>북마크한 게시글이 없습니다.</div>}
      </section>
    </>
  );
}
