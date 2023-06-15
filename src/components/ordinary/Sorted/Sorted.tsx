import React from "react";
import style from "./__sorted.module.scss";
import SelectedFilter from "../../ui/SelectedFilter/SelectedFilter";
import ResetAll from "../../ui/ResetAll/ResetAll";

export default function Sorted() {
  return (
    <div className={style.sorted}>
      <div className={style.sorted__top}>
        <div className={style.total__found}>
          <span>2743</span>
          <p>found</p>
        </div>
        <div className={style.sortBy}>
          <p>Sort by:</p>
          <span>Newly added</span>
        </div>
      </div>
      <div className={style.sorted__bottom}>
        <SelectedFilter />
        <SelectedFilter />
        <SelectedFilter />
        <SelectedFilter />
        <SelectedFilter />
        <SelectedFilter />
        <SelectedFilter />
        <SelectedFilter />
        <SelectedFilter />
        <SelectedFilter />
        <SelectedFilter />

        <ResetAll />
      </div>
    </div>
  );
}
