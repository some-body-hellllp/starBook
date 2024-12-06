import styles from "./Tap.module.css";
import { HomeIcon, LocationIcon, QRIcon, StampIcon, HumanIcon } from "../../assets/img/Tab/Tab_image";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageData } from "../../provider/PageProvider";

function Tap() {
  const { page, setPage } = useContext(PageData);
  const navigate = useNavigate();
  const [resolveCallback, setResolveCallback] = useState(null);

  useEffect(() => {
    if (page && resolveCallback) {
      // 상태 변경 후 resolve 호출
      resolveCallback();
      setResolveCallback(null); // 콜백 초기화
    }
  }, [page, resolveCallback]);

  function pageHandler(word) {
    return new Promise((resolve) => {
      setPage(word); // 상태 업데이트
      setResolveCallback(() => resolve); // resolve를 저장
      console.log("헤더 로딩 끝");
    }).then(() => {
      // navigate는 상태 업데이트 후에 실행
      navigate(word === "home" ? "/" : `/${word}`);
    });
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
