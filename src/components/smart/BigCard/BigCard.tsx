import React from "react";
import style from "./__bigCard.module.scss";
import Details from "../../ui/Details/Details";
import {NavLink} from "react-router-dom";

interface Props {
  index: number;
  brand: string;
  model: string;
  price: string;
  previewIMG: string;
}

export default function BigCard({
  index,
  brand,
  model,
  price,
  previewIMG,
}: Props) {
  return (
    <NavLink to={`/details/${index}`}>
      <div className={style.bigCard}>
        <div
          className={style.bigCard__image}
          // style={{ background: "black" }}
          style={{
            backgroundImage: "url(" + previewIMG + ")",
          }}
        >
          <div className={style.image__badge}>Premium</div>
        </div>
        <div className={style.bigCard__information}>
          <div className={style.information__top}>
            <div className={style.information__name}>
              <span> {brand}</span>
              <span> {model}</span>
            </div>
            <div className={style.information__state}>
              Milwaukee • NEW • 0 km • Gasoline
            </div>
            <div className={style.information__description}>
              2022 Land Cruiser, panoramic roof, black interior, LED headlights
              and automatic gearbox. A brand new car with GCC specifications.
            </div>
          </div>

          <div className={style.information__bottom}>
            <span>${price}</span>
            <Details />
          </div>
        </div>
      </div>
    </NavLink>
  );
}
