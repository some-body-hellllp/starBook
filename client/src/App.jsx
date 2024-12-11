// 리액트 라우터
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 초기화 css
import "./index.css";

// 컴포넌트
import StarBook from "./components/StarBook/Starbook";
import Home from "./Components/Home/Home";
import Account from "./Components/Account/Account";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Stamp from "./Components/Stamp/Stamp";
import Account_detail from "./Components/Account_detail/Account_detail";
import Coupon from "./Components/Coupon/Coupon";

import Bookmark from "./Components/Bookmark/Bookmark";

function App() {
  return (
    <>
      <div></div>
      <Router>
        <Routes>
          <Route element={<StarBook />}>
            <Route index element={<Home />} />
            <Route path="location" element={<div>location</div>} />
            <Route path="stamp" element={<Stamp />} />
            <Route path="account" element={<Account />} />

            <Route path="account_detail" element={<Account_detail />} />
            <Route path="bookmark" element={<Bookmark />} />

            <Route path="write" element={<div>write</div>} />
            <Route path="comment" element={<div>comment</div>} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />

            <Route path="modify" element={<div>modify</div>} />
            <Route path="coupon" element={<Coupon />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
