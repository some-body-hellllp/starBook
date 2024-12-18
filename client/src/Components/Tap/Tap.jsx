import styles from "./Tap.module.css";
import { HomeIcon, LocationIcon, QRIcon, StampIcon, HumanIcon } from "../../assets/img/Tab/Tab_image";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PageData } from "../../provider/PageProvider";
function Tap() {
  const [page, setPage] = useState("home"); // 초기 페이지는 home
  const { userData } = useContext(PageData);
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로를 추적

  function pageHandler(location) {
    setPage(location);
    const path = location === "home" ? "/" : `/${location}`;
    navigate(path, { state: { from: location } }); // 네비게이션 시 스테이트에 경로 저장?
  }

  // 페이지가 변경될 때마다 상태 업데이트 (현재 페이지 추적)
  useEffect(() => {
    // 페이지 경로가 바뀔 때마다 상태 갱신
    const currentPath = location.pathname.split("/")[1] || "home"; // 현재 경로에서 페이지 추출
    setPage(currentPath);
  }, [location]);

  return (
    <section className={styles.tab}>
      <div className={styles.tabInnerWrap}>
        <section className={styles.tabIconWrap}>
          <div className={styles.tabIcon}>
            <div onClick={() => pageHandler("home")}>
              <HomeIcon page={page} />
            </div>
            <div
              onClick={() => {
                if (userData.isLogin === false) {
                  return alert("로그인이 필요한 기능입니다 로그인해주세요");
                }
                pageHandler("location");
              }}
            >
              <LocationIcon page={page} />
            </div>
            <div>
              <QRIcon
                onClick={() => {
                  if (userData.isLogin === false) {
                    return alert("로그인이 필요한 기능입니다 로그인해주세요");
                  }
                  pageHandler("qr");
                }}
              />
            </div>
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
