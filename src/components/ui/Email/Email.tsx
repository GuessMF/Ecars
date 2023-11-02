import React from "react";
import style from "./__email.module.scss";

interface Props {
  color: string;
}

export default function Email({color}: Props) {
  return (
    <div className={style.email}>
      <svg
        className={style.email__logo}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.00001 2H14C14.1768 2 14.3464 2.07024 14.4714 2.19526C14.5964 2.32029 14.6667 2.48986 14.6667 2.66667V13.3333C14.6667 13.5101 14.5964 13.6797 14.4714 13.8047C14.3464 13.9298 14.1768 14 14 14H2.00001C1.8232 14 1.65363 13.9298 1.52861 13.8047C1.40358 13.6797 1.33334 13.5101 1.33334 13.3333V2.66667C1.33334 2.48986 1.40358 2.32029 1.52861 2.19526C1.65363 2.07024 1.8232 2 2.00001 2ZM8.04001 7.78867L3.76534 4.15867L2.90201 5.17467L8.04868 9.54467L13.1027 5.17133L12.2307 4.16267L8.04068 7.78867H8.04001Z"
          fill={color}
        />
      </svg>
      <span className={style.email__data} style={{color: color}}>
        segas95@yandex.ru
      </span>
    </div>
  );
}
