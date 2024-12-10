import profile from "../../../assets/img/Bookmark/profile.png";
// 스타일
import styles from "./UserProfile.module.css";
export default function UserProfile() {
  return (
    <>
      <aside className={styles.profile}>
        <img src={profile} alt="profile" />
      </aside>
    </>
  );
}
