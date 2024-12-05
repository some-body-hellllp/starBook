import { createContext, useState } from "react";

export const PageData = createContext();

const PageProvider = ({ children }) => {
  const [page, setPage] = useState("home");

  return <PageData.Provider value={{ page, setPage }}>{children}</PageData.Provider>;
};

export default PageProvider;
