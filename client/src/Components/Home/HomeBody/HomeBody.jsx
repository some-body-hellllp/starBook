import Banner from "./Banner/Banner";
import BookMark from "./BookMark/BookMark";
import styles from "./HomeBody.module.css";

import { useNavigate } from "react-router-dom";

function HomeBody() {
  const navigate = useNavigate();
  return (

    <div>
      <Banner />
      <BookMark />
    </div>

  );
}

export default HomeBody;
