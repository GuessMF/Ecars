import React from "react";
import style from "./__brandCard.module.scss";
import ford from "../../../assets/icons/brands/fordIcon.webp";
import {NavLink} from "react-router-dom";

interface Props {
  brand: string;
  brandIMG: string;
}
export default function BrandCard({brand, brandIMG}: Props) {
  return (
    <div className={style.brandCard}>
      <div className={style.brandCard_content}>
        <img src={brandIMG} alt="img" />
        <span>{brand}</span>
      </div>
    </div>
  );
}
