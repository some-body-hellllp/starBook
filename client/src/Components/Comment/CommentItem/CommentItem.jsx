import styles from "./CommentItem.module.css";
import icon from "../../../assets/img/Bookmark/profile.png";

export default function CommentItem({ comment }) {
  console.log(comment);

  // 시간 포맷 함수는 먼저 선언
  const formatTime = (time) => {
    const postDate = new Date(time);
    const currentDate = new Date();

    // 날짜 차이 계산
    const diffTime = currentDate - postDate; // 밀리초 단위
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // 일 단위로 변환
    const diffMonths = Math.floor(diffDays / 30); // 대략적으로 1개월을 30일로 계산

    if (diffMonths >= 1) {
      return `${diffMonths}달 전`; // 1개월 이상 차이
    } else if (diffDays >= 1) {
      return `${diffDays}일 전`; // 1일 이상 차이
    } else {
      return "오늘"; // 오늘
    }
  };

  // 기본 텍스트 설정
  const defaultText = { icon: icon, name: "독립서점", time: "2일전", content: "매장 분위기가 좋아요" };

  // 실제로 comment가 있으면 그 값을, 없으면 defaultText를 사용
  const text = {
    icon: comment ? comment.user_profile : defaultText.icon,
    name: comment ? comment.user_name : defaultText.name,
    time: comment ? formatTime(comment.create_at) : defaultText.time,
    content: comment ? comment.comment_content : defaultText.content,
  };

  return (
    <article className={styles.comment_content}>
      <aside>
        <img src={icon} alt="프로필 아이콘" />
      </aside>
      <div className={styles.comment_details}>
        <header className={styles.comment_header}>
          <div>{text.name}</div>
          <div>{text.time}</div>
        </header>
        <div className={styles.comment_body}>{text.content}</div>
      </div>
    </article>
  );
}
