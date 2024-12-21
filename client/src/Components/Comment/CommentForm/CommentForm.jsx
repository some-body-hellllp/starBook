import styles from "./CommentForm.module.css";
import { PageData } from "../../../provider/PageProvider";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CommentForm({ setGetComment, postId }) {
  const { userData } = useContext(PageData);
  const navigate = useNavigate();

  // 댓글 입력 상태 관리
  const [comment, setComment] = useState("");

  // 댓글 입력 시 상태 업데이트
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  // 댓글 제출 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // 페이지 새로고침 방지

    if (!userData.isLogin) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/account");
      return;
    }

    if (!comment.trim()) {
      alert("댓글을 입력해 주세요.");
      return;
    }

    try {
      // Axios로 댓글을 서버에 전송
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/bookmark/comment`, {
        id: userData.userId,
        postId: postId, // 댓글이 달린 게시글의 ID
        content: comment, // 입력한 댓글 내용
        name: userData.nickName,
      });

      // 성공 시 처리: 댓글 목록 갱신 등을 위한 함수 호출
      setGetComment((prev) => !prev); // 예시로 새 댓글을 추가하는 방식

      // 입력 필드 초기화
      setComment("");
      console.log(response);
    } catch (error) {
      console.error("댓글 작성에 실패했습니다.", error);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.comment_write}>
      <div className={styles.comment_write_innerWrap}>
        <input
          type="text"
          className={styles.comment_text}
          placeholder="댓글 입력하기"
          value={comment} // input value를 상태로 관리
          onChange={handleChange} // 상태 업데이트
          readOnly={!userData.isLogin} // 로그인 상태에 따라 읽기 전용 처리
        />
        <button type="submit" className={styles.comment_submit}>
          게시
        </button>
      </div>
    </form>
  );
}
