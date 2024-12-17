import { useEffect } from "react";
import ReactDOMServer from "react-dom/server"; // React 컴포넌트를 문자열로 변환하기 위한 라이브러리
import Header from "../Header/Header";
import locationImg from "../../assets/img/Location/locationImg.svg";
import "./Location.css";
import LocationModal from "./LocationModal/LocationModal";
import areteinliterature from "../../assets/img/Location/areteinliterature.jpg";
import chabangbookstore from "../../assets/img/Location/chabangbookstore.jpg";
import chaegbangdadog from "../../assets/img/Location/chaegbangdadog.jpg";
import chaegbangsilgyeog from "../../assets/img/Location/chaegbangsilgyeog.jpg";
import cornerbooks from "../../assets/img/Location/cornerbooks.jpg";
import daebongwalk from "../../assets/img/Location/daebongwalk.jpg";
import damdambookstore from "../../assets/img/Location/damdambookstore.jpg";
import ghostbooks from "../../assets/img/Location/ghostbooks.jpg";
import ilgeulchaek from "../../assets/img/Location/ilgeulchaek.jpg";
import pollock from "../../assets/img/Location/pollock.jpg";
import publicbookstore from "../../assets/img/Location/publicbookstore.jpg";
import simplebookstore from "../../assets/img/Location/simplebookstore.jpg";
import surchag from "../../assets/img/Location/surchag.jpg";
import travelerbook from "../../assets/img/Location/travelerbook.jpg";
import sasohanchaegbang from "../../assets/img/Location/sasohanchaegbang.jpg";

