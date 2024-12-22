import Header from "../Header/Header";
import styles from "./Account_detail.module.css";

import dummyImg from "../../assets/img/Account/Generic avatar.svg";

import { useContext, useState } from "react";
import { PageData } from "../../provider/PageProvider";
import axios from "axios";

export default function AccountDetail() {
  const { userData, setUserData } = useContext(PageData);
  const [isReadOnly, setIsReadOnly] = useState(true); // readOnly 상태를 관리하는 state
  const [nickName, setNickName] = useState(userData.nickName || "코딩몬스터"); // 닉네임 상태
  const postUrl = import.meta.env.VITE_API_URL;

  const toggleReadOnly = () => {
    if (!userData.userId && userData.isLogin === false) {
      return alert("로그인 후 사용 가능합니다");
    }
    setIsReadOnly((prev) => !prev); // 상태를 토글
  };

  const nickNameChange = (e) => {
    setNickName(e.target.value); // 닉네임 상태 변화시 감지
  };

  // 닉네임 변경 함수
  async function formHandler(e) {
    e.preventDefault(); // 기본 동작 방지

    // 로그인 확인
    if (!userData.userId) {
      alert("로그인 후 사용 가능합니다.");
      return;
    }

    // 닉네임 변경 사항 확인
    if (userData.nickName === nickName) {
      toggleReadOnly(); // 변경 사항 없으면 읽기 모드로 전환
      return;
    }

    console.log("닉네임 변경 시작");

    try {
      // 닉네임 변경 요청
      const response = await axios.put(`${postUrl}/auth/user`, {
        id: userData.userId,
        currentNickname: userData.nickName,
        newNickname: nickName,
      });

      console.log("응답 데이터:", response.data);

      // 닉네임 변경 성공
      alert(`닉네임이 '${nickName}'(으)로 변경되었습니다!`);
      setIsReadOnly(true); // 읽기 모드로 전환
      setUserData((prevData) => ({
        ...prevData,
        nickName: nickName,
      }));
    } catch (error) {
      // 닉네임 변경 실패
      console.error("닉네임 변경 실패:", error);

      // 사용자에게 에러 메시지 표시
      if (error.response) {
        alert(`닉네임 변경 실패: ${error.response.data.message || "알 수 없는 오류입니다."}`);
      } else {
        alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  }

  return (
    <>
      <Header
        showBackButton={true}
        showSubmitButton={true}
        backgroundColor={"white"}
        buttonText={isReadOnly ? "수정" : "완료"}
        submitFunction={(e) => {
          // 여기에서 e.preventDefault()가 아니라 onSubmit에서 처리
          isReadOnly ? toggleReadOnly() : formHandler(e);
        }} // toggleReadOnly는 버튼 클릭 시 호출
      >
        {isReadOnly ? "회원 정보" : "회원 정보 수정"}
      </Header>
      <section className={styles.account_detailBox}>
        <form onSubmit={(e) => formHandler(e)}>
          {" "}
          {/* formHandler에서 e를 받아 처리 */}
          {/* 프로필 사진 */}
          <div className={styles.proFile}>
            <div className={styles.account_detailBox_Name}>프로필사진</div>
            <div className={styles.proFileImgPosition}>
              <div className={styles.proFileImg}>
                <img
                  className={styles.proFileImgElement}
                  src={userData.profile !== null ? userData.profile : emptyImg}
                  alt="emptyImg"
                  onClick={() => console.log(userData)}
                />
              </div>
            </div>
            <div className={styles.proFileButtonBox}>
              {/* 닉네임 수정이 아니라면 '등록' 버튼을 숨김 */}
              {!isReadOnly && (
                <button type="button" className={styles.proFileButton}>
                  등록
                </button>
              )}
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
