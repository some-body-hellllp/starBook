import styles from "./Banner.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import banner1 from "../../../../assets/img/Main/banner1.svg";
import banner2 from "../../../../assets/img/Main/banner2.svg";
import banner3 from "../../../../assets/img/Main/banner3.svg";

export default function Banner() {
  return (
    <div className={styles.banner}>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        <SwiperSlide>
          <img src={banner1} alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner2} alt="Slide 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner3} alt="Slide 3" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
