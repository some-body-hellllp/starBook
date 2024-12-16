import React from "react";
import styles from "./AccountBtn.module.css"; // CSS 모듈 import

export default function AccountBtn({ children, buttontype = "common", onClick }) {
  return (
    <button
      className={`${styles.account_button} ${buttontype === "logout" ? styles.white_button : styles.blue_button}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
