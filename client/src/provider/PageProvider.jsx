import { createContext, useState } from "react";

export const PageData = createContext();

const PageProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    userId: null,
    profile: null,
    nickName: null,
    stamp: null,
    stampCount: null,
    islogin: "logout",
  });

  return <PageData.Provider value={{ userData, setUserData }}>{children}</PageData.Provider>;
};

export default PageProvider;
