// 리액트 라우터
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 초기화 css
import "./index.css";

// 컴포넌트
// 레이아웃 컴포넌트 (푸터 출력을 여기서 설정)
import StarBook from "./Components/StarBook/StarBook.jsx";
// 스플레시
import Splash from "./Components/Splash/Splash.jsx";
// 메인
import Home from "./Components/Home/Home.jsx";
// 지도
import Location from "./Components/Location/Location.jsx";
//QR
import Qr from "./Components/Qr/Qr.jsx";
// 스탬프
import Stamp from "./Components/Stamp/Stamp.jsx";
// 마이페이지, 회원정보, 쿠폰
import Account from "./Components/Account/Account.jsx";
import Account_detail from "./Components/Account_detail/Account_detail.jsx";
import Coupon from "./Components/Coupon/Coupon.jsx";
// 로그인과 회원가입
import Login from "./Components/Login/Login.jsx";
import SignUp from "./Components/SignUp/SignUp.jsx";
// 북마크 피드, 게시글 작성, 댓글 작성
import Bookmark from "./Components/Bookmark/Bookmark.jsx";
import Write from "./Components/Write/Write.jsx";
import Comment from "./Components/Comment/Comment.jsx";
// 카카오 로그인 리다이렉트 URL
import Auth from "./Components/Auth/Auth.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<StarBook />}>
            <Route index element={<Home />} />
            <Route path="qr" element={<Qr />} />
            <Route path="splash" element={<Splash />} />
            <Route path="location" element={<Location />} />
            <Route path="stamp" element={<Stamp />} />
            <Route path="account" element={<Account />} />
            <Route path="account_detail" element={<Account_detail />} />
            <Route path="bookmark" element={<Bookmark />} />
            <Route path="write" element={<Write />} />
            <Route path="comment" element={<Comment />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="coupon" element={<Coupon />} />
            <Route path="auth" element={<Auth />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
