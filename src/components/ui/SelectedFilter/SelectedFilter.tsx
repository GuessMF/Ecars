import React, {MutableRefObject, RefObject} from "react";
import style from "./__selectedFilter.module.scss";
import {ReactComponent as Close} from "./close.svg";
// import Bwm_logo from "../../assets/images/Brands/bmw_logo.png";
import lloog from "../../../assets/icons/close.svg";
interface FiltersProps {
  params: string;
  onClick: (filterName: string) => void;
}
// function onClick() {
//   console.log(close);
// }

export default function SelectedFilter({params, onClick}: FiltersProps) {
  // console.log(params);
  return (
    <div className={style.selectedFilter}>
      <span>{params.charAt(0).toLocaleUpperCase() + params.slice(1)}</span>
      <button onClick={() => onClick(params)}>
        <Close />
      </button>
    </div>
  );
}
