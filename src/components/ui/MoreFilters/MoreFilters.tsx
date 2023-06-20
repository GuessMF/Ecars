import React from "react";

import style from "./__moreFilters.module.scss";
import {ReactComponent as DownArrow} from "./downArrow.svg";
import {ReactComponent as UpArrow} from "./upArrow.svg";

interface Props {
  onclick: () => void;
  visible: boolean;
}

export default function MoreFilters({onclick, visible}: Props) {
  console.log(visible + "in comp");
  return (
    <div className={style.moreFilters} onClick={onclick}>
      {visible ? <span>Less filters</span> : <span>More filters</span>}

      {visible ? <UpArrow /> : <DownArrow />}
    </div>
  );
}