export default function Location() {
  // 위치기반을 끄려면 이 부분을 수정
  useEffect(() => {
    // 위치 기반을 사용하지 않도록 코드 제거
    // 기존에는 위치를 가져왔지만, 이제는 그냥 고정된 좌표로 맵을 그리게 변경
    const defaultLatitude = 35.87; // 예시로 대구의 중심 위치
    const defaultLongitude = 128.6;

    // 카카오맵 그리기
    printKakaomap(defaultLatitude, defaultLongitude);
  }, []);

  // 카카오맵 그리기
  function printKakaomap(latitude, longitude) {
    var container = document.getElementById("map");
    var options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };
    var map = new window.kakao.maps.Map(container, options);

    var positions = [
      {
        title: "담담책방",
        adress: "대구광역시 서구 달서로 81-2 3층",
        number: "053-565-3469",
        latlng: new kakao.maps.LatLng(35.86967, 128.5708),
        img: damdambookstore,
      },
      {
        title: "더폴락",
        adress: "대구광역시 중구 성내2동 경상감영1길 62-5",
        number: "010-2977-6533",
        latlng: new kakao.maps.LatLng(35.87376, 128.5932),
        img: pollock,
      },
      {
        title: "고스트북스",
        adress: "대구광역시 중구 동문동 14-1",
        number: "053-256-2123",
        latlng: new kakao.maps.LatLng(35.87173, 128.5989),
        img: ghostbooks,
      },
      {
        title: "차방책방",
        adress: "대구광역시 중구 경상감영길 60",
        number: "053-353-4878",
        latlng: new kakao.maps.LatLng(35.87153, 128.5907),
        img: chabangbookstore,
      },
      {
        title: "수르채그",
        adress: "대구광역시 서구 통학로21길 22 1층",
        number: "010-4566-1710",
        latlng: new kakao.maps.LatLng(35.86942, 128.5609),
        img: surchag,
      },
      {
        title: "일글책",
        adress: "대구광역시 남구 계명중앙1길 42 1층",
        number: "010-1111-1111",
        latlng: new kakao.maps.LatLng(35.856, 128.5821),
        img: ilgeulchaek,
      },
      {
        title: "심플책방",
        adress: "대구광역시 동구 신천4동 동부로34길 4",
        number: "010-2222-2222",
        latlng: new kakao.maps.LatLng(35.87719, 128.6306),
        img: simplebookstore,
      },
      {
        title: "여행자의 책",
        adress: "대구광역시 동구 불로동 1000-51",
        number: "053-219-8080",
        latlng: new kakao.maps.LatLng(35.89919, 128.633),
        img: travelerbook,
      },
      {
        title: "사소한 책방",
        adress: "대구광역시 서구 당산로 210-43",
        number: "010-8884-3009",
        latlng: new kakao.maps.LatLng(35.85592, 128.5491),
        img: sasohanchaegbang,
      },
      {
        title: "대봉산책",
        adress: "대구광역시 중구 대봉2동 명덕로 249",
        number: "010-3333-3333",
        latlng: new kakao.maps.LatLng(35.8565, 128.598),
        img: daebongwalk,
      },
      {
        title: "책방공공",
        adress: "대구광역시 중구 봉산동 223-6",
        number: "010-4444-4444",
        latlng: new kakao.maps.LatLng(35.86213, 128.5976),
        img: publicbookstore,
      },
      {
        title: "책방실격",
        adress: "대구광역시 남구 중앙대로47길 24",
        number: "010-6552-2925",
        latlng: new kakao.maps.LatLng(35.85438, 128.589),
        img: chaegbangsilgyeog,
      },
      {
        title: "더코너북스",
        adress: "대구광역시 남구 대명동 566 15번지",
        number: "0507-1442-4939",
        latlng: new kakao.maps.LatLng(35.85438, 128.5704),
        img: cornerbooks,
      },
      {
        title: "아레테인문학",
        adress: "대구광역시 수성구 범어동 2206번지 3층",
        number: "010-5555-5555",
        latlng: new kakao.maps.LatLng(35.86231, 128.6227),
        img: areteinliterature,
      },
      {
        title: "책방다독",
        adress: "대구광역시 남구 대명동 번지 1층 1917-13 101호",
        number: "010-6666-6666",
        latlng: new kakao.maps.LatLng(35.85124, 128.5832),
        img: chaegbangdadog,
      },
    ];

    var imageSrc = locationImg;

    var currentOverlay = null; // 현재 열려 있는 오버레이를 추적하는 변수

    positions.forEach(function (position) {
      // 마커 이미지의 이미지 크기입니다
      var imageSize = new window.kakao.maps.Size(30, 30);

      // 마커 이미지를 생성합니다
      var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      var marker = new window.kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: position.latlng, // 마커를 표시할 위치
        title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });

      // React 컴포넌트를 문자열로 변환하여 인포윈도우의 content로 설정
      var infowindowContent = ReactDOMServer.renderToString(<LocationModal img={position.img} title={position.title} adress={position.adress} number={position.number} />);

      var customOverlay = new kakao.maps.CustomOverlay({
        content: infowindowContent,
        zIndex: 2, // 오버레이가 마커 위에 표시되도록 zIndex 설정
      });

      // 클릭 이벤트 리스너
      window.kakao.maps.event.addListener(marker, "click", function () {
        if (currentOverlay) {
          currentOverlay.setMap(null);
        }

        // 마커의 현재 위치 가져오기
        var markerPosition = marker.getPosition();

        // 지도의 투영 객체 가져오기
        var proj = map.getProjection();

        // 마커의 픽셀 좌표 계산
        var markerPixel = proj.pointFromCoords(markerPosition);

        // 마커 위쪽 50픽셀 지점의 좌표 계산
        var overlayPixel = new kakao.maps.Point(markerPixel.x, markerPixel.y - 130);

        // 픽셀 좌표를 다시 지도 좌표로 변환
        var positionForOverlay = proj.coordsFromPoint(overlayPixel);

        // 새로운 오버레이가 열려 있다면 설정
        if (currentOverlay !== customOverlay) {
          customOverlay.setPosition(positionForOverlay);
          customOverlay.setMap(map);
          currentOverlay = customOverlay;
        } else {
          currentOverlay = null; // 같은 오버레이 클릭 시 닫기
        }
      });
    });
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
