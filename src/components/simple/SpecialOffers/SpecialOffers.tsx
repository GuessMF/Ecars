import React from "react";
import LittleCard from "../../smart/LittleCard/LittleCard";
import style, {specialOffers} from "./__specialOffers.module.scss";
import {ReactComponent as LeftArrow} from "../../../assets/icons/specialOffers/leftArrow.svg";
import {ReactComponent as RightArrow} from "../../../assets/icons/specialOffers/rightArrow.svg";
import {NavLink} from "react-router-dom";
import AllCars from "../../ui/AllCars/AllCars";
import {cars} from "../../../helpers/carList";

export default function SpecialOffers() {
  return (
    <div className={style.specialOffers}>
      <div className={style.specialOffers__content}>
        <div className={style.specialOffers__header}>
          <h2>Special offers</h2>
          <div className={style.specialOffers__navigation}>
            <LeftArrow />
            <RightArrow />
            <NavLink to="/catalog">
              <AllCars />
            </NavLink>

            {/* <span>see all</span> */}
          </div>
        </div>
        <div className={style.specialOffers__corousel}>
          {cars.map((car, index) => {
            return car.special ? (
              <LittleCard
                brand={car.brand}
                model={car.model}
                price={car.price}
                //special={car.special}
                imageURL={car.imageURL}
              />
            ) : null;
          })}
          {/* <LittleCard /> */}
        </div>
      </div>
    </div>
  );
}
