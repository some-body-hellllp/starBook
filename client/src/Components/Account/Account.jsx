import React, { useContext, useEffect, useState } from "react";
import { PageData } from "../../provider/PageProvider";
import { useNavigate } from "react-router-dom";
// 이미지
import emptyImg from "../../assets/img/Account/Generic avatar.svg";
import dummyImg from "../../assets/img/Account/accountdetailimg.svg";
// 컴포넌트
import AccountTitle from "./AccountTitle/AccountTitle";
import AccountBtn from "./AccountBtn/AccountBtn";
import Header from "../Header/Header";

// 스타일
import styles from "./Account.module.css";

export default function Account() {
  const { userData, setUserData } = useContext(PageData);

  const navigate = useNavigate();

  // 상태를 초기화하는 함수
  const resetUserData = () => {
    setUserData({
      profile: null,
      nickName: null,
      stamp: null,
      stampCount: null,
      isLogin: false,
    });
    window.localStorage.removeItem("token");
  };
  console.log(userData.profile);
  return (
    <>
      <Header>마이페이지</Header>
      <section className={styles.account}>
        <div className={styles.prifile_img}>
          <img
            src={userData.isLogin === true ? userData.profile : emptyImg}
            alt="profileImg"
            onClick={() => console.log(userData)}
          />
        </div>
        {/* 프로필 타이틀 */}
        {userData.isLogin === true ? (
          <AccountTitle nickName={userData.nickName} />
        ) : (
          <div className={styles.account_title}>로그인이 필요합니다</div>
        )}
        {/* 버튼 들어갈 자리 */}
        <div className={`${styles.account_button_wrap} ${userData.isLogin === true ? styles.userData : styles.logout}`}>
          {userData.isLogin === true ? (
            <>
              <AccountBtn className={styles.account_button} onClick={() => navigate("/account_detail")}>
                회원 정보
              </AccountBtn>
              <AccountBtn className={styles.account_button} onClick={() => navigate("/coupon")}>
                쿠폰함
              </AccountBtn>
              <AccountBtn
                className={`${styles.account_button} ${styles.white_button}`}
                buttontype="logout"
                onClick={() => resetUserData()}
              >
                로그아웃
              </AccountBtn>
            </>
          ) : (
            <AccountBtn
              className={styles.account_button}
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </AccountBtn>
          )}
        </div>
      </section>
    </>
  );
}
