import thumnail from "../../../assets/img/Bookmark/thumnail.png";
import test from "../../../assets/img/Bookmark/test.jpg";
import styles from "./BookmarkContent.module.css";
export default function BookmarkContent({ content, imageUrl = null }) {
  return (
    <>
      <p className={styles.text}>{content}</p>
      <figure className={styles.thumnail}>
        <div className={styles.imgBoxWrap}>
          <img className={styles.imgBox} src={imageUrl} alt="thumnail" />
        </div>
      </figure>
    </>
  );
}
