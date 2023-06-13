import React from "react";
import style from "./__brandCard.module.scss";
import ford from "../../../assets/icons/brands/fordIcon.webp";

export default function BrandCard() {
  return (
    <div className={style.brandCard}>
      <div className={style.brandCard_content}>
        <img
          src={ford}
          alt="img"
          // style={{width: "80px", height: "80px"}}
        />
        <span>Ford</span>
      </div>
    </div>
  );
}
