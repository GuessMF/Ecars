import React from "react";
import {CSSTransition} from "react-transition-group";
import style from "./__filters.module.scss";
import MoreFilters from "../../ui/MoreFilters/MoreFilters";
//import {RangeSlider} from "rsuite";
//import {Slider} from "rsuite";
//import RangeSlider from "../../ui/RangeSlider/RangeSlider";
//import RangeSliderInput from "react-range-slider-input";
import {Slider, RangeSlider} from "rsuite";

import "./slider.scss";
import "./style.css";

export default function Filters() {
  const [value, setValue] = React.useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };
  const [visible, setVisible] = React.useState(false);
  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <div className={style.filters}>
      <div className={style.filters__brand}>
        <div className={style.filters__label}>
          <h6>Brand</h6>
          <span>Reset</span>
        </div>
        <input type="text" placeholder="Toyota" />
      </div>
      <div className={style.filters__model}>
        <div className={style.filters__label}>
          <h6>Model</h6>
          <span>Reset</span>
        </div>
        <input type="text" placeholder="All" />
      </div>

      <div className={style.filters__vehicle_type}>
        <div className={style.filters__label}>
          <h6>Vechicle type</h6>
          <span>Reset</span>
        </div>

        <ul className={style.filters__check_list}>
          <li className={style.form_checkbox}>
            <input className={style.checkbox} type="checkbox" id="checkbox1" />
            <label htmlFor="checkbox1">SUV/Crossover</label>
          </li>

          <li className={style.form_checkbox}>
            <input className={style.checkbox} type="checkbox" id="checkbox2" />
            <label htmlFor="checkbox2">Sedan</label>
          </li>

          <li className={style.form_checkbox}>
            <input className={style.checkbox} type="checkbox" id="checkbox3" />
            <label htmlFor="checkbox3">Pick Up Truck</label>
          </li>

          <li className={style.form_checkbox}>
            <input className={style.checkbox} type="checkbox" id="checkbox4" />
            <label htmlFor="checkbox4">Convertible</label>
          </li>

          <li className={style.form_checkbox}>
            <input className={style.checkbox} type="checkbox" id="checkbox5" />
            <label htmlFor="checkbox5">Coupe</label>
          </li>
          <li className={style.form_checkbox}>
            <input className={style.checkbox} type="checkbox" id="checkbox6" />
            <label htmlFor="checkbox6">Hatchback</label>
          </li>
          <li className={style.form_checkbox}>
            <input className={style.checkbox} type="checkbox" id="checkbox7" />
            <label htmlFor="checkbox7">Shawn Carter</label>
          </li>
          <li className={style.form_checkbox}>
            <input className={style.checkbox} type="checkbox" id="checkbox8" />
            <label htmlFor="checkbox8">Shawn Carter</label>
          </li>
          <li className={style.form_checkbox}>
            <input className={style.checkbox} type="checkbox" id="checkbox9" />
            <label htmlFor="checkbox9">Shawn Carter</label>
          </li>
        </ul>
      </div>

      <div className={style.filters__mileage}>
        <div className={style.filters__label}>
          <h6>Mileage</h6>
          <span>Reset</span>
        </div>
        <div className={style.filters__min_max}>
          <input type="text" placeholder="Min" />
          <input type="text" placeholder="Max" />
        </div>
        <div className={style.filters__sli}>
          <RangeSlider
            defaultValue={[10, 50]}
            className="eeeeeee"
            barClassName="eeeeeee"
            handleClassName="eeeeeee"
          />
        </div>
      </div>

      <div className={style.filters__city}>
        <div className={style.filters__label}>
          <h6>Year</h6>
          <span>Reset</span>
        </div>
        <div className={style.filters__min_max}>
          <input type="text" placeholder="Min" />
          <input type="text" placeholder="Max" />
        </div>
      </div>

      <div className={style.filters__price}>
        <div className={style.filters__label}>
          <h6>Price, USD</h6>
          <span>Reset</span>
        </div>
        <div className={style.filters__min_max}>
          <input type="text" placeholder="Min" />
          <input type="text" placeholder="Max" />
        </div>
        <div className={style.filters__slider}></div>
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
            <input className={style.checkbox} type="checkbox" id="checkbox10" />
            <label htmlFor="checkbox10">New York</label>
          </li>

          <li className={style.form_checkbox}>
            <input className={style.checkbox} type="checkbox" id="checkbox11" />
            <label htmlFor="checkbox11">Los Angeles</label>
          </li>

          <li className={style.form_checkbox}>
            <input className={style.checkbox} type="checkbox" id="checkbox12" />
            <label htmlFor="checkbox12">Chicago</label>
          </li>

          <li className={style.form_checkbox}>
            <input className={style.checkbox} type="checkbox" id="checkbox13" />
            <label htmlFor="checkbox13">Houston</label>
          </li>

          <li className={style.form_checkbox}>
            <input className={style.checkbox} type="checkbox" id="checkbox14" />
            <label htmlFor="checkbox14">Phoenix</label>
          </li>
          <li className={style.form_checkbox}>
            <input className={style.checkbox} type="checkbox" id="checkbox15" />
            <label htmlFor="checkbox15">Philadelphia</label>
          </li>
          <li className={style.form_checkbox}>
            <input className={style.checkbox} type="checkbox" id="checkbox16" />
            <label htmlFor="checkbox16">City 1</label>
          </li>
          <li className={style.form_checkbox}>
            <input className={style.checkbox} type="checkbox" id="checkbox17" />
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
  );
}

{
  /* <div className={style.form_checkbox}>
  <input className={style.checkbox} type="checkbox" id="checkbox1" />
  <label htmlFor="checkbox1">Shawn Carter</label>
</div>; */
}
