import React from "react";
import style from "./__resetAll.module.scss";
interface ResetProps {
  onClick: () => void;
}
export default function ResetAll({onClick}: ResetProps) {
  return (
    <div className={style.resetAll} onClick={onClick}>
      Reset all
    </div>
  );
}
