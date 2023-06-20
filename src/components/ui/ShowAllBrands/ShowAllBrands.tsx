import React from "react";
import style from "./__showAllBrands.module.scss";
import {ReactComponent as DownArrow} from "./downArrowIcon.svg";
import {ReactComponent as UpArrow} from "./upArrow.svg";

interface Props {
  onclick: () => void;
  visible: boolean;
}
export default function ShowAllBrands({onclick, visible}: Props) {
  return (
    <div className={style.showAllBrands} onClick={onclick}>
      {visible ? <span>Less brands</span> : <span>Show all brands</span>}
      {visible ? <UpArrow /> : <DownArrow />}
    </div>
  );
}
