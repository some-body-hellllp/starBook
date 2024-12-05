import styles from "./Tap.module.css";
import { HomeIcon, LocationIcon, QRIcon, StampIcon, HumanIcon } from "../../assets/img/Tab/Tab_image";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageData } from "../../provider/PageProvider";

function Tap() {
  const { page, setPage } = useContext(PageData);
  const navigate = useNavigate();

  useEffect(() => {
    if (page) {
      navigate(page === "home" ? "/" : `/${page}`);
    }
  }, [page, navigate]);

  function pageHandler(word) {
    setPage(word); // 상태 변경만 수행
  }

  return (
    <section className={styles.tab}>
      <div className={styles.tabInnerWrap}>
        <section className={styles.tabScreenWrap}>
          <div className={styles.tabScreen}>
            <QRIcon />
          </div>
        </section>
        <section className={styles.tabIconWrap}>
          <div className={styles.tabIcon}>
            <div onClick={() => pageHandler("home")}>
              <HomeIcon page={page} />
            </div>
            <div onClick={() => pageHandler("location")}>
              <LocationIcon page={page} />
            </div>
          </div>
          <div className={styles.tabIcon}>
            <div onClick={() => pageHandler("stamp")}>
              <StampIcon page={page} />
            </div>
            <div onClick={() => pageHandler("account")}>
              <HumanIcon page={page} />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Tap;
