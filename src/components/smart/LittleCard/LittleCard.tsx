import React from "react";
import style from "./__littleCard.module.scss";
import Details from "../../ui/Details/Details";
import img from "../../../assets/images/LittleCard/2021_Genesis_GV80_2.5T.webp";
import Like from "../../ui/Like/Like";

export default function LittleCard() {
  return (
    <div className={style.littleCard}>
      <div
        className={style.littleCard__previewImg}
        style={{backgroundImage: `url(${img})`}}
      >
        <Like />
      </div>
      <div className={style.littleCard__content}>
        <div className={style.littleCard__top}>
          <span className={style.littleCard__name}>2021 Genesis GV80 2.5T</span>
          <span className={style.littleCard__state}>
            <li>Used</li>
            <li>•</li>
            <li>27.057 mi</li>
            <li>•</li>
            <li>Petrol</li>
          </span>
        </div>

        <div className={style.littleCard__bottom}>
          <div className={style.littleCard__prices}>
            <span className={style.littleCard__newPrice}>$45,995</span>
            <span className={style.littleCard__oldPrice}>$51,490</span>
          </div>
          <Details />
        </div>
      </div>
    </div>
  );
}
