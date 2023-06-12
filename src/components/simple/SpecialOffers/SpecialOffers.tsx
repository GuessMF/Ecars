import React from "react";
import LittleCard from "../../smart/LittleCard/LittleCard";
import style, {specialOffers} from "./__specialOffers.module.scss";

export default function SpecialOffers() {
  return (
    <div className={style.specialOffers}>
      <div className={style.specialOffers__content}>
        <div className={style.specialOffers__header}>
          <h2>Special offers</h2>
          <div className={style.specialOffers__navigation}>
            <span>left</span>
            <span>right</span>
            <span>see all</span>
          </div>
        </div>
        <div className={style.specialOffers__corousel}>
          <LittleCard />
        </div>
      </div>
    </div>
  );
}
