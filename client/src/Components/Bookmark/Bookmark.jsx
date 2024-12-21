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
    threshold: 0,
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

      setPosts((prevPosts) => {
        const newPosts = response.data.filter((newPost) => !prevPosts.some((post) => post.id === newPost.id));
        return [...prevPosts, ...newPosts];
      });

      if (response.data.length < limit) {
        setHasMore(false);
      }

      setOffset((prevOffset) => prevOffset + limit);
      console.log(offset);
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
  }, []);

  // ref가 화면에 보일 때 추가 데이터 로드
  useEffect(() => {
    if (inView && !loading) {
      loadPosts();
    }
  }, [inView]);

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
