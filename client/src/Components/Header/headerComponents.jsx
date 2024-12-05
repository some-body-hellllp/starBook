import { useContext } from "react";
import { PageData } from "../../provider/PageProvider";
import { BackIcon, WriteIcon, CancelIcon } from "../../assets/img/Header/Header_image";
import styles from "./Header.module.css"; // CSS 모듈 import

export const headerComponents = {
  home: (
    <HeaderComponent>
      <div className={styles.whiteFont}>별책부록</div>
    </HeaderComponent>
  ),
  location: (
    <HeaderComponent>
      <div>지도</div>
    </HeaderComponent>
  ),
  account: (
    <HeaderComponent>
      <div>마이페이지</div>
    </HeaderComponent>
  ),
  stamp: (
    <HeaderComponent>
      <div>스탬프</div>
    </HeaderComponent>
  ),
  bookMark: (
    <HeaderComponent>
      <BackIcon color={"#42688B"} />
      <div>책갈피</div>
      <WriteIcon />
    </HeaderComponent>
  ),
  write: (
    <HeaderComponent>
      <BackIcon color={"#ffffff"} />
      <div>등록</div>
    </HeaderComponent>
  ),
  comment: (
    <HeaderComponent>
      <CancelIcon />
      <div>&nbsp</div>
    </HeaderComponent>
  ),
};

function HeaderComponent({ children }) {
  const { page } = useContext(PageData);

  return (
    <div
      className={`${
        page === "home" || page === "location" || page === "stamp" || page === "account"
          ? styles.headerContent
          : styles.headerContents
      }`}
    >
      {children}
    </div>
  );
}
