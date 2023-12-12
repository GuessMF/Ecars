import React, {useState, useEffect, useRef} from "react";
import style from "./__sorted.module.scss";
import SelectedFilter from "../../ui/SelectedFilter/SelectedFilter";
import ResetAll from "../../ui/ResetAll/ResetAll";
import Select, {components} from "react-select";
import {setSearchTerm} from "store/slices/searchSlice";
import {useAppDispatch, useAppSelector} from "hooks/redux-hooks";

// import StylesConfig from "react-select";

// interface SortType {
//   value: string;
//   label: string;
//   sortProperty: string;
// }
// interface OptionsSelect {
//   value: string;
//   label: string;
// }

interface FiltersProps {
  searchValue: string;
  onChangeSortBy: (obj: any) => void;
  sortOption: string;
  isFiltersOpen: boolean;
  setIsFiltersOpen: (isFiltersOpen: boolean) => void;
  totalCars: number;
  filtredCars: number;
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
  searchValue,
  onChangeSortBy,
  sortOption,
  setIsFiltersOpen,
  totalCars,
  filtredCars,
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

  const options = [
    {value: "Expensive", sort: "price", desc: true, label: "Expensive"},
    {value: "Cheaper", sort: "price", desc: false, label: "Cheaper"},
    {value: "Older", sort: "year", desc: false, label: "Older"},
    {value: "Newer", sort: "year", desc: true, label: "Newer"},
    {
      value: "By date before",
      sort: "dateAdded",
      desc: true,
      label: "By date before",
    },
    {
      value: "By date later",
      sort: "dateAdded",
      desc: false,
      label: "By date later",
    },
    {
      value: "Mileage few",
      sort: "mileage",
      desc: false,
      label: "Mileage few",
    },
    {
      value: "Mileage more",
      sort: "mileage",
      desc: true,
      label: "Mileage more",
    },
  ];
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);

  // console.log(sortOption);

  const initialOption = options.find((option) => option.value === sortOption);

  const [selectedOption, setSelectedOption] = React.useState(initialOption);
  // console.log(selectedOption);

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  const onClickSortBy = (selectedOption: any) => {
    setSelectedOption(selectedOption);
    onChangeSortBy(selectedOption);
    setMenuIsOpen(false);
  };

  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>▼</components.DropdownIndicator>
    );
  };

  const dispatch = useAppDispatch();

  const onCloseSearchValue = () => {
    setSearchTerm("");
    dispatch(setSearchTerm(""));
  };

  return (
    <div className={style.sorted}>
      <div className={style.sorted__top}>
        <div className={style.total__found}>
          <span>{totalCars}</span>
          <p>found</p>
        </div>
        <div className={style.sortBy}>
          <p>Sort by:</p>
          <Select
            classNamePrefix="sort-select"
            value={selectedOption}
            onChange={onClickSortBy}
            options={options}
            menuIsOpen={menuIsOpen}
            //menuIsOpen={true}
            onMenuOpen={toggleMenu}
            //  onMenuClose={toggleMenu}
            components={{DropdownIndicator}}
          />
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
        {searchValue && (
          <SelectedFilter onClick={onCloseSearchValue} params={searchValue} />
        )}

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
        {mileage && (
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
              key={`type ${index}`}
              onClick={() => closeSelectedFilter(type)}
              params={
                type === "PickUp"
                  ? "Pick Up"
                  : type === "StationWagon"
                  ? "Station Wagon"
                  : type
              }
            />
          ))}
        {citiesArr &&
          citiesArr.map((city, index) => (
            <SelectedFilter
              key={`city ${index}`}
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
              key={`owners ${index}`}
              onClick={() => closeSelectedFilter(owners)}
              params={owners}
            />
          ))}

        {colorArr &&
          colorArr.map((color, index) => (
            <SelectedFilter
              key={`color ${index}`}
              onClick={() => closeSelectedFilter(color)}
              params={color}
            />
          ))}

        {seatsArr &&
          seatsArr.map((seats, index) => (
            <SelectedFilter
              key={`seats ${index}`}
              onClick={() => closeSelectedFilter(seats)}
              params={
                seats === "TwoSeats"
                  ? "Two seats"
                  : seats === "ThreeSeats"
                  ? "Three seats"
                  : seats === "FourSeats"
                  ? "Four seats"
                  : seats === "FiveSeats"
                  ? "Five seats"
                  : seats === "SixSeats"
                  ? "Six seats"
                  : seats === "SevenSeats"
                  ? "Seven seats"
                  : seats
              }
            />
          ))}

        {fuelArr &&
          fuelArr.map((fuel, index) => (
            <SelectedFilter
              key={`fuel ${index}`}
              onClick={() => closeSelectedFilter(fuel)}
              params={fuel}
            />
          ))}
        {transmissionArr &&
          transmissionArr.map((transmisision, index) => (
            <SelectedFilter
              key={`transmission ${index}`}
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
