import HomeHeader from "./HomeHeader/HomeHeader";
import HomeBody from "./HomeBody/HomeBody";
import Header from "../Header/Header";
import styles from "../Header/Header.module.css";

function Home() {
  return (
    <>
      <Header>
        <div className={styles.white_font}>별책부록</div>
      </Header>
      <HomeHeader />
      <HomeBody />
    </>
  );
}

export default Home;
