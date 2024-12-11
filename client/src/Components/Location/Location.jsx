import { useEffect } from "react";

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

  return <div id="map" style={{ width: "100%", height: "1000px" }}></div>;
}
