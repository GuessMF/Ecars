import React from "react";
import style from "./__catalog.module.scss";
import Filters from "../../components/ordinary/Filters/Filters";
import Sorted from "../../components/ordinary/Sorted/Sorted";
import CatalogPagination from "../../components/ordinary/CatalogPagination/CatalogPagination";
export default function Catalog() {
  return (
    <div className={style.catalog}>
      <h3>Find cars to fit your criteria</h3>
      <div className={style.catalog__content}>
        <Filters />
        <div className={style.catalog__left}>
          <Sorted />
          <CatalogPagination />
        </div>
      </div>
    </div>
  );
}
