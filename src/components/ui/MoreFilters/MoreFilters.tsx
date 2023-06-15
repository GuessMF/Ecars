import React from "react";
import style from "./__moreFilters.module.scss";
import {ReactComponent as DownArrow} from "./downArrow.svg";

export default function MoreFilters() {
  return (
    <div className={style.moreFilters}>
      <span>More filters </span>
      <DownArrow />
    </div>
  );
}
