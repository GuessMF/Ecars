import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {useLocation} from "react-router-dom";
import style from "./__catalog.module.scss";
import Filters from "../../components/ordinary/Filters/Filters";
import Sorted from "../../components/ordinary/Sorted/Sorted";
// import CatalogPagination from "../../components/ordinary/CatalogPagination/CatalogPagination";
import BigCard from "../../components/smart/BigCard/BigCard";

import ReactPaginate from "react-paginate";

import {cars} from "../../helpers/carList";
import ScrollToTopPagination from "../../utils/scrollToTopPagination";
import {log} from "console";
export default function Catalog() {
  const itemsPerPage = 8;
  // const {brandName} = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const brandParam = searchParams.get("brand") || "";

  interface Car {
    brand: string;
    model: string;
    price: string;
    previewIMG: string;
  }

  const [currentItems, setCurrentItems] = React.useState<Car[]>([]);
  const [pageCount, setPageCount] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0);

  const [itemOffset, setItemOffset] = React.useState(0);

  const [brandFilter, setBrandFilter] = useState<string>(brandParam);
  const [modelFilter, setModelFilter] = useState<string>("");
  // if (brandName) {
  //   setBrandFilter(brandName);
  // }
  React.useEffect(() => {
    const filteredItems = cars.filter(
      (item) =>
        item.brand.toLowerCase().startsWith(brandFilter.toLowerCase()) &&
        item.model.toLowerCase().startsWith(modelFilter.toLowerCase())
    );
    console.log(filteredItems);

    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredItems.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredItems.length / itemsPerPage));
  }, [brandFilter, modelFilter, itemOffset, itemsPerPage]);

  const handleBrandFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBrandFilter(event.target.value);
    setItemOffset(0);
    setCurrentPage(1);
  };
  const handleModelFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setModelFilter(event.target.value);
    setItemOffset(0);
    setCurrentPage(1);
  };

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
          onBrandFilterChange={handleBrandFilterChange}
          onModelFilterChange={handleModelFilterChange}
        />

        <div id="catalogList" className={style.catalog__left}>
          <Sorted
            isFiltersOpen={isFiltersOpen}
            setIsFiltersOpen={setIsFiltersOpen}
          />

          <div className={style.catalogPagination}>
            {currentItems.length > 0 ? (
              currentItems.map((item: any) => (
                <BigCard
                  index={item.index}
                  brand={item.brand}
                  model={item.model}
                  price={item.price}
                  previewIMG={item.previewIMG}
                />
              ))
            ) : (
              <h1>No cars yet</h1>
            )}

            {/* <Skeleton /> */}
          </div>
          {/* <CatalogPagination currentItems={currentItems} /> */}

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
