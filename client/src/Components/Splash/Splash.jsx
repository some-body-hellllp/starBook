import { useEffect } from "react";
import styles from "./Splash.module.css";
import logo from "../../assets/img/splash/logo.svg";
import star1 from "../../assets/img/splash/star1.svg";
import star2 from "../../assets/img/splash/star2.svg";
import { gsap } from "gsap";

export default function Splash() {
  useEffect(() => {
    // 문구 애니메이션: 서서히 나타나게
    gsap.to(`.${styles.splash_text}`, {
      opacity: 1,
      duration: 3,
      ease: "power3.out",
    });

    // 로고 애니메이션: 서서히 나타나게
    gsap.to(`.${styles.logo}`, {
      opacity: 1,
      duration: 1.5,
      delay: 0.5, // 문구가 나타난 후 0.5초 뒤에 로고 등장
      ease: "power3.out",
    });

    // 별 애니메이션: 각 별이 차례로 반짝이는 효과
    gsap.fromTo(
      `.${styles.star1}`,
      {
        opacity: 1, // 처음부터 보이도록
        scale: 1,
      },
      {
        opacity: 1,
        scale: 1.2, // 반짝이는 효과
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1, // 첫 번째 별이 나타난 후 일정 시간 뒤에 시작
      }
    );

    gsap.fromTo(
      `.${styles.star2}`,
      {
        opacity: 1, // 처음부터 보이도록
        scale: 1,
      },
      {
        opacity: 1,
        scale: 1.2, // 반짝이는 효과
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1.5, // 두 번째 별은 첫 번째 별보다 약간 늦게 시작
      }
    );

    gsap.fromTo(
      `.${styles.star3}`,
      {
        opacity: 1, // 처음부터 보이도록
        scale: 1,
      },
      {
        opacity: 1,
        scale: 1.2, // 반짝이는 효과
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 2, // 세 번째 별은 두 번째 별보다 늦게 시작
      }
    );
  }, []); // 빈 배열을 사용하여 컴포넌트가 렌더링될 때 한 번만 실행

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

      {/* 별 */}
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
