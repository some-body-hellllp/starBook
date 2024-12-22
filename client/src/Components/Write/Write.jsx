import { useContext, useState } from "react";
import Header from "../Header/Header";
import styles from "./Write.module.css";
import { PageData } from "../../provider/PageProvider";
import axios from "axios";
import camera from "../../assets/img/Bookmark/picture.png";

export default function Write() {
  const postUrl = import.meta.env.VITE_API_URL;
  const { userData } = useContext(PageData);
  // console.log(userData);
  const [formData, setFormData] = useState({
    id: userData.userId, // 유저 아이디
    title: "", // 태그 (독립서점 이름)
    content: "", // 내용
    name: userData.nickName, // 유저 닉네임
    user_profile: userData.profile,
  });

  // Form 데이터 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 데이터 제출 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // preventDefault로 수정
    if (!formData.title || !formData.content) {
      alert("태그와 내용을 모두 작성해주세요!");
      return;
    }

    try {
      const response = await axios.post(`${postUrl}/bookmark`, formData);

      alert("게시글이 성공적으로 등록되었습니다!");
      console.log("응답 데이터:", response.data);
      // 필요 시 리다이렉트 또는 초기화
      setFormData({ ...formData, title: "", content: "" });
    } catch (error) {
      console.error("게시글 등록 오류:", error);
      alert("게시글 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <Header
        showBackButton={true}
        backButtonColor="#FFFFFF"
        showSubmitButton={true}
        buttonText={"등록"}
        color="#FFFFFF"
        submitFunction={(e) => handleSubmit(e)} // Header에서 제출 버튼 클릭 시 호출
      />
      <section className={styles.Write}>
        <form className={styles.Write_form} onSubmit={(e) => handleSubmit(e)}>
          {/* 태그 입력 */}
          <div className={styles.tag}>
            <div className={styles.tag_sign}>@</div>
            <input
              type="text"
              name="title"
              placeholder="독립서점의 이름을 적어주세요"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          {/* 내용 입력 */}
          <div className={styles.text}>
            <textarea
              name="content"
              placeholder="내용을 적어주세요"
              value={formData.content}
              onChange={handleChange}
              autoFocus
            />
          </div>

          {/* 사진 등록 */}
          <div className={styles.photo}>
            <div className={styles.photo_upload}>
              <img src={camera} alt="사진 업로드" />
            </div>
            <div className={styles.photo_uploaded}></div>
          </div>
        </form>
      </section>
    </>
  );
}
