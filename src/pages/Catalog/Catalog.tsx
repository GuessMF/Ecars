import React from "react";
import style from "./__catalog.module.scss";
import Filters from "../../components/ordinary/Filters/Filters";
import Sorted from "../../components/ordinary/Sorted/Sorted";
import CatalogPagination from "../../components/ordinary/CatalogPagination/CatalogPagination";

import ReactPaginate from "react-paginate";

import {cars} from "../../helpers/carList";
export default function Catalog() {
  // const [itemOffset, setItemOffset] = React.useState(0);
  const itemsPerPage = 8;
  // const endOffset = itemOffset + itemsPerPage;
  // const currentItems = cars.slice(itemOffset, endOffset);
  // const pageCount = Math.ceil(cars.length / itemsPerPage);
  // const handlePageClick = (event: any) => {
  //   const newOffset = (event.selected * itemsPerPage) % cars.length;
  //   setItemOffset(newOffset);
  // };
  interface Car {
    brand: string;
    model: string;
    price: string;
    previewIMG: string;
  }

  const [currentItems, setCurrentItems] = React.useState<Car[]>([]);
  const [pageCount, setPageCount] = React.useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = React.useState(0);

  React.useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(cars.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(cars.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % cars.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className={style.catalog}>
      <h3>Find cars to fit your criteria</h3>
      <div className={style.catalog__content}>
        <Filters />
        <div className={style.catalog__left}>
          <Sorted />
          <CatalogPagination currentItems={currentItems} />
          <ReactPaginate
            className={style.paginateBar}
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item-break"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </div>
  );
}
