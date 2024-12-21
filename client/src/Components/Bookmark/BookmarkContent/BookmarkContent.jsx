import styles from "./BookmarkContent.module.css";
import bookMarkImg from "../../../assets/img/Bookmark/bookMarkImg.svg";

export default function BookmarkContent({ content, imageUrl }) {
  // imageUrl이 없으면 기본 이미지 사용
  const imgSrc = imageUrl || bookMarkImg;

  return (
    <>
      <p className={styles.text}>{content}</p>
      <figure className={styles.thumnail}>
        <div className={styles.imgBoxWrap}>
          <img className={styles.imgBox} src={imgSrc} alt="thumnail" />
        </div>
      </figure>
    </>
  );
}
