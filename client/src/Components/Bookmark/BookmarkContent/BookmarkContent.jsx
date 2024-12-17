import thumnail from "../../../assets/img/Bookmark/thumnail.png";
import test from "../../../assets/img/Bookmark/test.jpg";
import styles from "./BookmarkContent.module.css";
export default function BookmarkContent() {
  return (
    <>
      <p className={styles.text}>asdasd</p>
      <figure className={styles.thumnail}>
        <div className={styles.imgBoxWrap}>
          <img className={styles.imgBox} src={thumnail} alt="thumnail" />
        </div>
      </figure>
    </>
  );
}
