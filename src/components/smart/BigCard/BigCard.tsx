import React from "react";
import style from "./__bigCard.module.scss";
import Details from "../../ui/Details/Details";

interface Props {
  brand: string;
  model: string;
  price: string;
  imageURL: string;
}

export default function BigCard({brand, model, price, imageURL}: Props) {
  return (
    <div className={style.bigCard}>
      <div
        className={style.bigCard__image}
        // style={{ background: "black" }}
        style={{
          backgroundImage: "url(" + imageURL + ")",
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
  );
}
