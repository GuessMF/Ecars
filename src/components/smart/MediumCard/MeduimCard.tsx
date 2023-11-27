import React from "react";
import style from "./__mediumCard.module.scss";
import ddd from "./1200x900n.webp";
type Props = {
  image: string;
  brand: string;
  model: string;
  mileage: string;
  fuel: string;
  price: string;
};
export default function MeduimCard({
  image,
  brand,
  model,
  mileage,
  fuel,
  price,
}: Props) {
  return (
    <div className={style.mediumCard}>
      <img src={image} alt="img" />
      <div className={style.information}>
        <span>{brand}</span>
        <span>{model}</span>
        <span>{mileage}</span>
        <span>used</span>
        <span>{fuel}</span>
        <span>{price}</span>
      </div>
    </div>
  );
}
