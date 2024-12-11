import Tap from "../Tap/Tap.jsx";
import PageProvider from "../../provider/PageProvider.jsx";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router";
export default function StarBook() {
  const location = useLocation();
  const hideFooter = [
    "/bookmark", // 북마크
    "/comment", // 북마크 댓글
    "/write", // 북마크 글 작성
    "/account_detail", // 회원정보 수정
    "/login", // 로그인
    "/signup", // 회원가입
    "/coupon", // 쿠폰함
    "/splash", // 스플레시 (테스트용 링크)
  ].includes(location.pathname);
  return (
    <>
      <PageProvider>
        <Outlet />
        {!hideFooter && <Tap />}
      </PageProvider>
    </>
  );
}
