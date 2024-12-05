import styles from "./Tap.module.css";
import { Home, Location, QR, Stamp, Human } from "../../assets/img/Tab/Tab_image";
import { useContext } from "react";
import { PageData } from "../../provider/PageProvider";

function Tap() {
  const { setPage } = useContext(PageData);

  function pageHandler(word) {
    console.log(word);
    setPage(word);
  }

  return (
    <section className={styles.tab}>
      <div className={styles.tabInnerWrap}>
        <section className={styles.tabScreenWrap}>
          <div className={styles.tabScreen}>
            <img src={QR} alt="QR Code" />
          </div>
        </section>
        <section className={styles.tabIconWrap}>
          <div className={styles.tabIcon}>
            <div onClick={() => pageHandler("home")}>
              <img src={Home} alt="Home Icon" />
            </div>
            <div onClick={() => pageHandler("location")}>
              <img src={Location} alt="Location Icon" />
            </div>
          </div>
          <div className={styles.tabIcon}>
            <div onClick={() => pageHandler("stamp")}>
              <img src={Stamp} alt="Stamp Icon" />
            </div>
            <div onClick={() => pageHandler("account")}>
              <img src={Human} alt="Account Icon" />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Tap;
