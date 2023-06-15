import React from "react";
import style from "./__selectedFilter.module.scss";
import {ReactComponent as Close} from "./close.svg";

export default function SelectedFilter() {
  return (
    <div className={style.selectedFilter}>
      <span>Toyota</span>
      <Close />
    </div>
  );
}
