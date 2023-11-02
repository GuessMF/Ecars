import React, {useState, useEffect, useRef} from "react";
import style from "./__sorted.module.scss";
import SelectedFilter from "../../ui/SelectedFilter/SelectedFilter";
import ResetAll from "../../ui/ResetAll/ResetAll";

interface SortType {
  name: string;
  sortProperty: string;
}

interface FiltersProps {
  sortType: {name: string; sortProperty: string};
  onChangeSort: (obj: SortType) => void;
  isFiltersOpen: boolean;
  setIsFiltersOpen: (isFiltersOpen: boolean) => void;
  founted: number;
  brand: string;
  model: string;
  mileage: boolean;
  date: boolean;
  price: boolean;

  type: {[key: string]: boolean};
  cities: {[key: string]: boolean};
  owners: {[key: string]: boolean};
  color: {[key: string]: boolean};
  seats: {[key: string]: boolean};
  fuel: {[key: string]: boolean};
  transmission: {[key: string]: boolean};
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
  cities,
  owners,
  color,
  seats,
  fuel,
  transmission,

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

  const citiesArr: string[] = [];
  Object.keys(cities).forEach((key) => {
    if (cities[key]) {
      citiesArr.push(key);
    }
  });

  const ownersArr: string[] = [];
  Object.keys(owners).forEach((key) => {
    if (owners[key]) {
      ownersArr.push(key);
    }
  });

  const colorArr: string[] = [];
  Object.keys(color).forEach((key) => {
    if (color[key]) {
      colorArr.push(key);
    }
  });

  const seatsArr: string[] = [];
  Object.keys(seats).forEach((key) => {
    if (seats[key]) {
      seatsArr.push(key);
    }
  });

  const fuelArr: string[] = [];
  Object.keys(fuel).forEach((key) => {
    if (fuel[key]) {
      fuelArr.push(key);
    }
  });

  const transmissionArr: string[] = [];
  Object.keys(transmission).forEach((key) => {
    if (transmission[key]) {
      transmissionArr.push(key);
    }
  });

  interface SortOption {
    name: string;
    sortProperty: string;
  }

  const sorts: SortOption[] = [
    {name: "Expensive", sortProperty: "price&order=desc"},
    {name: "Cheaper", sortProperty: "price"},
    {name: "Older", sortProperty: "year"},
    {name: "Newer", sortProperty: "year&order=desc"},
    {name: "By date before", sortProperty: "dateAdded&order=desc"},
    {name: "By date later", sortProperty: "dateAdded"},
  ];
  const [selectedSort, setSelectedSort] = useState<string>("By date later");

  const onClickSortBy = (sortOption: SortOption) => {
    onChangeSort(sortOption);
    setSelectedSort(sortOption.name);
  };

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
              <span
                key={i}
                className={`${style.sortBy__item} ${
                  obj.name === selectedSort ? style.selected : ""
                }`}
                onClick={() => onClickSortBy(obj)}
              >
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
        {citiesArr &&
          citiesArr.map((city, index) => (
            <SelectedFilter
              onClick={() => closeSelectedFilter(city)}
              params={
                city === "SaintPetersburg"
                  ? "Saint-Petersburg"
                  : city === "AbuDhabi"
                  ? "Abu Dhabi"
                  : city
              }
            />
          ))}

        {ownersArr &&
          ownersArr.map((owners, index) => (
            <SelectedFilter
              onClick={() => closeSelectedFilter(owners)}
              params={owners}
            />
          ))}

        {colorArr &&
          colorArr.map((color, index) => (
            <SelectedFilter
              onClick={() => closeSelectedFilter(color)}
              params={color}
            />
          ))}

        {seatsArr &&
          seatsArr.map((seats, index) => (
            <SelectedFilter
              onClick={() => closeSelectedFilter(seats)}
              params={seats}
            />
          ))}

        {fuelArr &&
          fuelArr.map((fuel, index) => (
            <SelectedFilter
              onClick={() => closeSelectedFilter(fuel)}
              params={fuel}
            />
          ))}
        {transmissionArr &&
          transmissionArr.map((transmisision, index) => (
            <SelectedFilter
              onClick={() => closeSelectedFilter(transmisision)}
              params={transmisision}
            />
          ))}

        {Object.values({
          brand,
          model,
          mileage,
          date,
          price,
          ...typeArr,
          ...citiesArr,
          ...ownersArr,
          ...colorArr,
          ...seatsArr,
          ...fuelArr,
          ...transmissionArr,
        }).filter(Boolean).length >= 3 && <ResetAll onClick={clearFilterArg} />}
      </div>
    </div>
  );
}
