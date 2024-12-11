import { HeartIcon, CommetIcon } from "../../../assets/img/Bookmark/Bookmark_image";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// 스타일
import styles from "./BookmarkFooter.module.css";
export default function BookmarkFooter() {
  const [fill, setFill] = useState(false);
  const navigate = useNavigate();

  // api 통신 함수 안에다 넣어서 사용할듯
  function heartToggle() {
    setFill((prev) => !prev);
  }
  return (
    <>
      <footer className={styles.bookmark_footer}>
        <div className={styles.icons}>
          <button className={styles.icon_wrap} aria-label="좋아요">
            <HeartIcon onClick={() => heartToggle()} fill={fill} />
          </button>
          <button className={styles.icon_wrap} aria-label="댓글">
            <CommetIcon onClick={() => navigate("/comment")} />
          </button>
        </div>
        <div className={styles.reactions}>댓글 1 · 좋아요 2</div>
      </footer>
    </>
  );
}
