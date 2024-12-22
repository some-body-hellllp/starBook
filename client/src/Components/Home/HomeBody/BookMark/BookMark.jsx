import styles from "./BookMark.module.css";
import Card from "./Card/Card";

import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BookMark() {
  const [posts, setPosts] = useState([]);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const postUrl = import.meta.env.VITE_API_URL;
  const loadPosts = async () => {
    try {
      // 첫 번째 요청에서는 5개, 이후 요청에서는 3개씩 불러옴
      const limit = 2;
      const response = await axios.get(`${postUrl}/bookmark`, {
        params: {
          limit: limit, // 첫 번째 요청은 5개, 그 이후 요청은 3개
          offset: 0, // 이전에 불러온 데이터 개수를 기준으로
        },
      });

      const newData = response.data.data; // 서버 응답 구조에 맞춤
      console.log("새로운 게시글", newData); // 서버에서 받아온 데이터

      setPosts(newData);
    } catch (error) {
      console.error("게시글을 불러오는 데 실패했습니다.", error);
    } finally {
    }
  };
  useEffect(() => {
    loadPosts();
  }, []);
  return (
    <div className={styles.bookMark}>
      <Swiper
        spaceBetween={10} // 슬라이드 간의 간격
        slidesPerView={2.1} // 한 번에 보이는 슬라이드 개수
        pagination={{ clickable: true }} // 페이지네이션 클릭 가능
        style={{
          padding: "0 60px 0 0", // 우측 여백 추가
          // overflow: "visible", // 중요: overflow를 visible로 설정
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
        {posts.map((post, index) => (
          <SwiperSlide key={index}>
            <Card post={post} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
