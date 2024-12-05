import { useContext, useEffect } from "react";
import { PageData } from "../../provider/PageProvider";
import { useNavigate } from "react-router-dom";
import { BackIcon, WriteIcon, CancelIcon } from "../../assets/img/Header/Header_image";
import styles from "./Header.module.css"; // CSS 모듈 import

export const headerComponents = {
  // 홈
  home: (
    <HeaderComponent>
      <div className={styles.whiteFont}>별책부록</div>
    </HeaderComponent>
  ),
  // 지도
  location: (
    <HeaderComponent>
      <div>지도</div>
    </HeaderComponent>
  ),
  // 스탬프
  stamp: (
    <HeaderComponent>
      <div>스탬프</div>
    </HeaderComponent>
  ),
  // 마이페이지
  account: (
    <HeaderComponent>
      <div>마이페이지</div>
    </HeaderComponent>
  ),
  // 북마크(게시글 피드)
  bookMark: (
    <HeaderComponent>
      <BackIcon color={"#42688B"} />
      <div>책갈피</div>
      <WriteIcon />
    </HeaderComponent>
  ),
  // 게시글 작성
  write: (
    <HeaderComponent>
      <BackIcon color={"#ffffff"} />
      <div>등록</div>
    </HeaderComponent>
  ),
  // 댓글
  comment: (
    <HeaderComponent>
      <CancelIcon />
      <div>{null}</div>
    </HeaderComponent>
  ),
  // 유저 정보
  accountDetail: (
    <HeaderComponent>
      <BackIcon color={"#42688B"} />
      <div>회원 정보</div>
      <div>수정</div>
    </HeaderComponent>
  ),
  accountModify: (
    <HeaderComponent>
      <BackIcon color={"#42688B"} />
      <div>회원 정보 수정</div>
      <div>완료</div>
    </HeaderComponent>
  ),
  // 간편 로그인
  login: (
    <HeaderComponent>
      <BackIcon color={"#42688B"} /> <div>{null}</div>
    </HeaderComponent>
  ),
  // 회원가입
  singUp: (
    <HeaderComponent>
      <BackIcon color={"#42688B"} />

      <div>추가 정보</div>
      <div>완료</div>
    </HeaderComponent>
  ),
};

function HeaderComponent({ children }) {
  // 뒤로가기 구현중 안되면 그냥 절대값으로 갈듯
  const { page } = useContext(PageData);
  const navigate = useNavigate();

  useEffect(() => {
    if (page) {
      navigate(page === "home" ? "/" : `/${page}`);
    }
  }, [page, navigate]);

  function pageHandler(word) {
    setPage(word); // 상태 변경만 수행
  }

  const validPages = new Set(["home", "location", "stamp", "account"]); // 헤더의 요소가 하나만 들어가는 key를 배열에 넣어서 사용 (굉장히 편함)

  // 헤더에 요소가 하나만 들어가는 key는 중앙정렬 아니라면 space-beetwen을 적용하게 만듬
  return <div className={validPages.has(page) ? styles.headerContent : styles.headerContents}>{children}</div>;
}
