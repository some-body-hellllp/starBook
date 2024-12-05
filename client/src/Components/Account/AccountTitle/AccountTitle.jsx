import React from "react";

export default function AccountTitle({ classValue, level, nickName = "코딩몬스터", stamp = "1" }) {
  return (
    <div className={classValue}>
      <div>
        <img src={level} alt="level" /> <span>{nickName}</span>님
      </div>
      <div>스탬프 {stamp}개</div>
    </div>
  );
}
