import React from "react";
import style from "./__allCars.module.scss";
import {ReactComponent as AllCarsIcon} from "./allCarsIcon.svg";

export default function AllCars() {
  return (
    <div className={style.allCars}>
      See all cars
      <AllCarsIcon />
    </div>
  );
}
