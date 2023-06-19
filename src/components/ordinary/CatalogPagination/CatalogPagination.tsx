import React, {useEffect, useState, useCallback} from "react";
import ReactDOM from "react-dom";

import style from "./__catalogPagination.module.scss";
import BigCard from "../../smart/BigCard/BigCard";
import {cars} from "../../../helpers/carList";

export default function CatalogPagination() {
  return (
    <div className={style.catalogPagination}>
      {cars.map((car) => {
        return (
          <BigCard
            brand={car.brand}
            model={car.model}
            price={car.price}
            imageURL={car.imageURL}
          />
        );
      })}
    </div>
  );
}
