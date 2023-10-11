import React, {useState} from "react";
import style from "./__catalog.module.scss";
import Filters from "../../components/ordinary/Filters/Filters";
import Sorted from "../../components/ordinary/Sorted/Sorted";
import CatalogPagination from "../../components/ordinary/CatalogPagination/CatalogPagination";

import ReactPaginate from "react-paginate";

import {cars} from "../../helpers/carList";
import ScrollToTopPagination from "../../utils/scrollToTopPagination";
import {log} from "console";
export default function Catalog() {
  const itemsPerPage = 8;

  interface Car {
    brand: string;
    model: string;
    price: string;
    previewIMG: string;
  }

  const [currentItems, setCurrentItems] = React.useState<Car[]>([]);
  const [pageCount, setPageCount] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);

  const [itemOffset, setItemOffset] = React.useState(0);

  React.useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(cars.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(cars.length / itemsPerPage));

    // if (window.innerWidth <= 450) {
    //   setPageCount(Math.ceil(cars.length / itemsPerPage) / 2);
    // } else {
    //   setPageCount(Math.ceil(cars.length / itemsPerPage));
    // }
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % cars.length;
    const catalog = document.getElementById("catalogList");

    catalog?.scrollIntoView({behavior: "smooth"});
    setItemOffset(newOffset);
    console.log(pageCount);

    setCurrentPage(currentPage);
    console.log(currentPage);
  };

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  return (
    <div className={style.catalog}>
      <h3>Find cars to fit your criteria</h3>
      <div className={style.catalog__content}>
        <Filters
          isFiltersOpen={isFiltersOpen}
          setIsFiltersOpen={setIsFiltersOpen}
        />

        <div id="catalogList" className={style.catalog__left}>
          <Sorted
            isFiltersOpen={isFiltersOpen}
            setIsFiltersOpen={setIsFiltersOpen}
          />
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
            initialPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}
