import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import "./App.css";
import StarBook from "./components/StarBook/Starbook";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<StarBook />}>
            <Route index element={<Home />} />
            <Route path="location" element={<div>location</div>} />
            <Route path="stamp" element={<div>stamp</div>} />
            <Route path="account" element={<div>account</div>} />
            <Route path="bookmark" element={<div>bookmark</div>} />
            <Route path="write" element={<div>write</div>} />
            <Route path="login" element={<div>login</div>} />
            <Route path="modify" element={<div>modify</div>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
