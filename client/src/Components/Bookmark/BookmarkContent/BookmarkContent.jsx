import thumnail from "../../../assets/img/Bookmark/thumnail.png";
// 스타일
import styles from "./BookmarkContent.module.css";
export default function BookmarkContent() {
  return (
    <>
      <p className={styles.text}>asdasd</p>
      <figure className={styles.thumnail}>
        <img src={thumnail} alt="thumnail" />
      </figure>
    </>
  );
}
