import React from "react";
import {CSSTransition} from "react-transition-group";
import style from "./__filters.module.scss";
import MoreFilters from "../../ui/MoreFilters/MoreFilters";
import {useState, useEffect} from "react";
import {RangeSlider} from "rsuite";
import "rsuite/dist/rsuite.css";
import carData from "../../../helpers/modelsBrands";
import {useAppSelector} from "hooks/redux-hooks";
// import {cars} from "../../helpers/carList";

interface CarModel {
  name: string;
}

interface CheckBoxes {
  SUV: boolean;
  Sedan: boolean;
  PickUp: boolean;
  Convertible: boolean;
  Coupe: boolean;
  Hatchback: boolean;
  Van: boolean;
  StationWagon: boolean;
}
interface Cities {
  SaintPetersburg: boolean;
  Moscow: boolean;
  Almaty: boolean;
  Minsk: boolean;
  Dubai: boolean;
  AbuDhabi: boolean;
  Shanghai: boolean;
}

interface Owners {
  None: boolean;
  One: boolean;
  Two: boolean;
  Three: boolean;
  More: boolean;
}

interface ColorCheckboxes {
  Black: boolean;
  White: boolean;
  Gray: boolean;
  Blue: boolean;
  Silver: boolean;
  Brown: boolean;
  Orange: boolean;
  Yellow: boolean;
  Red: boolean;
  Green: boolean;
  Gold: boolean;
  Purple: boolean;

  Pink: boolean;
}

interface SeatsCheckboxes {
  TwoSeats: boolean;
  ThreeSeats: boolean;
  FourSeats: boolean;
  FiveSeats: boolean;
  SixSeats: boolean;
  SevenSeats: boolean;
}
interface FuelCheckboxes {
  Gasoline: boolean;
  Diesel: boolean;
  Electric: boolean;
  Hybrid: boolean;
}
interface TransmissionCheckboxes {
  Automatic: boolean;
  Manual: boolean;
}

interface FiltersProps {
  isFiltersOpen: boolean;
  setIsFiltersOpen: (isFiltersOpen: boolean) => void;
  onBrandFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onModelFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCitiesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onOwnersChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSeatsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFuelChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTransmissionchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  brandFilterValue: string;
  modelFilterValue: string;
  resetModels: () => void;
  resetBrand: () => void;
  resetVechicleType: () => void;
  resetMileage: () => void;
  resetYear: () => void;
  resetPrice: () => void;

  resetCity: () => void;

  resetFuel: () => void;
  resetOwners: () => void;
  resetColor: () => void;
  resetSeats: () => void;
  resetTransmission: () => void;
  selectedCurrency: string;
  checkBoxes1: CheckBoxes;
  cities: Cities;
  ownersBoxes: Owners;
  color: ColorCheckboxes;
  fuel: FuelCheckboxes;
  seats: SeatsCheckboxes;
  transmission: TransmissionCheckboxes;
  minMileageValue: number;
  maxMileageValue: number;
  onMinMileageValue: (value: number) => void;
  onMaxMileageValue: (value: number) => void;

  //mileageSliderChange: (values: [number, number]) => void;

  minYearValue: number;
  maxYearValue: number;
  onMinYearValue: (value: number) => void;
  onMaxYearValue: (value: number) => void;

  minPriceValue: number;
  maxPriceValue: number;
  onMinPriceValue: (value: number) => void;
  onMaxPriceValue: (value: number) => void;
}

