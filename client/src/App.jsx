import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import StarBook from "./components/StarBook/Starbook";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<StarBook></StarBook>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
