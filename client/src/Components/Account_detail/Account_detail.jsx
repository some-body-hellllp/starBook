import Header from "../Header/Header";
import styles from "./Account_detail.module.css";
export default function AccountDetail() {
  return (
    <>
      {" "}
      <Header showBackButton={true} showSubmitButton={true} buttonText={"수정"}>
        회원 정보
      </Header>
      <section className={styles.account_detailBox}>
        <div className={styles.proFile}>
          <div className={styles.account_detailBox_Name}>프로필사진</div>
          <div className={styles.proFileImgPosition}>
            <div className={styles.proFileImg}>이미지</div>
          </div>
          <div className={styles.proFileButtonBox}>
            <button className={styles.proFileButton}>등록</button>
          </div>
        </div>
        <div className={styles.nickName}>
          <div className={styles.account_detailBox_Name}>닉네임</div>
          <div className={styles.myNickName}>
            <input className={styles.input} type="text" name="" readOnly value={"코딩몬스터"} />
          </div>
        </div>
      </section>
    </>
  );
}
