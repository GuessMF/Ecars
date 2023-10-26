import React, {useState, useEffect} from "react";
import style from "./__sorted.module.scss";
import SelectedFilter from "../../ui/SelectedFilter/SelectedFilter";
import ResetAll from "../../ui/ResetAll/ResetAll";
import {Console} from "console";

interface FiltersProps {
  isFiltersOpen: boolean;
  setIsFiltersOpen: (isFiltersOpen: boolean) => void;
  founted: number;
  brand: string;
  model: string;
  type: {[key: string]: boolean};
  clearFilterArg: () => void;
}

export default function Sorted({
  isFiltersOpen,
  setIsFiltersOpen,
  founted,
  brand,
  model,
  type,
  clearFilterArg,
}: FiltersProps) {
  const openFilters = () => {
    setIsFiltersOpen(true);
  };
  const typeArr: string[] = [];
  Object.keys(type).forEach((key) => {
    if (type[key]) {
      typeArr.push(key);
    }
  });
  // console.log(typeArr);
  return (
    <div className={style.sorted}>
      <div className={style.sorted__top}>
        <div className={style.total__found}>
          <span>{founted}</span>
          <p>found</p>
        </div>
        <div className={style.sortBy}>
          <p>Sort by:</p>
          <span>Newly added</span>
        </div>
      </div>

      <button className={style.filters__btn} onClick={openFilters}>
        <div>
          <svg
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.33333 10H9.66667V8.33333H6.33333V10ZM0.5 0V1.66667H15.5V0H0.5ZM3 5.83333H13V4.16667H3V5.83333Z"
              fill="#1A1A1A"
            />
          </svg>
        </div>
        <span>Filters</span>
      </button>
      <div className={style.sorted__bottom}>
        {brand && <SelectedFilter params={brand} />}
        {model && <SelectedFilter params={model} />}
        {typeArr &&
          typeArr.map((type, index) => <SelectedFilter params={type} />)}
        {Object.values({brand, model, ...typeArr}).filter(Boolean).length >=
          2 && <ResetAll onClick={clearFilterArg} />}
      </div>
    </div>
  );
}
