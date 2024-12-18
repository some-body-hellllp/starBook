import { createContext, useState } from "react";

export const PageData = createContext();

const PageProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    userId: null, // 유저 아이디
    profile: null, // 유저 프로필 사진 (미구현)
    nickName: null, // 유저 닉네임
    stamp: null, // 스탬프 현황
    stampCount: null, // 누적 스탬프 갯수
    isLogin: false, // 로그인 확인
  });

  return <PageData.Provider value={{ userData, setUserData }}>{children}</PageData.Provider>;
};

export default PageProvider;
