import React, {useState, useEffect, useRef} from "react";
import style from "./__sorted.module.scss";
import SelectedFilter from "../../ui/SelectedFilter/SelectedFilter";
import ResetAll from "../../ui/ResetAll/ResetAll";
import {Console} from "console";

interface FiltersProps {
  sortType: string;
  onChangeSort: (name: string) => void;
  isFiltersOpen: boolean;
  setIsFiltersOpen: (isFiltersOpen: boolean) => void;
  founted: number;
  brand: string;
  model: string;
  mileage: boolean;
  date: boolean;
  price: boolean;

  type: {[key: string]: boolean};
  clearFilterArg: () => void;
  closeSelectedFilter: (filter: string) => void;
}

export default function Sorted({
  sortType,
  onChangeSort,
  isFiltersOpen,
  setIsFiltersOpen,
  founted,
  brand,
  model,
  mileage,
  date,
  price,
  type,

  clearFilterArg,
  closeSelectedFilter,
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

  interface SortOption {
    name: string;
    sortProperty: string;
  }

  const sorts: SortOption[] = [
    {name: "Expensive", sortProperty: "price"},
    {name: "Cheaper", sortProperty: "price"},
    {name: "Older", sortProperty: "value"},
    {name: "Newer", sortProperty: "value"},
    {name: "By date before", sortProperty: "date"},
    {name: "By date later", sortProperty: "date"},
  ];
  const [selectedSort, setSelectedSort] = useState<number>(0);

  const onClickSortBy = (name: string) => {
    // setSelectedSort(index);
    onChangeSort(name);
    console.log(selectedSort);
  };

  console.log(sorts);
  // className={`${style.sortBy__item} ${
  //   index.toString === sortType ? style.selected : "ssss"
  // }`}
  return (
    <div className={style.sorted}>
      <div className={style.sorted__top}>
        <div className={style.total__found}>
          <span>{founted}</span>
          <p>found</p>
        </div>
        <div className={style.sortBy}>
          <p>Sort by:</p>
          {sorts.map((obj, i) => {
            return (
              <span key={i} onClick={() => onClickSortBy(obj.sortProperty)}>
                {obj.name}
              </span>
            );
          })}
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
        {brand && (
          <SelectedFilter
            onClick={() => closeSelectedFilter("brand")}
            params={brand}
          />
        )}
        {model && (
          <SelectedFilter
            onClick={() => closeSelectedFilter("model")}
            params={model}
          />
        )}
        {!mileage && (
          <SelectedFilter
            onClick={() => closeSelectedFilter("mileage")}
            params={"mileage"}
          />
        )}
        {date && (
          <SelectedFilter
            onClick={() => closeSelectedFilter("year")}
            params={"year"}
          />
        )}
        {price && (
          <SelectedFilter
            onClick={() => closeSelectedFilter("price")}
            params={"price"}
          />
        )}
        {typeArr &&
          typeArr.map((type, index) => (
            <SelectedFilter
              onClick={() => closeSelectedFilter(type)}
              params={type}
            />
          ))}
        {Object.values({brand, model, ...typeArr}).filter(Boolean).length >=
          2 && <ResetAll onClick={clearFilterArg} />}
      </div>
    </div>
  );
}
