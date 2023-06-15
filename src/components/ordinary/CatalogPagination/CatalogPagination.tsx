import React, {useEffect, useState, useCallback} from "react";
import ReactDOM from "react-dom";
// import ReactPaginate from "react-paginate";
import style from "./__catalogPagination.module.scss";
import BigCard from "../../smart/BigCard/BigCard";

export default function CatalogPagination() {
  return (
    <div className={style.catalogPagination}>
      <BigCard />
      <BigCard />
      <BigCard />
      <BigCard />
      <BigCard />
      <BigCard />
      <BigCard />
    </div>
  );
}
