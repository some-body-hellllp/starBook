import Header from "../Header/Header";
import styles from "./Account_detail.module.css";

import dummyImg from "../../assets/img/Account/Generic avatar.svg";

import accountdetailimg from "../../assets/img/Account/accountdetailimg.svg";

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
  function formHandler(e) {
    e.preventDefault(); // preventDefault로 수정
    if (!userData.userId && userData.isLogin === false) {
      return alert("로그인 후 사용 가능합니다");
    }
    if (userData.nickName === nickName) {
      return toggleReadOnly(); // 변경사항이 없다면 현상 유지
    }
    console.log("닉네임 변경 시작");
    // 변경사항이 있다면 서버에 데이터 전송
    axios
      .put(`${postUrl}/auth/user`, {
        id: userData.userId,
        currentNickname: userData.nickName, // 닉네임
        newNickname: nickName,
      })
      .then(function (response) {
        console.log(response); // 성공 시 응답 로그
        console.log("전송된 데이터", userData.userId, userData.nickName, nickName);
        // 성공 후 추가 작업 (예: 페이지 이동)
        alert(`닉네임이 '${nickName}'로 변경되었습니다!`);
        setIsReadOnly((prev) => !prev); // 상태를 토글
        setUserData({ ...userData, nickName: nickName });
      })
      .catch(function (error) {
        console.log(error); // 실패 시 에러 로그
      });
  }

  return (
    <>
      <Header
        showBackButton={true}
        showSubmitButton={true}
        buttonText={isReadOnly ? "수정" : "완료"}
        submitFunction={(e) => {
          // 여기에서 e.preventDefault()가 아니라 onSubmit에서 처리
          isReadOnly ? toggleReadOnly() : formHandler(e);
        }} // toggleReadOnly는 버튼 클릭 시 호출
      >
        회원 정보
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
                  src={userData.isLogin === true ? accountdetailimg : dummyImg}
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
