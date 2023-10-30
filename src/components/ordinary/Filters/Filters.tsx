import React from "react";
import {CSSTransition} from "react-transition-group";
import style from "./__filters.module.scss";
import MoreFilters from "../../ui/MoreFilters/MoreFilters";
import {useState} from "react";
import {RangeSlider} from "rsuite";
import "rsuite/dist/rsuite.css";
// import {cars} from "../../helpers/carList";

interface CheckBoxes {
  SUV: boolean;
  Sedan: boolean;
  PickUp: boolean;
  Convertible: boolean;
  Coupe: boolean;
  Hatchback: boolean;
}
interface FiltersProps {
  isFiltersOpen: boolean;
  setIsFiltersOpen: (isFiltersOpen: boolean) => void;
  onBrandFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onModelFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  brandFilterValue: string;
  modelFilterValue: string;
  resetModel: () => void;
  resetBrand: () => void;
  resetVechicleType: () => void;
  resetMileage: () => void;
  resetYear: () => void;
  resetPrice: () => void;
  checkBoxes1: CheckBoxes;
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
  brandFilterValue,
  modelFilterValue,
  resetBrand,
  resetModel,
  resetVechicleType,
  resetMileage,
  resetYear,
  resetPrice,
  checkBoxes1,
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

  const currendate = new Date();
  const currentYear = currendate.getFullYear();

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
            <span onClick={() => resetBrand()}>Reset</span>
          </div>
          <input
            type="text"
            placeholder="Brand"
            id="BrandInput"
            value={brandFilterValue}
            onChange={onBrandFilterChange}
          />
        </div>
        <div className={style.filters__model}>
          <div className={style.filters__label}>
            <h6>Model</h6>
            <span onClick={() => resetModel()}>Reset</span>
          </div>
          <input
            type="text"
            placeholder="All"
            id="ModelInput"
            value={modelFilterValue}
            onChange={onModelFilterChange}
          />
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
              />
              <label htmlFor="Van">Van</label>
            </li>
            <li className={style.form_checkbox}>
              <input
                className={style.checkbox}
                type="checkbox"
                id="StationWagon"
                onChange={onCheckboxChange}
              />
              <label htmlFor="StationWagon">Station Wagon</label>
            </li>
            <li className={style.form_checkbox}>
              <input
                className={style.checkbox}
                type="checkbox"
                id="checkbox9"
              />
              <label htmlFor="checkbox9">Shawn Carter</label>
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
            <h6>Price, USD</h6>
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
              max="999999"
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
              defaultValue={[0, 999999]}
              max={999999}
              onChange={(values: [number, number]) => {
                onMinPriceValue(values[0]);
                onMaxPriceValue(values[1]);
              }}
            />
          </div>
        </div>

        <div className={style.filters__country}>
          <div className={style.filters__label}>
            <h6>Country</h6>
            <span>Reset</span>
          </div>
          <input type="text" placeholder="USA" />
        </div>

        <div className={style.filters__city}>
          <div className={style.filters__label}>
            <h6>City</h6>
            <span>Reset</span>
          </div>

          <ul className={style.filters__check_list}>
            <li className={style.form_checkbox}>
              <input
                className={style.checkbox}
                type="checkbox"
                id="checkbox10"
              />
              <label htmlFor="checkbox10">New York</label>
            </li>

            <li className={style.form_checkbox}>
              <input
                className={style.checkbox}
                type="checkbox"
                id="checkbox11"
              />
              <label htmlFor="checkbox11">Los Angeles</label>
            </li>

            <li className={style.form_checkbox}>
              <input
                className={style.checkbox}
                type="checkbox"
                id="checkbox12"
              />
              <label htmlFor="checkbox12">Chicago</label>
            </li>

            <li className={style.form_checkbox}>
              <input
                className={style.checkbox}
                type="checkbox"
                id="checkbox13"
              />
              <label htmlFor="checkbox13">Houston</label>
            </li>

