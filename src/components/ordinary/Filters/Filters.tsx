import React from "react";
import style from "./__filters.module.scss";
import MoreFilters from "../../ui/MoreFilters/MoreFilters";

export default function Filters() {
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
        <div className={style.filters__slider}>slider</div>
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
        <div className={style.filters__slider}>slider</div>
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
      <MoreFilters />
    </div>
  );
}

<div className={style.form_checkbox}>
  <input className={style.checkbox} type="checkbox" id="checkbox1" />
  <label htmlFor="checkbox1">Shawn Carter</label>
</div>;
