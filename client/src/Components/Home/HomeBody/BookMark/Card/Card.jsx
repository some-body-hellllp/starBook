import styles from "./Card.module.css";
import img1 from "../../../../../assets/img/Main/backImg1.png";

export default function Card() {
  return (
    <div className={styles.card}>
      <div className={styles.card_img}>
        <img src={img1} alt="" />
      </div>
      <div className={styles.card_textWarp}>
        <div className={styles.card_text}>한번 가보고 싶었는데 드디어! 예쁜 공간 잘 둘러보고 갑니다! 맘에 드는 책도 샀어요^^ 조만간 또 들리겠습니다</div>
        <div className={styles.card_userName}>유저이름</div>
      </div>
    </div>
  );
}
