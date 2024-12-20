// 리액트 라우터
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 초기화 css
import "./index.css";

// 컴포넌트
// 레이아웃 컴포넌트 (푸터 출력을 여기서 설정)
import StarBook from "./Components/StarBook/StarBook";
// 스플레시
import Splash from "./Components/Splash/Splash";
// 메인
import Home from "./Components/Home/Home";
// 지도
import Location from "./Components/Location/Location";
//QR
import Qr from "./Components/Qr/Qr";
// 스탬프
import Stamp from "./Components/Stamp/Stamp";
// 마이페이지, 회원정보, 쿠폰
import Account from "./Components/Account/Account";
import Account_detail from "./Components/Account_detail/Account_detail";
import CouponBox from "./Components/CouponBox/CouponBox";
// 로그인과 회원가입
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
// 북마크 피드, 게시글 작성, 댓글 작성
import Bookmark from "./Components/Bookmark/Bookmark";
import Write from "./Components/Write/Write";
import Comment from "./Components/Comment/Comment";
// 카카오 로그인 리다이렉트 URL
import Auth from "./Components/Auth/Auth";
// 네이버 로그인 리다이렉트 URL
import NaverAuth from "./Components/Auth/NaverAuth";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<StarBook />}>
            <Route index element={<Splash />} />
            <Route path="qr" element={<Qr />} />
            <Route path="home" element={<Home />} />
            <Route path="location" element={<Location />} />
            <Route path="stamp" element={<Stamp />} />
            <Route path="account" element={<Account />} />
            <Route path="account_detail" element={<Account_detail />} />
            <Route path="bookmark" element={<Bookmark />} />
            <Route path="write" element={<Write />} />
            <Route path="comment" element={<Comment />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="coupon" element={<CouponBox />} />
            <Route path="auth" element={<Auth />} />
            <Route path="naver_auth" element={<NaverAuth />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
