import axios from "axios";
import { useEffect, useContext } from "react";
import { PageData } from "../../provider/PageProvider";
import styles from "./Splash.module.css";
import logo from "../../assets/img/splash/logo.svg";
import star1 from "../../assets/img/splash/star1.svg";
import star2 from "../../assets/img/splash/star2.svg";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const { setUserData } = useContext(PageData);
  const navigate = useNavigate();
  const postUrl = import.meta.env.VITE_API_URL;
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    // 별들의 초기 상태를 완전히 숨김
    gsap.set([`.${styles.star1}`, `.${styles.star2}`, `.${styles.star3}`], {
      opacity: 0,
      scale: 0,
    });

    // 문구 애니메이션
    gsap.to(`.${styles.splash_text}`, {
      opacity: 1,
      duration: 2,
      ease: "power3.out",
    });

    // 로고 애니메이션
    gsap.to(`.${styles.logo}`, {
      opacity: 1,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
      onComplete: () => {
        // 로고 애니메이션 완료 후 별들 빠르게 순차적으로 나타나기
        const starTimeline = gsap.timeline();
        starTimeline
          .to(`.${styles.star1}`, {
            opacity: 1,
            scale: 1,
            duration: 0, // 빠르게 나타나게 설정
          })
          .to(`.${styles.star2}`, {
            opacity: 1,
            scale: 1,
            duration: 0.1,
          })
          .to(`.${styles.star3}`, {
            opacity: 1,
            scale: 1,
            duration: 0.2,
          })
          .then(() => {
            // 각 별마다 더 자연스러운 반짝임 효과
            [`.${styles.star1}`, `.${styles.star2}`, `.${styles.star3}`].forEach((starClass, index) => {
              gsap
                .timeline({
                  repeat: -1,
                  delay: index * 0.4, // 각 별에 조금씩 지연을 추가
                })
                .to(starClass, {
                  scale: 1.05, // 크기 변화 범위 줄임
                  opacity: 1, // 선명해짐
                  duration: 0.5,
                  ease: "power1.inOut",
                })
                .to(starClass, {
                  scale: 0.95, // 작아짐 범위 줄임
                  opacity: 0.5, // 흐려짐
                  duration: 0.3,
                  ease: "power1.inOut",
                })
                .to(starClass, {
                  scale: 1, // 원래 크기로 돌아옴
                  opacity: 1, // 다시 선명해짐
                  duration: 0.5,
                  ease: "elastic.out(1, 0.3)",
                });
            });
          })
          .then(fetchData); // 모든 애니메이션 완료 후 fetchData 호출
      },
    });

    const fetchData = async () => {
      try {
        const response = await axios.post(`${postUrl}/auth/login`, {
          token: token,
        });
        console.log(response); // 성공 시 응답 로그
        const userId = response.data.data.user.user_id;
        const profile = response.data.data.user.user_profile;
        const name = response.data.data.user.user_name;
        const stamp = response.data.data.stamps;
        console.log(profile);
        console.log(stamp);
        console.log(stamp.length);
        setUserData({
          userId: userId, // 유저 아이디
          profile: profile, // 유저 프로필 사진
          nickName: name, // 유저 닉네임
          stamp: stamp, // 스탬프 현황
          stampCount: stamp.length, // 누적 스탬프 갯수
          isLogin: true, // 로그인 확인
        });
        setTimeout(() => {
          navigate("/home"); // 로그인 후 홈으로 이동
        }, 1700);
      } catch (error) {
        console.log(error); // 실패 시 에러 로그
        setTimeout(() => {
          navigate("/home"); // 로그인 후 홈으로 이동
        }, 1700);
      }
    };
  }, []);

  return (
    <div className={styles.splash_container}>
      <div className={styles.logo_warp}>
        <div className={styles.splash_text}>
          당신에게 드리는 특<span>별</span>한 이야기
        </div>

        <div className={styles.logo}>
          <img src={logo} alt="Logo" />
        </div>
      </div>

      {/* 별들 */}
      <div className={styles.star1}>
        <img src={star1} alt="Star" />
      </div>
      <div className={styles.star2}>
        <img src={star1} alt="Star" />
      </div>
      <div className={styles.star3}>
        <img src={star2} alt="Star" />
      </div>
    </div>
  );
}
