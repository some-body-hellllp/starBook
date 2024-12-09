// 리액트 라우터
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 초기화 css
import "./App.css";

// 컴포넌트
import StarBook from "./components/StarBook/Starbook";
import Home from "./Components/Home/Home";
import Account from "./Components/Account/Account";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<StarBook />}>
            <Route index element={<Home />} />
            <Route path="location" element={<div>location</div>} />
            <Route path="stamp" element={<div>stamp</div>} />
            <Route path="account" element={<Account />} />
            <Route path="account_detail" element={<div>account_detail</div>} />
            <Route path="bookmark" element={<div>bookmark</div>} />
            <Route path="write" element={<div>write</div>} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="modify" element={<div>modify</div>} />
            <Route path="coupon" element={<div>coupon</div>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
