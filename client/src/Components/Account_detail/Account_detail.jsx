import Header from "../Header/Header";
import styles from "./Account_detail.module.css";

import { useContext, useState } from "react";
import { PageData } from "../../provider/PageProvider";

export default function AccountDetail() {
  const { userData } = useContext(PageData);
  const [isReadOnly, setIsReadOnly] = useState(true); // readOnly 상태를 관리하는 state
  const [nickName, setNickName] = useState(userData.nickName || "코딩몬스터"); // 닉네임 상태

  const toggleReadOnly = () => {
    setIsReadOnly((prev) => !prev); // 상태를 토글
  };

  const nickNameChange = (e) => {
    setNickName(e.target.value); // 닉네임 상태 변경
  };

  // 서브밋 함수
  const handleSubmit = () => {
    // 여기에 API 호출 등을 추가할 수 있습니다.
    setIsReadOnly((prev) => !prev); // 상태를 토글
    // api 호출 종료
    alert(`닉네임이 '${nickName}'로 변경되었습니다!`);
    console.log("forme");
  };

  return (
    <>
      <Header
        showBackButton={true}
        showSubmitButton={true}
        buttonText={isReadOnly ? "수정" : "완료"}
        submitFunction={() => {
          isReadOnly ? toggleReadOnly() : handleSubmit();
        }} // toggleReadOnly는 버튼 클릭 시 호출
      >
        회원 정보
      </Header>
      <section className={styles.account_detailBox}>
        <form onSubmit={handleSubmit}>
          {" "}
          {/* onSubmit으로 handleSubmit 연결 */}
          {/* 프로필 사진 */}
          <div className={styles.proFile}>
            <div className={styles.account_detailBox_Name}>프로필사진</div>
            <div className={styles.proFileImgPosition}>
              <div className={styles.proFileImg}>이미지</div>
            </div>
            <div className={styles.proFileButtonBox}>
              <button type="button" className={styles.proFileButton}>
                등록
              </button>
            </div>
          </div>
          {/* 닉네임 */}
          <div className={styles.nickName}>
            <div className={styles.account_detailBox_Name}>닉네임</div>
            <div className={styles.myNickName}>
              <input
                className={`${styles.input} ${!isReadOnly ? styles.editable : ""}`}
                type="text"
                value={nickName} // 상태로 닉네임을 관리
                readOnly={isReadOnly} // 상태에 따라 readOnly 적용
                onChange={nickNameChange} // 입력값 변경 핸들러
              />
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
