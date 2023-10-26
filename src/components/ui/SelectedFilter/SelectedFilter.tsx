import React from "react";
import style from "./__selectedFilter.module.scss";
import {ReactComponent as Close} from "./close.svg";

interface FiltersProps {
  params: string;
}

export default function SelectedFilter({params}: FiltersProps) {
  // console.log(params);
  return (
    <div className={style.selectedFilter}>
      <span>{params.charAt(0).toLocaleUpperCase() + params.slice(1)}</span>

      <Close />
    </div>
  );
}
