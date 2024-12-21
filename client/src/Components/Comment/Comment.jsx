// 컴포넌트
import Header from "../Header/Header";
import CommentItem from "./CommentItem/CommentItem";
import CommentForm from "./CommentForm/CommentForm";
// 스타일
import styles from "./Comment.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Comment() {
  const [getComment, setGetComment] = useState(false); // 댓글 갱신 상태
  const [comments, setComments] = useState([]); // 댓글 리스트
  const postId = new URL(window.location.href).searchParams.get("post") || null;

  // 댓글 불러오기 함수
  const fetchComments = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/bookmark/comment`, {
        params: {
          postId: postId, // 현재 게시글 ID
        },
      });
      setComments(response.data); // 서버에서 받은 댓글 데이터 설정
    } catch (error) {
      console.error("댓글을 불러오는 데 실패했습니다:", error);
    }
  };

  // 댓글 데이터 로드
  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [getComment]); // postId나 getComment 상태가 변경될 때 호출
  console.log(comments);
  return (
    <>
      <Header showCancleButton={true} backgroundColor="#ffffff" />
      <section className={styles.comment}>
        <CommentItem />
        <CommentItem />
        {comments.map((comment) => (
          <CommentItem key={comment.comment_id} comment={comment} />
        ))}

        <CommentForm setGetComment={setGetComment} postId={postId} />
      </section>
    </>
  );
}
