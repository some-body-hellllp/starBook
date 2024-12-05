import { createContext, useState } from "react";

export const PageData = createContext();

const PageProvider = ({ children }) => {
  const [page, setPage] = useState("home");
  const [islogin, setIslogin] = useState("islogin");
  const [userData, setUserData] = useState({
    profile: "",
    nickName: "",
    name: "",
    greeting: "",
    favorite: [],
  });

  return <PageData.Provider value={{ page, setPage, islogin, setIslogin }}>{children}</PageData.Provider>;
};

export default PageProvider;
