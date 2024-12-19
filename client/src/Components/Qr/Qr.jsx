import { useEffect, useRef, useState, useContext } from "react";
import { PageData } from "../../provider/PageProvider";
import jsQR from "jsqr";
import styles from "./Qr.module.css"; // CSS 모듈 import
import qrplus from "../../assets/img/qr/qrplus.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Qr() {
  const [userLocation, setUserLocation] = useState({});
  const [videoStream, setVideoStream] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(null);
  const [qrData, setQrData] = useState(null);
  const { userData, setUserData } = useContext(PageData);
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  // 카메라 실행시키는 코드
  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
          },
        });

        setVideoStream(stream);
        setPermissionGranted(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (permissionGranted === null) {
      requestCameraPermission();
    }

    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [permissionGranted, videoStream]);

  // QR 인식을 하게되면 반응하여 코드 출력 (여기서 QR코드 전송)
  useEffect(() => {
    if (qrData) {
      console.log(qrData);
      const [storeName, qrType] = qrData.split(",").map((item) => item.trim());
      const postUrl = import.meta.env.VITE_API_URL;

      const qrFetch = async () => {
        try {
          const headers = {
            Authorization: `Bearer ${token}`, // 인증 토큰
            "Content-Type": "application/json", // 요청의 Content-Type
          };

          const post = await axios.post(
            `${postUrl}/auth/visit`,
            {
              user_id: userData.userId,
              location: storeName,
              qrType: qrType,
            },
            { headers } // 세 번째 인수로 헤더 전달
          );

          console.log(post);
          // 성공적으로 처리된 후의 동작
          alert(`스탬프 적립 성공!`);

          navigate("/stamp");
        } catch (error) {
          if (error.response && error.response.status === 404) {
            alert("잘못된 QR코드입니다.");
            return setQrData(null);
          }
          if (error.response && error.response.status === 409) {
            alert("이미 방문한 서점입니다.");
            return setQrData(null);
          }
          console.error("Error during QR data submission:", error);
          // 에러 발생 시 알림이나 다른 처리
          alert("QR 인증에 실패했습니다. 다시 시도해주세요.");
          setQrData(null);
        }
      };

      qrFetch();
    }
  }, [qrData]);

  // 카메라 촬영
  useEffect(() => {
    if (videoStream) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const canvasContext = canvas.getContext("2d");

      const scan = () => {
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;

        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          canvas.width = videoWidth;
          canvas.height = videoHeight;
          canvasContext.clearRect(0, 0, canvas.width, canvas.height);
          canvasContext.drawImage(video, 0, 0, videoWidth, videoHeight);
          const imageData = canvasContext.getImageData(0, 0, videoWidth, videoHeight);

          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) {
            setQrData(code.data);
          }
        }
        requestAnimationFrame(scan);
      };
      requestAnimationFrame(scan);
    }
  }, [permissionGranted, videoStream]);

  // 위도 경도 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.error("브라우저가 Geolocation API를 지원하지 않습니다. ");
    }
  }, []);

  console.log(userLocation);

  return (
    <div className={styles.qrScannerContainer}>
      <h1 className={styles.qrScannerTitle}>
        독립서점에 있는
        <br />
        <span className={styles.titleColor}>QR코드</span>를 촬영해주세요
      </h1>
      <div className={styles.qrScreen}>
        <div className={styles.qrScannerVideoWrapper}>
          <img className={styles.qrImg} src={qrplus} />
          <video className={styles.qrScannerVideo} id="videoElement" ref={videoRef} autoPlay={true} playsInline></video>
          <canvas className={styles.qrScannerCanvas} id="canvasElement" ref={canvasRef}></canvas>
        </div>
      </div>
    </div>
  );
}

export default Qr;
