import React from "react";
import style from "./__bigCard.module.scss";
import Details from "../../ui/Details/Details";
import {NavLink} from "react-router-dom";

interface Props {
  id: string;
  index: number;
  brand: string;
  model: string;
  price: string;
  fuel: string;
  location: string;
  mileage: number;
  description: string;
  previewIMG: string;
  onLoad: () => void;
}

export default function BigCard({
  id,
  index,
  brand,
  model,
  price,
  fuel,
  location,
  mileage,
  description,
  previewIMG,
  onLoad,
}: Props) {
  // console.log(id + " ID");
  const formattedPrice: string = price
    .toLocaleString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  return (
    <NavLink to={`/details/${id}`}>
      <div className={style.bigCard}>
        <div className={style.bigCard__image}>
          <img className={style.bigCard__img} src={previewIMG} />

          {/* <div className={style.image__badge}>Premium</div> */}
        </div>
        <div className={style.bigCard__information}>
          <div className={style.information__top}>
            <div className={style.information__name}>
              <span>{brand}</span>
              <span>{model}</span>
            </div>
            <div className={style.information__state}>
              {location} • {mileage < 20 ? "Brand NEW" : "Used"} • {mileage} km
              • {fuel}
            </div>
            <div className={style.information__description}>{description}</div>
          </div>

          <div className={style.information__bottom}>
            <span>${formattedPrice}</span>
            <Details />
          </div>
        </div>
      </div>
    </NavLink>
  );
}
