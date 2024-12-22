import profile from "../../../assets/img/Bookmark/profile.png";
// 스타일
import styles from "./UserProfile.module.css";
export default function UserProfile({ post }) {
  const img = post || profile;
  return (
    <>
      <aside className={styles.profile}>
        <img src={img} alt="profile" />
      </aside>
    </>
  );
}
