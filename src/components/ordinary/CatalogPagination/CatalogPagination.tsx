import React, {useEffect, useState, useCallback} from "react";
import ReactDOM from "react-dom";

import style from "./__catalogPagination.module.scss";
import BigCard from "../../smart/BigCard/BigCard";
import {cars} from "../../../helpers/carList";

interface Props {
  currentItems: any;
}

export default function CatalogPagination({currentItems}: Props) {
  return (
    <div className={style.catalogPagination}>
      {currentItems &&
        currentItems.map((item: any) => {
          return (
            <>
              <BigCard
                index={item.index}
                brand={item.brand}
                model={item.model}
                price={item.price}
                previewIMG={item.previewIMG}
              ></BigCard>
            </>
          );
        })}
    </div>
  );
}
