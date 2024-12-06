import { useContext, useEffect } from "react";
import { PageData } from "../../provider/PageProvider";
import { useNavigate } from "react-router-dom";
import { BackIcon, WriteIcon, CancelIcon } from "../../assets/img/Header/Header_image";
import styles from "./Header.module.css"; // CSS 모듈 import

function HeaderComponent({ children, showBackButton = false, path = "home" }) {
  const { page, setPage } = useContext(PageData); // 현재 페이지 상태를 얻음
  const navigate = useNavigate();

  // 페이지가 변경될 때마다 해당 페이지로 이동
  useEffect(() => {
    if (page) {
      // console.log(page); // 페이지 확인용
      navigate(page === "home" ? "/" : `/${page}`);
    }
  }, [page, navigate]);

  // 뒤로 가기 기능 구현중(현재 절대값으로 이동은 가능)
  function handleBackClick(word) {
    setPage(word);
    // let path = location.pathname
  }

  // 헤더의 클래스 이름을 조건에 맞게 설정
  const validPages = new Set(["home", "location", "stamp", "account"]); // 유효한 페이지 목록

  // 헤더의 요소가 하나만 들어가는 경우 중앙 정렬, 아니라면 space-between 적용
  const headerClass = validPages.has(page) ? styles.headerContent : styles.headerContents;

  return (
    <div className={headerClass}>
      {/* 뒤로 가기 아이콘 추가 */}
      {showBackButton && <BackIcon onClick={() => handleBackClick(`${path}`)} color={"#42688B"} />}

      {children}
    </div>
  );
}

// 각 헤더 컴포넌트 정의
const HomeHeader = () => (
  <HeaderComponent showBackButton={false}>
    <div className={styles.whiteFont}>별책부록</div>
  </HeaderComponent>
);

const LocationHeader = () => (
  <HeaderComponent showBackButton={false}>
    <div>지도</div>
  </HeaderComponent>
);

const StampHeader = () => (
  <HeaderComponent showBackButton={false}>
    <div>스탬프</div>
  </HeaderComponent>
);

const AccountHeader = () => (
  <HeaderComponent showBackButton={false}>
    <div>마이페이지</div>
  </HeaderComponent>
);

const BookMarkHeader = () => {
  const navigate = useNavigate(); // 여기서 navigate 사용
  return (
    <HeaderComponent showBackButton={true}>
      <div>책갈피</div>
      <WriteIcon />
    </HeaderComponent>
  );
};

const WriteHeader = () => {
  const navigate = useNavigate(); // 여기서 navigate 사용
  return (
    <HeaderComponent showBackButton={true}>
      <div>등록</div>
    </HeaderComponent>
  );
};

const CommentHeader = () => (
  <HeaderComponent showBackButton={false}>
    <CancelIcon />
    <div>{null}</div>
  </HeaderComponent>
);

const AccountDetailHeader = () => {
  const navigate = useNavigate(); // 여기서 navigate 사용
  return (
    <HeaderComponent showBackButton={true}>
      <div>회원 정보</div>
      <div>수정</div>
    </HeaderComponent>
  );
};

const AccountModifyHeader = () => {
  const navigate = useNavigate(); // 여기서 navigate 사용
  return (
    <HeaderComponent showBackButton={true}>
      <div>회원 정보 수정</div>
      <div>완료</div>
    </HeaderComponent>
  );
};

const LoginHeader = () => {
  return (
    <HeaderComponent showBackButton={true} path={"account"}>
      <div>{null}</div>
    </HeaderComponent>
  );
};

const SingUpHeader = () => {
  return (
    <HeaderComponent showBackButton={true}>
      <div>추가 정보</div>
      <div>완료</div>
    </HeaderComponent>
  );
};

export const headerComponents = {
  home: <HomeHeader />,
  location: <LocationHeader />,
  stamp: <StampHeader />,
  account: <AccountHeader />,
  bookMark: <BookMarkHeader />,
  write: <WriteHeader />,
  comment: <CommentHeader />,
  accountDetail: <AccountDetailHeader />,
  accountModify: <AccountModifyHeader />,
  login: <LoginHeader />,
  singUp: <SingUpHeader />,
};
