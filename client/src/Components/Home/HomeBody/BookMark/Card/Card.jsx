import styles from "./Card.module.css";
import img1 from "../../../../../assets/img/Main/backImg1.png";

export default function Card({ post }) {
  // imageUrl이 없으면 기본 이미지 사용
  const imgSrc = post?.image_path || img1;

  return (
    <div className={styles.card}>
      <div className={styles.card_img}>
        <img src={imgSrc} alt="" />
      </div>
      <div className={styles.card_textWarp}>
        <div className={styles.card_text}>{post?.post_content}</div>
        <div className={styles.card_userName}>{post?.user_name}</div>
      </div>
    </div>
  );
}
