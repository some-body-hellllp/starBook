import Header from "../Header/Header";
import styles from "./SignUp.module.css";

export default function SignUp() {
  const handleSubmit = () => {
    console.log("click!");
  };

  return (
    <>
      <Header showBackButton={true} showSubmitButton={true} buttonText={"완료"} submitFunction={handleSubmit}>
        추가 정보
      </Header>
      <section className={styles.signup}>
        <form action="" className={styles.signup_form}>
          {/* 지금 닉네임 설정이 오른쪽으로 좀 밀린거 같음 */}
          <div>닉네임 설정</div>
          <input type="text" placeholder="2~8자 이내여야합니다." />
        </form>
      </section>
    </>
  );
}