export default function Filters({
  isFiltersOpen,
  setIsFiltersOpen,
  onBrandFilterChange,
  onModelFilterChange,
  onCheckboxChange,
  onOwnersChange,
  onColorChange,
  onSeatsChange,
  onFuelChange,
  onTransmissionchange,
  brandFilterValue,
  modelFilterValue,
  selectedCurrency,
  resetBrand,
  resetModels,
  resetVechicleType,
  resetMileage,
  resetYear,
  resetPrice,
  resetCity,
  resetFuel,
  resetOwners,
  resetColor,
  resetSeats,
  resetTransmission,
  checkBoxes1,
  cities,
  ownersBoxes,
  color,
  fuel,
  seats,
  transmission,
  onCitiesChange,
  minMileageValue,
  maxMileageValue,
  onMaxMileageValue,
  onMinMileageValue,
  minYearValue,
  maxYearValue,
  onMaxYearValue,
  onMinYearValue,
  minPriceValue,
  maxPriceValue,
  onMinPriceValue,
  onMaxPriceValue,
}: // mileageSliderChange,

FiltersProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };
  const [visible, setVisible] = React.useState(false);
  const handleClick = () => {
    setVisible(!visible);
  };

  const closeFilters = () => {
    setIsFiltersOpen(false);
  };
  const [brand, setBrand] = useState<string>("");
  // const [model, setModel] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [models, setModels] = useState<CarModel[]>([]);

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBrand = event.target.value;
    setBrand(selectedBrand);

    // Найти модели для выбранной марки из carData
    const selectedBrandData = carData.brands.find(
      (item) => item.name === selectedBrand
    );
    setModels(selectedBrandData ? selectedBrandData.models : []);
  };

  // const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.search.searchTerm);

  useEffect(() => {
    // setSearchValue(searchTerm);
    const fountedBrand = carData.brands.find(
      (item) =>
        item.name ===
        searchTerm.charAt(0).toLocaleUpperCase() + searchTerm.slice(1)
    );
    console.log("founted " + fountedBrand?.name);
    if (fountedBrand) {
      setBrand(fountedBrand.name);
      setModels(fountedBrand ? fountedBrand.models : []);
      onBrandFilterChange(event);
    }
  }, [searchTerm]);

  const onBrandSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBrand: string = event.target.value;
    console.log(selectedBrand);

    // if (searchTerm) {
    //   const fountedBrand = carData.brands.find(
    //     (item) => item.name === searchTerm
    //   );
    //   console.log("founted" + fountedBrand);
    // }
    setBrand(selectedBrand);
    const selectedBrandData = carData.brands.find(
      (item) => item.name === selectedBrand
    );
    setModels(selectedBrandData ? selectedBrandData.models : []);
    onBrandFilterChange(event);
  };

  const currendate = new Date();
  const currentYear = currendate.getFullYear();

  const onResetBrand = () => {
    resetBrand();
    onResetModels();
  };
  const onResetModels = () => {
    resetModels();
    setModels([]);
  };
  useEffect(() => {
    if (!modelFilterValue) {
      onResetModels();
    }
  }, [modelFilterValue]);

  return (
    <div
      className={`${style.filtersWrapper} ${
        isFiltersOpen ? style.openFilters : ""
      }`}
    >
      <button className={style.filters__closeBtn} onClick={closeFilters}>
        X
      </button>
      <div className={style.filters}>
        <div className={style.filters__brand}>
          <div className={style.filters__label}>
            <h6>Brand</h6>
            <span onClick={onResetBrand}>Reset</span>
          </div>

          <select value={brandFilterValue} onChange={onBrandSelectChange}>
            <option value="">Select Brand</option>
            {carData.brands.map((brand) => {
              return (
                <option key={brand.name} value={brand.name}>
                  {brand.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className={style.filters__model}>
          <div className={style.filters__label}>
            <h6>Model</h6>
            <span onClick={onResetModels}>Reset</span>
          </div>

          <select onChange={onModelFilterChange}>
            <option value="">Выбери модель</option>
            {models.map((model) => (
              <option key={model.name} value={model.name}>
                {model.name}
              </option>
            ))}
          </select>
        </div>

        <div className={style.filters__vehicle_type}>
          <div className={style.filters__label}>
            <h6>Vechicle type</h6>
            <span onClick={() => resetVechicleType()}>Reset</span>
          </div>

          <ul className={style.filters__check_list}>
            <li className={style.form_checkbox}>
              <input
                className={style.checkbox}
                type="checkbox"
                id="SUV"
                onChange={onCheckboxChange}
                checked={checkBoxes1.SUV}
              />
              <label htmlFor="SUV">SUV/Crossover</label>
            </li>

            <li className={style.form_checkbox}>
              <input
                className={style.checkbox}
                type="checkbox"
                id="Sedan"
                onChange={onCheckboxChange}
                checked={checkBoxes1.Sedan}
              />
              <label htmlFor="Sedan">Sedan</label>
            </li>

            <li className={style.form_checkbox}>
              <input
                className={style.checkbox}
                type="checkbox"
                id="PickUp"
                onChange={onCheckboxChange}
                checked={checkBoxes1.PickUp}
              />
              <label htmlFor="PickUp">Pick Up</label>
            </li>

            <li className={style.form_checkbox}>
              <input
                className={style.checkbox}
                type="checkbox"
                id="Convertible"
                onChange={onCheckboxChange}
                checked={checkBoxes1.Convertible}
              />
              <label htmlFor="Convertible">Convertible</label>
            </li>

            <li className={style.form_checkbox}>
              <input
                className={style.checkbox}
                type="checkbox"
                id="Coupe"
                onChange={onCheckboxChange}
                checked={checkBoxes1.Coupe}
              />
              <label htmlFor="Coupe">Coupe</label>
            </li>
            <li className={style.form_checkbox}>
              <input
                className={style.checkbox}
                type="checkbox"
                id="Hatchback"
                onChange={onCheckboxChange}
                checked={checkBoxes1.Hatchback}
              />
              <label htmlFor="Hatchback">Hatchback</label>
            </li>
            <li className={style.form_checkbox}>
              <input
                className={style.checkbox}
                type="checkbox"
                id="Van"
                onChange={onCheckboxChange}
                checked={checkBoxes1.Van}
              />
              <label htmlFor="Van">Van</label>
            </li>
            <li className={style.form_checkbox}>
              <input
                className={style.checkbox}
                type="checkbox"
                id="StationWagon"
                onChange={onCheckboxChange}
                checked={checkBoxes1.StationWagon}
              />
              <label htmlFor="StationWagon">Station Wagon</label>
            </li>
          </ul>
        </div>

        <div className={style.filters__mileage}>
          <div className={style.filters__label}>
            <h6>Mileage</h6>
            <span onClick={() => resetMileage()}>Reset</span>
          </div>
          <div className={style.filters__min_max}>
            <input
              type="text"
              placeholder="Min"
              min="1"
              value={minMileageValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = Number(e.target.value);
                onMinMileageValue(value);
              }}
            />
            <input
              type="number"
              placeholder="Max"
              max="999999"
              value={maxMileageValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  onMaxMileageValue(parseInt(value, 10));
                }
              }}
            />
          </div>
          <div className={style.miliage__slider}>
            <RangeSlider
              value={[minMileageValue, maxMileageValue]}
              step={1000}
              defaultValue={[0, 999999]}
              max={999999}
              onChange={(values: [number, number]) => {
                onMinMileageValue(values[0]);
                onMaxMileageValue(values[1]);
              }}
            />
          </div>
        </div>

        <div className={style.filters__year}>
          <div className={style.filters__label}>
            <h6>Year</h6>
            <span onClick={() => resetYear()}>Reset</span>
          </div>
          <div className={style.filters__min_max}>
            <input
              type="number"
              placeholder="Min"
              min={0}
              max={currentYear}
              value={minYearValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onMinYearValue(parseInt(e.target.value, 10))
              }
            />
            <input
              type="number"
              placeholder="Max"
              min={0}
              max={currentYear}
              value={maxYearValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onMaxYearValue(parseInt(e.target.value, 10))
              }
            />
          </div>
        </div>

        <div className={style.filters__price}>
          <div className={style.filters__label}>
            <h6>Price, {selectedCurrency}</h6>
            <span onClick={() => resetPrice()}>Reset</span>
          </div>
          <div className={style.filters__min_max}>
            <input
              type="text"
              placeholder="Min"
              min="1"
              value={minPriceValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = Number(e.target.value);
                onMinPriceValue(value);
              }}
            />
            <input
              type="number"
              placeholder="Max"
              max="99999999"
              value={maxPriceValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  //onMaxPriceValue(parseInt(value, 10));
                  onMaxPriceValue(Number(value));
                }
              }}
            />
          </div>
          <div className={style.price__slider}>
            <RangeSlider
              value={[minPriceValue, maxPriceValue]}
              step={1000}
              defaultValue={[0, 99999999]}
              max={99999999}
              onChange={(values: [number, number]) => {
                onMinPriceValue(values[0]);
                onMaxPriceValue(values[1]);
              }}
            />
          </div>
        </div>

        <div className={style.filters__city}>
          <div className={style.filters__label}>
            <h6>City</h6>
            <span onClick={() => resetCity()}>Reset</span>
          </div>

          <ul className={style.filters__check_list}>
            <li className={style.form_checkbox}>
              <input
                className={style.checkbox}
                type="checkbox"
                id="SaintPetersburg"
                checked={cities.SaintPetersburg}
                onChange={onCitiesChange}
              />
              <label htmlFor="SaintPetersburg">Saint-Petersburg</label>
            </li>

            <li className={style.form_checkbox}>
              <input
                className={style.checkbox}
                type="checkbox"
                id="Moscow"
                checked={cities.Moscow}
                onChange={onCitiesChange}
              />
              <label htmlFor="Moscow">Moscow</label>
            </li>

            <li className={style.form_checkbox}>
              <input
                className={style.checkbox}
                type="checkbox"
                id="Almaty"
                checked={cities.Almaty}
                onChange={onCitiesChange}
              />
              <label htmlFor="Almaty">Almaty</label>
            </li>

            <li className={style.form_checkbox}>
              <input
                className={style.checkbox}
                type="checkbox"
                id="Minsk"
                checked={cities.Minsk}
                onChange={onCitiesChange}
              />
              <label htmlFor="Minsk">Minsk</label>
            </li>

            <li className={style.form_checkbox}>
              <input
                className={style.checkbox}
                type="checkbox"
                id="Dubai"
                checked={cities.Dubai}
                onChange={onCitiesChange}
              />
              <label htmlFor="Dubai">Dubai</label>
            </li>
            <li className={style.form_checkbox}>
              <input
                className={style.checkbox}
                type="checkbox"
                id="AbuDhabi"
                checked={cities.AbuDhabi}
                onChange={onCitiesChange}
              />
              <label htmlFor="AbuDhabi">Abu Dhabi</label>
            </li>
            <li className={style.form_checkbox}>
              <input
                className={style.checkbox}
                type="checkbox"
                id="Shanghai"
                checked={cities.Shanghai}
                onChange={onCitiesChange}
              />
              <label htmlFor="Shanghai">Shanghai</label>
            </li>
          </ul>
        </div>
        <CSSTransition
          in={visible}
          timeout={300}
          classNames={style.alert}
          unmountOnExit
        >
          <div className={style.more__filters}>
            <h4>SPECIFICATIONS</h4>

            <div className={style.filters__cylinders}>
              <div className={style.filters__label}>
                <h6>Owners</h6>
                <span onClick={() => resetOwners()}>Reset</span>
              </div>
              <ul className={style.filters__check_list}>
                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="None"
                    checked={ownersBoxes.None}
                    onChange={onOwnersChange}
                  />
                  <label htmlFor="None">None</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="One"
                    checked={ownersBoxes.One}
                    onChange={onOwnersChange}
                  />
                  <label htmlFor="One">1</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="Two"
                    checked={ownersBoxes.Two}
                    onChange={onOwnersChange}
                  />
                  <label htmlFor="Two">2</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="Three"
                    checked={ownersBoxes.Three}
                    onChange={onOwnersChange}
                  />
                  <label htmlFor="Three">3</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="More"
                    checked={ownersBoxes.More}
                    onChange={onOwnersChange}
                  />
                  <label htmlFor="More">3+</label>
                </li>
              </ul>
            </div>
            <div className={style.filters__color}>
              <div className={style.filters__label}>
                <h6>Color</h6>
                <span onClick={() => resetColor()}>Reset</span>
              </div>
              <ul className={style.filters__check_list}>
                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="White"
                    checked={color.White}
                    onChange={onColorChange}
                  />
                  <label htmlFor="White">
                    White <div className={style.block_white}></div>
                  </label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="Black"
                    checked={color.Black}
                    onChange={onColorChange}
                  />
                  <label htmlFor="Black">
                    Black <div className={style.block_black}></div>
                  </label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="Silver"
                    checked={color.Silver}
                    onChange={onColorChange}
                  />
                  <label htmlFor="Silver">
                    Silver <div className={style.block_silver}></div>
                  </label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="Gray"
                    checked={color.Gray}
                    onChange={onColorChange}
                  />
                  <label htmlFor="Gray">
                    Gray <div className={style.block_gray}></div>
                  </label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="Blue"
                    onChange={onColorChange}
                  />
                  <label htmlFor="Blue">
                    Blue <div className={style.block_blue}></div>
                  </label>
                </li>
                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="Red"
                    checked={color.Red}
                    onChange={onColorChange}
                  />
                  <label htmlFor="Red">
                    Red <div className={style.block_red}></div>
                  </label>
                </li>
                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="Green"
                    checked={color.Green}
                    onChange={onColorChange}
                  />
                  <label htmlFor="Green">
                    Green <div className={style.block_green}></div>
                  </label>
                </li>
                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="Brown"
                    checked={color.Brown}
                    onChange={onColorChange}
                  />
                  <label htmlFor="Brown">
                    Brown <div className={style.block_brown}></div>
                  </label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="Gold"
                    checked={color.Gold}
                    onChange={onColorChange}
                  />
                  <label htmlFor="Gold">
                    Gold <div className={style.block_gold}></div>
                  </label>
                </li>
                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="Purple"
                    checked={color.Purple}
                    onChange={onColorChange}
                  />
                  <label htmlFor="Purple">
                    Purple <div className={style.block_purple}></div>
                  </label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="Orange"
                    checked={color.Orange}
                    onChange={onColorChange}
                  />
                  <label htmlFor="Orange">
                    Orange <div className={style.block_orange}></div>
                  </label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="Yellow"
                    checked={color.Yellow}
                    onChange={onColorChange}
                  />
                  <label htmlFor="Yellow">
                    Yellow <div className={style.block_yellow}></div>
                  </label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="Pink"
                    checked={color.Pink}
                    onChange={onColorChange}
                  />
                  <label htmlFor="Pink">
                    Pink <div className={style.block_pink}></div>
                  </label>
                </li>
              </ul>
            </div>

            <div className={style.filters__seats}>
              <div className={style.filters__label}>
                <h6>Seats</h6>
                <span onClick={() => resetSeats()}>Reset</span>
              </div>
              <ul className={style.filters__check_list}>
                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="TwoSeats"
                    checked={seats.TwoSeats}
                    onChange={onSeatsChange}
                  />
                  <label htmlFor="TwoSeats">2</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="ThreeSeats"
                    checked={seats.ThreeSeats}
                    onChange={onSeatsChange}
                  />
                  <label htmlFor="ThreeSeats">3</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="FourSeats"
                    checked={seats.FourSeats}
                    onChange={onSeatsChange}
                  />
                  <label htmlFor="FourSeats">4</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="FiveSeats"
                    checked={seats.FiveSeats}
                    onChange={onSeatsChange}
                  />
                  <label htmlFor="FiveSeats">5</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="SixSeats"
                    checked={seats.SixSeats}
                    onChange={onSeatsChange}
                  />
                  <label htmlFor="SixSeats">6</label>
                </li>
                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="SevenSeats"
                    checked={seats.SevenSeats}
                    onChange={onSeatsChange}
                  />
                  <label htmlFor="SevenSeats">7</label>
                </li>
              </ul>
            </div>

            <div className={style.filters__fuel_type}>
              <div className={style.filters__label}>
                <h6>Fuel type</h6>
                <span onClick={() => resetFuel()}>Reset</span>
              </div>
              <ul className={style.filters__check_list}>
                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="Gasoline"
                    checked={fuel.Gasoline}
                    onChange={onFuelChange}
                  />
                  <label htmlFor="Gasoline">Gasoline</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="Diesel"
                    checked={fuel.Diesel}
                    onChange={onFuelChange}
                  />
                  <label htmlFor="Diesel">Diesel</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="Hybrid"
                    checked={fuel.Hybrid}
                    onChange={onFuelChange}
                  />
                  <label htmlFor="Hybrid">Hybrid</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="Electric"
                    checked={fuel.Electric}
                    onChange={onFuelChange}
                  />
                  <label htmlFor="Electric">Electric</label>
                </li>
              </ul>
            </div>

            <div className={style.filters__transmission}>
              <div className={style.filters__label}>
                <h6>Transmision</h6>
                <span onClick={() => resetTransmission()}>Reset</span>
              </div>
              <ul className={style.filters__check_list}>
                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="Manual"
                    checked={transmission.Manual}
                    onChange={onTransmissionchange}
                  />
                  <label htmlFor="Manual">Manual</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="Automatic"
                    checked={transmission.Automatic}
                    onChange={onTransmissionchange}
                  />
                  <label htmlFor="Automatic">Automatic</label>
                </li>
              </ul>
            </div>
          </div>
        </CSSTransition>

        <MoreFilters onclick={handleClick} visible={visible} />
      </div>
    </div>
  );
}

{
  /* <div className={style.form_checkbox}>
  <input className={style.checkbox} type="checkbox" id="checkbox1" />
  <label htmlFor="checkbox1">Shawn Carter</label>
</div>; */
}