            <li className={style.form_checkbox}>
              <input
                className={style.checkbox}
                type="checkbox"
                id="checkbox14"
              />
              <label htmlFor="checkbox14">Phoenix</label>
            </li>
            <li className={style.form_checkbox}>
              <input
                className={style.checkbox}
                type="checkbox"
                id="checkbox15"
              />
              <label htmlFor="checkbox15">Philadelphia</label>
            </li>
            <li className={style.form_checkbox}>
              <input
                className={style.checkbox}
                type="checkbox"
                id="checkbox16"
              />
              <label htmlFor="checkbox16">City 1</label>
            </li>
            <li className={style.form_checkbox}>
              <input
                className={style.checkbox}
                type="checkbox"
                id="checkbox17"
              />
              <label htmlFor="checkbox17">City 2</label>
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
                <h6>Cylinders</h6>
                <span>Reset</span>
              </div>
              <ul className={style.filters__check_list}>
                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox18"
                  />
                  <label htmlFor="checkbox18">2</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox19"
                  />
                  <label htmlFor="checkbox19">3</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox20"
                  />
                  <label htmlFor="checkbox20">4</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox21"
                  />
                  <label htmlFor="checkbox21">5</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox22"
                  />
                  <label htmlFor="checkbox22">6</label>
                </li>
                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox23"
                  />
                  <label htmlFor="checkbox23">7</label>
                </li>
                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox24"
                  />
                  <label htmlFor="checkbox24">8</label>
                </li>
                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox25"
                  />
                  <label htmlFor="checkbox25">9</label>
                </li>
              </ul>
            </div>
            <div className={style.filters__color}>
              <div className={style.filters__label}>
                <h6>Color</h6>
                <span>Reset</span>
              </div>
              <ul className={style.filters__check_list}>
                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox26"
                  />
                  <label htmlFor="checkbox26">Black</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox27"
                  />
                  <label htmlFor="checkbox27">Blue</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox28"
                  />
                  <label htmlFor="checkbox28">Brown</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox29"
                  />
                  <label htmlFor="checkbox29">Gold</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox30"
                  />
                  <label htmlFor="checkbox30">Green</label>
                </li>
                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox31"
                  />
                  <label htmlFor="checkbox31">Gray</label>
                </li>
                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox32"
                  />
                  <label htmlFor="checkbox32">White</label>
                </li>
                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox33"
                  />
                  <label htmlFor="checkbox33">Yellow</label>
                </li>
              </ul>
            </div>

            <div className={style.filters__seats}>
              <div className={style.filters__label}>
                <h6>Seats</h6>
                <span>Reset</span>
              </div>
              <ul className={style.filters__check_list}>
                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox34"
                  />
                  <label htmlFor="checkbox34">2</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox35"
                  />
                  <label htmlFor="checkbox35">3</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox36"
                  />
                  <label htmlFor="checkbox36">4</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox37"
                  />
                  <label htmlFor="checkbox37">5</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox38"
                  />
                  <label htmlFor="checkbox38">6</label>
                </li>
                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox39"
                  />
                  <label htmlFor="checkbox39">7</label>
                </li>
                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox40"
                  />
                  <label htmlFor="checkbox40">8</label>
                </li>
                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox41"
                  />
                  <label htmlFor="checkbox41">9</label>
                </li>
              </ul>
            </div>

            <div className={style.filters__fuel_type}>
              <div className={style.filters__label}>
                <h6>Fuel type</h6>
                <span>Reset</span>
              </div>
              <ul className={style.filters__check_list}>
                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox42"
                  />
                  <label htmlFor="checkbox42">Gasoline</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox43"
                  />
                  <label htmlFor="checkbox43">Diesel</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox44"
                  />
                  <label htmlFor="checkbox44">Hybrid</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox45"
                  />
                  <label htmlFor="checkbox45">Electric</label>
                </li>
              </ul>
            </div>

            <div className={style.filters__transmission}>
              <div className={style.filters__label}>
                <h6>Transmision</h6>
                {/* <span>Reset</span> */}
              </div>
              <ul className={style.filters__check_list}>
                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox46"
                  />
                  <label htmlFor="checkbox46">Manual</label>
                </li>

                <li className={style.form_checkbox}>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    id="checkbox47"
                  />
                  <label htmlFor="checkbox47">Automatic</label>
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
