// 리액트 라우터
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 초기화 css
import "./App.css";

// 컴포넌트
import StarBook from "./components/StarBook/Starbook";
import Home from "./Components/Home/Home";
import Account from "./Components/Account/Account";
import Login from "./Components/Login/Login";

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
            <Route path="bookmark" element={<div>bookmark</div>} />
            <Route path="write" element={<div>write</div>} />
            <Route path="login" element={<Login />} />
            <Route path="modify" element={<div>modify</div>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
