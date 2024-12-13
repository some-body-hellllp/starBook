import React from "react";
import styles from "./LocationModal.module.css"; // CSS 모듈 import

export default function LocationModal({ title, adress, number }) {
  return (
    <div className={styles.LocationModalBox}>
      <div className={styles.LocationModalImg}>이미지</div>
      <div className={styles.LocationModalText}>
        <div className={styles.LocationModalTitle}>{title}</div>
        <div className={styles.LocationModalAdress}>{adress}</div>
        <div className={styles.LocationModalNumber}>{number}</div>
      </div>
    </div>
  );
}
