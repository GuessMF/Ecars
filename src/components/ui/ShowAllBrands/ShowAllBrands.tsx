import React from "react";
import style from "./__showAllBrands.module.scss";
import {ReactComponent as DownArrow} from "./downArrowIcon.svg";

export default function ShowAllBrands() {
  return (
    <div className={style.showAllBrands}>
      Show all brands
      <DownArrow />
    </div>
  );
}
