import axios from "axios";
import Header from "../Header/Header";
import { useState } from "react";

import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [nickName, setNickname] = useState(""); // 닉네임 상태
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code"); // URL에서 'code' 파라미터 가져오기
  const profileUrl = new URL(window.location.href).searchParams.get("profile"); // URL에서 'profile' 파라미터 가져오기
  const convertUrl = convertToHttps(profileUrl);
  // console.log(convertUrl); //url 변경 확인용
  function convertToHttps(url) {
    if (url.startsWith("http://")) {
      return url.replace("http://", "https://");
    }
    return url; // 이미 https라면 그대로 반환
  }

  // 닉네임 입력 변경 핸들러
  const handleTextChange = (e) => {
    setNickname(e.target.value); // 입력값을 상태로 설정
  };

  const postUrl = import.meta.env.VITE_API_URL;

  // 폼 제출 처리 함수
  function formHandler(e) {
    // axios로 서버에 데이터 전송
    axios
      .post(`${postUrl}/auth/user`, {
        code: code, //  인증 코드
        nickName: nickName, // 닉네임
        profile: convertUrl, // 프로필 사진 링크
      })
      .then(function (response) {
        // console.log(response); // 성공 시 응답 로그
        // 성공 후 추가 작업 (예: 페이지 이동)
        alert(response.data.message); // 사용자에게 성공 메시지 표시
        navigate("/account");
      })
      .catch(function (error) {
        // console.log(error); // 실패 시 에러 로그
        alert(error.response.data.message); // 사용자에게 에러 메시지 표시
      });
  }

  return (
    <>
      <Header
        showBackButton={true}
        showSubmitButton={true}
        buttonText={"완료"}
        submitFunction={formHandler} // 폼 제출 함수 전달
        backButtonFunction={"/login"} // 뒤로가기 버튼
      >
        추가 정보
      </Header>
      <section className={styles.signup}>
        <form className={styles.signup_form} onSubmit={formHandler}>
          <div>닉네임 설정</div>
          <input
            type="text"
            placeholder="2~8자 이내여야합니다."
            value={nickName}
            onChange={handleTextChange} // 입력 값 상태 업데이트
          />
        </form>
      </section>
    </>
  );
}
