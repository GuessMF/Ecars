import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import style from "./__catalog.module.scss";
import Filters from "../../components/ordinary/Filters/Filters";
import Sorted from "../../components/ordinary/Sorted/Sorted";
// import CatalogPagination from "../../components/ordinary/CatalogPagination/CatalogPagination";
import BigCard from "../../components/smart/BigCard/BigCard";

import ReactPaginate from "react-paginate";

import {cars} from "../../helpers/carList";
//import ScrollToTopPagination from "../../utils/scrollToTopPagination";
//import {log} from "console";
// import {initializeApp} from "firebase/app";
import {initializeApp} from "firebase/app";
import {getStorage, ref, listAll} from "firebase/storage";
// import firebase from "firebase/app";

import {getDownloadURL} from "firebase/storage";
import {getFirestore} from "firebase/firestore";
//import {collection, getDocs} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyAPhpxFJD0FYxtAih7jSx8wgqETXHhOBeI",
  authDomain: "ecars-de7bc.firebaseapp.com",
  projectId: "ecars-de7bc",
  storageBucket: "ecars-de7bc.appspot.com",
  messagingSenderId: "110000528537",
  appId: "1:110000528537:web:321165893ea4a7a8ac6c08",
  measurementId: "G-XDXHPB18TW",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export default function Catalog() {
  const [carsWithImages, setCarsWithImages] = useState<
    {
      brand: string;
      model: string;
      price: string;
      year: number;
      mileage: number;
      imageUrl: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchCarImages = async () => {
      const carData = require("../../helpers/cars.json"); // Подгружаем данные о машинах из JSON
      const carsWithImagesArray: {
        brand: string;
        model: string;
        price: string;
        year: number;
        mileage: number;
        imageUrl: string;
      }[] = [];

      for (const car of carData) {
        const folderRef = ref(storage, `cars/${car.id}`);

        try {
          const carImages = await listAll(folderRef);
          if (carImages.items.length > 0) {
            const imageUrl = await getDownloadURL(carImages.items[0]);
            carsWithImagesArray.push({
              brand: car.brand,
              model: car.model,
              price: car.price,
              year: car.year,
              mileage: car.mileage,
              imageUrl: imageUrl,
            });
          }
        } catch (error) {
          console.error(
            `Error fetching images for car with ID ${car.id}:`,
            error
          );
        }
      }
      setCarsWithImages(carsWithImagesArray);
    };

    fetchCarImages();
  }, []);

  //
  //
  //
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

  React.useEffect(() => {
    const filteredItems = cars.filter(
      (item) =>
        item.brand.toLowerCase().startsWith(brandFilter.toLowerCase()) &&
        item.model.toLowerCase().startsWith(modelFilter.toLowerCase())
    );
    //console.log(filteredItems);

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
    //console.log(pageCount);

    setCurrentPage(currentPage);
    //console.log(currentPage);
  };

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };
  // {carsWithImages.map((car, index) => (
  //   <div key={index}>
  //     <img src={car.imageUrl} alt={`Car ${index + 1}`} />
  //     <h1>{car.brand}</h1>
  //     <p>Model: {car.model}</p>
  //     <p>Price: ${car.price}</p>
  //     <p>Year: {car.year}</p>
  //     <p>Mileage: {car.mileage} miles</p>
  //   </div>
  // ))}
  // {currentItems.length > 0 ? (
  //   currentItems.map((item: any) => (
  //     <BigCard
  //       index={item.index}
  //       brand={item.brand}
  //       model={item.model}
  //       price={item.price}
  //       previewIMG={item.previewIMG}
  //     />
  //   ))
  // ) : (
  //   <h1>No cars yet</h1>
  // )}
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
            {carsWithImages.map((car, index) => (
              <BigCard
                index={index}
                brand={car.brand}
                model={car.model}
                price={car.price}
                previewIMG={car.imageUrl}
              />
            ))}

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
