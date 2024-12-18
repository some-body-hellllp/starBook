import Header from "../Header/Header";
import styles from "./Write.module.css";
import bookmark from "../../assets/img/Bookmark/thumnail.png";
import pirture from "../../assets/img/Bookmark/picture.png";
// className={styles.}
export default function Write() {
  return (
    <>
      <Header
        showBackButton={true}
        backButtonColor="#FFFFFF"
        showSubmitButton={true}
        buttonText={"등록"}
        color="#FFFFFF"
      />
      <section className={styles.Write}>
        <form className={styles.Write_form} action="">
          <div className={styles.tag}>
            <div className={styles.tag_sign}>@</div>
            <input type="text" placeholder="독립서점의 이름을 적어주세요" />
          </div>
          <div className={styles.text}>
            <textarea type="text" placeholder="내용을 적어주세요" autoFocus />
          </div>
          {/* 사진 등록 할 위치  */}
          <div className={styles.photo}>
            <div className={styles.photo_upload}>
              <img src={pirture} />
            </div>
            <div className={styles.photo_uploaded}></div>
          </div>
        </form>
      </section>
    </>
  );
}
