import React from "react";

import styles from "./AccountTitle.module.css";

export default function AccountTitle({ nickName = "코딩몬스터", stamp = "0" }) {
  return (
    <div className={styles.account_title}>
      <div>
        <span>{nickName}</span>님
      </div>
      <div>스탬프 {stamp}개</div>
    </div>
  );
}
