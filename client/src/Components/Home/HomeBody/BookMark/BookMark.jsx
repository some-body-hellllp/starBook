import styles from "./BookMark.module.css";
import Card from "./Card/Card";

import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function BookMark() {
  const navigate = useNavigate();
  return (
    <div className={styles.bookMark}>
      <Swiper
        spaceBetween={10} // 슬라이드 간의 간격
        slidesPerView={2.1} // 한 번에 보이는 슬라이드 개수
        pagination={{ clickable: true }} // 페이지네이션 클릭 가능
        style={{
          padding: "0 60px 0 0", // 우측 여백 추가
          overflow: "visible", // 중요: overflow를 visible로 설정
        }}
      >
        <SwiperSlide className={styles.firstSlide}>
          <div className={styles.bookMark_Btn}>
            <div className={styles.bookMark_text}>
              <div className={styles.bookMark_title}>책갈피</div>
              <div className={styles.bookMark_sub1}>
                책과 사람들의
                <br />
                이야기를 담은 공간
              </div>
              <div onClick={() => navigate("/bookmark")} className={styles.bookMark_sub2}>
                보러가기
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide className={styles.lastSlide}>
          <Card />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
