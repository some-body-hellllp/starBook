import { useEffect } from "react";
import Header from "../Header/Header";

import "./Location.css";
export default function Location() {
  useEffect(() => {
    // 카카오맵 그리기
    printKakaomap();
  }, []);

  // 카카오맵 그리기
  function printKakaomap() {
    var container = document.getElementById("map");
    var options = {
      center: new window.kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };
    var map = new window.kakao.maps.Map(container, options);
  }

  return (
    <>
      <Header backgroundColor="#ffffff">지도</Header>
      <section className="location">
        <div id="map" style={{ width: "100%", height: "1000px" }}></div>
      </section>
    </>
  );
}
