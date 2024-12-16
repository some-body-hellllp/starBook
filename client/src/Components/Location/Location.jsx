import { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Location.css";

export default function Location() {
  // 위도, 경도 가져온 후 카카오맵 함수로 넘김
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // 카카오맵 그리기
          printKakaomap(latitude, longitude);
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true, // 정확한 위치 정보를 요청
          timeout: 10000, // 위치 정보 요청 시간 제한 (10초)
          maximumAge: 0, // 캐시된 위치 정보를 사용하지 않음
        }
      );
    } else {
      console.error("브라우저가 Geolocation API를 지원하지 않습니다. ");
    }
  }, []);

  // 카카오맵 그리기
  function printKakaomap(latitude, longitude) {
    var container = document.getElementById("map");
    var options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
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
