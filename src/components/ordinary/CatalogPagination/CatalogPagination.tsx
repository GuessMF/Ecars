import React, {useEffect, useState, useCallback} from "react";
import ReactDOM from "react-dom";

import style from "./__catalogPagination.module.scss";
import BigCard from "../../smart/BigCard/BigCard";
import {cars} from "../../../helpers/carList";
import Skeleton from "../../ui/Skeleton/Skeleton";
import {log} from "console";

import ScrollToTopPagination from "../../../utils/scrollToTopPagination";

interface Props {
  currentItems: any;
}

export default function CatalogPagination({currentItems}: Props) {
  const [loaded, setLoaded] = useState(false);

  setTimeout(() => {
    setLoaded(true);
  }, 1000);
  return (
    <div className={style.catalogPagination}>
      {currentItems.map((item: any) =>
        loaded ? (
          <BigCard
            index={item.index}
            brand={item.brand}
            model={item.model}
            price={item.price}
            previewIMG={item.previewIMG}
          />
        ) : (
          <Skeleton />
        )
      )}
    </div>
  );
}
