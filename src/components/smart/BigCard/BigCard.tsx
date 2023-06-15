import React from "react";
import style from "./__bigCard.module.scss";
import Details from "../../ui/Details/Details";

export default function BigCard() {
  return (
    <div className={style.bigCard}>
      <div className={style.bigCard__image}>
        <div className={style.image__badge}>Premium</div>
      </div>
      <div className={style.bigCard__information}>
        <div className={style.information__top}>
          <div className={style.information__name}>
            Toyota Land Cruiser 300 VXR+ V6 3.3L Diesel Twin Turbo AT
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
          <span>$45,995</span>
          <Details />
        </div>
      </div>
    </div>
  );
}
