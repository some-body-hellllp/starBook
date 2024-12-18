import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import styles from "./Qr.module.css"; // CSS 모듈 import
import qrplus from "../../assets/img/qr/qrplus.svg";

function Qr() {
  const [userLocation, setUserLocation] = useState({});
  const [videoStream, setVideoStream] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(null);
  const [qrData, setQrData] = useState(null);

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
      alert(`스탬프 적립 성공!`);
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
