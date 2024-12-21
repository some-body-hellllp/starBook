import styles from "./CommentForm.module.css";

import { PageData } from "../../../provider/PageProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function CommentForm() {
  const { userData } = useContext(PageData);
  const navigate = useNavigate();
  return (
    <>
      <form action="" className={styles.comment_write}>
        <div className={styles.comment_write_innerWrap}>
          <input
            type="text"
            className={styles.comment_text}
            placeholder="댓글 입력하기"
            readOnly={userData.isLogin === false}
            onClick={() => {
              if (userData.isLogin == false) {
                alert("로그인이 필요한 서비스입니다.");
                navigate("/account");
              }
            }}
          />
          <button type="submit" className={styles.comment_submit}>
            게시
          </button>
        </div>
      </form>
    </>
  );
}
