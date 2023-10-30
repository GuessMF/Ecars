import React, {useState} from "react";

import {useEffect, useRef} from "react";
import {useLocation} from "react-router-dom";
import style from "./__catalog.module.scss";
import Filters from "../../components/ordinary/Filters/Filters";
import Sorted from "../../components/ordinary/Sorted/Sorted";
import BigCard from "../../components/smart/BigCard/BigCard";
import Skeleton from "../../components/ui/Skeleton/Skeleton";
import SkeletonMobile from "../../components/ui/SkeletonMobile/SkeletonMobile";
import ReactPaginate from "react-paginate";
import {initializeApp} from "firebase/app";
import {getStorage, ref, listAll} from "firebase/storage";
import {getDownloadURL} from "firebase/storage";
import {getFirestore} from "firebase/firestore";

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
      id: string;
      brand: string;
      model: string;
      price: string;
      year: number;
      fuel: string;
      vehicleType: string;
      location: string;
      description: string;
      mileage: number;
      imageUrl: string;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCarImages = async () => {
      try {
        const response = await fetch(
          "https://65378b85bb226bb85dd365a6.mockapi.io/cars"
        );
        if (response.ok) {
          const carData = await response.json();
          const carsWithImagesArray = [];
          for (const car of carData) {
            const folderRef = ref(storage, `cars/${car.id}`);
            try {
              const carImages = await listAll(folderRef);
              if (carImages.items.length > 0) {
                const imageUrl = await getDownloadURL(carImages.items[0]);
                carsWithImagesArray.push({
                  id: car.id.toString(),
                  brand: car.brand,
                  model: car.model,
                  price: car.price.toString(),
                  year: car.year,
                  fuel: car.fuel,
                  location: car.location,
                  vehicleType: car.vehicleType,
                  description: car.description,
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
          setIsLoading(false);
        } else {
          console.error("Failed to fetch car data");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching car data: ", error);
        setIsLoading(false);
      }
    };

    fetchCarImages();
  }, []);

  const itemsPerPage = 8;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const brandParam = searchParams.get("brand") || "";

  interface Car {
    id: string;
    brand: string;
    model: string;
    price: string;
    fuel: string;
    location: string;
    vehicleType: string;
    year: number;
    description: string;
    mileage: number;
    imageUrl: string;
  }
  interface CheckboxState {
    SUV: boolean;
    Sedan: boolean;
    PickUp: boolean;
    Convertible: boolean;
    Coupe: boolean;
    Hatchback: boolean;
  }
  const [currentItems, setCurrentItems] = React.useState<Car[]>([]);
  const [pageCount, setPageCount] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [itemOffset, setItemOffset] = React.useState(0);
  const [brandFilter, setBrandFilter] = useState<string>(brandParam);
  const [modelFilter, setModelFilter] = useState<string>("");
  const [vechicleTypeCheckboxes, setVechicleTypeCheckboxes] = useState({
    SUV: false,
    Sedan: false,
    PickUp: false,
    Convertible: false,
    Coupe: false,
    Hatchback: false,
    Van: false,
    StationWagon: false,
  });
  const [minMileageValue, setMinMileageValue] = useState<number>(0);
  const [maxMileageValue, setMaxMileageValue] = useState<number>(999999);

  const [mileageFilter, setMileageFilter] = useState<boolean>(false);

  const currendate = new Date();
  const currentYear = currendate.getFullYear();

  const [minYearValue, setMinYearValue] = useState<number>(2000);
  const [maxYearValue, setMaxYearValue] = useState<number>(currentYear);

  const [yearFilter, setYearFilter] = useState<boolean>(false);

  const [minPriceValue, setMinPriceValue] = useState<number>(0);
  const [maxPriceValue, setMaxPriceValue] = useState<number>(999999);

  const [priceFilter, setPriceFilter] = useState<boolean>(false);

  const resetBrandFilter = () => {
    setBrandFilter("");
  };
  const resetModelFilter = () => {
    setModelFilter("");
  };

  const resetVechicleTypeFilter = () => {
    setVechicleTypeCheckboxes({
      SUV: false,
      Sedan: false,
      PickUp: false,
      Convertible: false,
      Coupe: false,
      Hatchback: false,
      Van: false,
      StationWagon: false,
    });
  };
  const resetMileage = () => {
    setMinMileageValue(0);
    setMaxMileageValue(999999);
  };
  const resetYear = () => {
    setMinYearValue(0);
    setMaxYearValue(currentYear);
  };

  const resetPrice = () => {
    setMinPriceValue(0);
    setMaxPriceValue(999999);
  };

  const clearFiltersArg = () => {
    setBrandFilter("");
    setModelFilter("");
    setVechicleTypeCheckboxes({
      SUV: false,
      Sedan: false,
      PickUp: false,
      Convertible: false,
      Coupe: false,
      Hatchback: false,
      Van: false,
      StationWagon: false,
    });
    console.log(vechicleTypeCheckboxes);
  };

  // const newRef = useRef(null);

  const [filteredCars, setFilteredCars] = useState(carsWithImages);

  React.useEffect(() => {
    // const filteredItems = carsWithImages.filter(
    //   (item) =>
    //     item.brand.toLowerCase().startsWith(brandFilter.toLowerCase()) &&
    //     item.model.toLowerCase().startsWith(modelFilter.toLowerCase())
    if (minMileageValue !== 0 || maxMileageValue !== 999999) {
      setMileageFilter(true);
    } else {
      setMileageFilter(false);
    }

    if (minYearValue !== 2000 || maxYearValue !== 2023) {
      setYearFilter(true);
    } else {
      setYearFilter(false);
    }

    if (minPriceValue !== 0 || maxPriceValue !== 999999) {
      setPriceFilter(true);
    } else {
      setPriceFilter(false);
    }

    // );
    const filteredItems = carsWithImages.filter((item) => {
      const isBrandMatch = item.brand
        .toLowerCase()
        .startsWith(brandFilter.toLowerCase());
      const isModelMatch = item.model
        .toLowerCase()
        .startsWith(modelFilter.toLowerCase());
      const isTypeMatch =
        (vechicleTypeCheckboxes.SUV && item.vehicleType === "SUV") ||
        (vechicleTypeCheckboxes.Sedan && item.vehicleType === "Sedan") ||
        (vechicleTypeCheckboxes.PickUp && item.vehicleType === "Pick Up") ||
        (vechicleTypeCheckboxes.Convertible &&
          item.vehicleType === "Convertible") ||
        (vechicleTypeCheckboxes.Coupe && item.vehicleType === "Coupe") ||
        (vechicleTypeCheckboxes.Hatchback &&
          item.vehicleType === "Hatchback") ||
        (vechicleTypeCheckboxes.Van && item.vehicleType === "Van") ||
        (vechicleTypeCheckboxes.StationWagon &&
          item.vehicleType === "Station Wagon");
      const isMileageMatch =
        item.mileage >= minMileageValue && item.mileage <= maxMileageValue;

      isMileageMatch ? setMileageFilter(true) : setMileageFilter(false);

      const isYearMatch =
        item.year >= minYearValue && item.year <= maxYearValue;

      const isPriceMatch =
        Number(item.price) >= minPriceValue &&
        Number(item.price) <= maxPriceValue;
      // console.log(isMileageMatch);

      return (
        isBrandMatch &&
        isModelMatch &&
        isMileageMatch &&
        isYearMatch &&
        isPriceMatch &&
        (isTypeMatch ||
          Object.values(vechicleTypeCheckboxes).every((value) => !value))
      );
    });
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredItems.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredItems.length / itemsPerPage));
    setCurrentPage(0);
    setFilteredCars(filteredItems);
  }, [
    brandFilter,
    modelFilter,
    minMileageValue,
    maxMileageValue,
    minYearValue,
    maxYearValue,
    minPriceValue,
    maxPriceValue,
    vechicleTypeCheckboxes,
    itemOffset,
    itemsPerPage,
    carsWithImages,
  ]);
  // console.log(maxMileageValue);

  const handleBrandFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBrandFilter(event.target.value);
    setItemOffset(0);
    setCurrentPage(1);
    //поменять на текущую стр
  };
  const handleModelFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setModelFilter(event.target.value);
    setItemOffset(0);
    setCurrentPage(1);
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxId = event.target.id as keyof CheckboxState;
    setVechicleTypeCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [checkboxId]: !prevCheckboxes[checkboxId],
    }));
  };

  const handleMinMileageChange = (value: number) => {
    setMinMileageValue(value);
  };

  const handleMaxMileageChange = (value: number) => {
    setMaxMileageValue(value);
  };

  const handleMinYearChange = (value: number) => {
    setMinYearValue(value);
  };
  const handleMaxYearChange = (value: number) => {
    setMaxYearValue(value);
  };

  const handleMinPriceChange = (value: number) => {
    console.log(value);

    setMinPriceValue(value);
  };

  const handleMaxPriceChange = (value: number) => {
    setMaxPriceValue(value);
  };

  const handlePageClick = (event: any) => {
    const selectedPage = event.selected;
    const newOffset = selectedPage * itemsPerPage;
    const maxItemsPerPage = Math.min(
      newOffset + itemsPerPage,
      filteredCars.length
    );
    const catalog = document.getElementById("catalogList");
    catalog?.scrollIntoView({behavior: "smooth"});
    setItemOffset(newOffset);
    setCurrentItems(filteredCars.slice(newOffset, maxItemsPerPage));
    setCurrentPage(selectedPage);
  };

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  // const handleVechicleChange = (event: any) => {
  //   // console.log(event.target.id);
  // };

  // console.log(vechicleTypeCheckboxes);
  const closeSelectedFilter = (filter: string) => {
    if (filter === "brand") {
      setBrandFilter("");
    }
    if (filter === "model") {
      setModelFilter("");
    }
    if (filter === "mileage") {
      setMinMileageValue(0);
      setMaxMileageValue(999999);
    }
    if (filter === "year") {
      setMinYearValue(2000);
      setMaxYearValue(currentYear);
    }

    if (filter === "price") {
      setMinPriceValue(0);
      setMaxPriceValue(999999);
    } else {
      setVechicleTypeCheckboxes((prevState) => ({
        ...prevState,
        [filter]: false,
      }));
      console.log(filter);
    }
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
          onCheckboxChange={handleCheckboxChange}
          brandFilterValue={brandFilter}
          resetBrand={resetBrandFilter}
          resetModel={resetModelFilter}
          resetVechicleType={resetVechicleTypeFilter}
          resetMileage={resetMileage}
          resetYear={resetYear}
          resetPrice={resetPrice}
          modelFilterValue={modelFilter}
          checkBoxes1={vechicleTypeCheckboxes}
          minMileageValue={minMileageValue}
          maxMileageValue={maxMileageValue}
          onMinMileageValue={handleMinMileageChange}
          onMaxMileageValue={handleMaxMileageChange}
          // mileageSliderChange={handleMileageSliderChange}

          minYearValue={minYearValue}
          maxYearValue={maxYearValue}
          onMinYearValue={handleMinYearChange}
          onMaxYearValue={handleMaxYearChange}
          minPriceValue={minPriceValue}
          maxPriceValue={maxPriceValue}
          onMinPriceValue={handleMinPriceChange}
          onMaxPriceValue={handleMaxPriceChange}
        />

        <div id="catalogList" className={style.catalog__left}>
          <Sorted
            isFiltersOpen={isFiltersOpen}
            setIsFiltersOpen={setIsFiltersOpen}
            brand={brandFilter}
            model={modelFilter}
            mileage={mileageFilter}
            date={yearFilter}
            price={priceFilter}
            type={vechicleTypeCheckboxes}
            founted={filteredCars.length}
            clearFilterArg={clearFiltersArg}
            closeSelectedFilter={(filter) => closeSelectedFilter(filter)}
          />

          <div className={style.catalogPagination}>
            {isLoading ? (
              [...new Array(6)].map(() =>
                window.innerWidth > 450 ? <Skeleton /> : <SkeletonMobile />
              )
            ) : filteredCars.length > 0 ? (
              currentItems.map((car, index) => (
                <BigCard
                  key={index}
                  id={car.id}
                  index={index}
                  brand={car.brand}
                  model={car.model}
                  price={car.price}
                  fuel={car.fuel}
                  location={car.location}
                  mileage={car.mileage}
                  description={car.description}
                  previewIMG={car.imageUrl}
                  onLoad={() => setIsLoading(false)}
                />
              ))
            ) : (
              <h2>No cars</h2>
            )}
          </div>

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
