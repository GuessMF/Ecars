import React from "react";
import style from "./__details.module.scss";
import {ReactComponent as DetailsArrow} from "./datailsArrowIcon.svg";

export default function Details() {
  return (
    <div className={style.details}>
      Details
      <DetailsArrow />
    </div>
  );
}
