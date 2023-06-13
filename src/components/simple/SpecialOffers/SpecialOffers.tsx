import React from "react";
import LittleCard from "../../smart/LittleCard/LittleCard";
import style, {specialOffers} from "./__specialOffers.module.scss";
import {ReactComponent as LeftArrow} from "../../../assets/icons/specialOffers/leftArrow.svg";
import {ReactComponent as RightArrow} from "../../../assets/icons/specialOffers/rightArrow.svg";
import AllCars from "../../ui/AllCars/AllCars";

export default function SpecialOffers() {
  return (
    <div className={style.specialOffers}>
      <div className={style.specialOffers__content}>
        <div className={style.specialOffers__header}>
          <h2>Special offers</h2>
          <div className={style.specialOffers__navigation}>
            <LeftArrow />
            <RightArrow />
            <AllCars />
            {/* <span>see all</span> */}
          </div>
        </div>
        <div className={style.specialOffers__corousel}>
          <LittleCard />
          <LittleCard />
          <LittleCard />
          <LittleCard />
          {/* <LittleCard /> */}
        </div>
      </div>
    </div>
  );
}
