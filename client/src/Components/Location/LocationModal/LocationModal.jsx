import React from "react";
import styles from "./LocationModal.module.css";

export default function LocationModal({ title, adress, number, img, isCurrentLocation }) {
  if (isCurrentLocation) {
    return (
      <div className={styles.currentLocationBox}>
        <div className={styles.currentLocationText}>
          <div className={styles.currentLocationTitle}>{title}</div>
          <div className={styles.currentLocationAdress}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.LocationModalBox}>
      <div className={styles.LocationModalImg}>
        <img src={img} alt="이미지" />
      </div>
      <div className={styles.LocationModalText}>
        <div className={styles.LocationModalTitle}>{title}</div>
        <div className={styles.LocationModalAdress}>{adress}</div>
        <div className={styles.LocationModalNumber}>{number}</div>
      </div>
    </div>
  );
}
