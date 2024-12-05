import { useContext } from "react";
import { PageData } from "../../provider/PageProvider";
import styles from "./Header.module.css"; // CSS 모듈 import

export const headerComponents = {
  home: <HeaderComponent>별책부록</HeaderComponent>,
  location: <HeaderComponent>지도</HeaderComponent>,
  account: <HeaderComponent>마이페이지</HeaderComponent>,
  stamp: <HeaderComponent>스탬프</HeaderComponent>,
  bookMark: (
    <HeaderComponent>
      <div>뒤로가기 파란색</div>
      <div>책갈피</div>
      <div>글 작성</div>
    </HeaderComponent>
  ),
  write: (
    <HeaderComponent>
      <div>뒤로가기 흰색</div>
      <div>등록</div>
    </HeaderComponent>
  ),
  comment: (
    <HeaderComponent>
      <div> X 파란색</div>
      <div>공백</div>
    </HeaderComponent>
  ),
};

function HeaderComponent({ children }) {
  const { page } = useContext(PageData);

  return <div className={`${styles.headerContents} ${page === "home" ? styles.home : ""}`}>{children}</div>;
}
