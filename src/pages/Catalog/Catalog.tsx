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
import {getStorage, ref, listAll, deleteObject, list} from "firebase/storage";
import {getDownloadURL} from "firebase/storage";
import {getFirestore} from "firebase/firestore";
import DeleteCar from "../../components/ui/DeleteCar/DeleteCar";

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

interface SortType {
  value: string;
  label: string;
  sortProperty: string;
}

interface CatalogProps {
  selectedCurrency: string;
  eurValue: number;
  usdValue: number;
}

export default function Catalog({
  selectedCurrency,
  eurValue,
  usdValue,
}: CatalogProps) {
  const [sortType, setSortType] = useState<string>("dateAdded&order=desc");
  // console.log(sortType.value + " Catalog");
  const [password, setPassword] = useState<string>("");
  const [openPassword, setOpenPassword] = useState<boolean>(false);
  const [carsWithImages, setCarsWithImages] = useState<
    {
      id: string;
      index: string;
      brand: string;
      model: string;
      price: string;
      year: number;
      fuel: string;
      color: string;
      seats: string;
      transmission: string;
      owners: string;
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
        setIsLoading(true);
        const response = await fetch(
          `https://65378b85bb226bb85dd365a6.mockapi.io/cars?sortBy=${sortType}`
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
                  index: car.index,
                  brand: car.brand,
                  model: car.model,
                  price: car.price.toString(),
                  year: car.year,
                  fuel: car.fuel,
                  color: car.color,
                  seats: car.seats,
                  transmission: car.transmission,
                  owners: car.owners,
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
  }, [sortType]);

  const itemsPerPage = 8;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const brandParam = searchParams.get("brand") || "";

  const ownersParam = searchParams.get("owners") || "";

  //http://localhost:3000/Ecars#/catalog?brand=Acura
  // const ownersParam =

  interface Car {
    id: string;
    index: string;
    brand: string;
    model: string;
    price: string;
    fuel: string;
    location: string;
    vehicleType: string;
    year: number;
    owners: string;
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
  interface Cities {
    SaintPetersburg: boolean;
    Moscow: boolean;
    Almaty: boolean;
    Minsk: boolean;
    Dubai: boolean;
    AbuDhabi: boolean;
    Shanghai: boolean;
  }
  interface OwnersCheckboxes {
    None: boolean;
    One: boolean;
    Two: boolean;
    Three: boolean;
    More: boolean;
  }

  interface ColorCheckboxes {
    Black: boolean;
    White: boolean;
    Gray: boolean;
    Blue: boolean;
    Silver: boolean;
    Brown: boolean;
    Orange: boolean;
    Yellow: boolean;
    Red: boolean;
    Green: boolean;
  }

  interface SeatsCheckboxes {
    TwoSeats: boolean;
    ThreeSeats: boolean;
    FourSeats: boolean;
    FiveSeats: boolean;
    SixSeats: boolean;
    SevenSeats: boolean;
  }
  interface FuelCheckboxes {
    Gasoline: boolean;
    Diesel: boolean;
    Electric: boolean;
    Hybrid: boolean;
  }
  interface TransmissionCheckboxes {
    Automatic: boolean;
    Manual: boolean;
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
  const [maxPriceValue, setMaxPriceValue] = useState<number>(99999999);

  const [priceFilter, setPriceFilter] = useState<boolean>(false);

  const [cityCheckboxes, setCityCheckboxes] = useState({
    SaintPetersburg: false,
    Moscow: false,
    Almaty: false,
    Minsk: false,
    Dubai: false,
    AbuDhabi: false,
    Shanghai: false,
  });

  const [owners, setOwners] = useState({
    None: false,
    One: false,
    Two: false,
    Three: false,
    More: false,
  });

  const [color, setColor] = useState({
    Black: false,
    White: false,
    Gray: false,
    Blue: false,
    Silver: false,
    Brown: false,
    Orange: false,
    Yellow: false,
    Red: false,
    Green: false,
  });
  const [seats, setSeats] = useState({
    TwoSeats: false,
    ThreeSeats: false,
    FourSeats: false,
    FiveSeats: false,
    SixSeats: false,
    SevenSeats: false,
  });

  const [fuel, setFuel] = useState({
    Gasoline: false,
    Diesel: false,
    Electric: false,
    Hybrid: false,
  });

  const [transmission, setTransmission] = useState({
    Automatic: false,
    Manual: false,
  });

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
    setMinYearValue(2000);
    setMaxYearValue(currentYear);
  };

  const resetPrice = () => {
    setMinPriceValue(0);
    setMaxPriceValue(99999999);
  };

  const resetCity = () => {
    setCityCheckboxes({
      SaintPetersburg: false,
      Moscow: false,
      Almaty: false,
      Minsk: false,
      Dubai: false,
      AbuDhabi: false,
      Shanghai: false,
    });
  };
  const resetOwners = () => {
    setOwners({
      None: false,
      One: false,
      Two: false,
      Three: false,
      More: false,
    });
  };
  const resetColor = () => {
    setColor({
      Black: false,
      White: false,
      Gray: false,
      Blue: false,
      Silver: false,
      Brown: false,
      Orange: false,
      Yellow: false,
      Red: false,
      Green: false,
    });
  };
  const resetSeats = () => {
    setSeats({
      TwoSeats: false,
      ThreeSeats: false,
      FourSeats: false,
      FiveSeats: false,
      SixSeats: false,
      SevenSeats: false,
    });
  };
  const resetFuel = () => {
    setFuel({
      Gasoline: false,
      Diesel: false,
      Electric: false,
      Hybrid: false,
    });
  };
  const resetTransmission = () => {
    setTransmission({
      Automatic: false,
      Manual: false,
    });
  };

  const clearFiltersArg = () => {
    resetBrandFilter();
    resetModelFilter();
    resetVechicleTypeFilter();
    resetMileage();
    resetYear();
    resetPrice();
    resetCity();
    resetOwners();
    resetColor();
    resetSeats();
    resetFuel();
    resetTransmission();
  };

  const [filteredCars, setFilteredCars] = useState(carsWithImages);

  React.useEffect(() => {
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

    if (minPriceValue !== 0 || maxPriceValue !== 99999999) {
      setPriceFilter(true);
    } else {
      setPriceFilter(false);
    }

    if (ownersParam === "new") {
      setOwners({
        None: true,
        One: false,
        Two: false,
        Three: false,
        More: false,
      });
    } else if (ownersParam === "used") {
      setOwners({
        None: false,
        One: true,
        Two: true,
        Three: true,
        More: true,
      });
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

      const isCity =
        (cityCheckboxes.SaintPetersburg &&
          item.location === "Saint-Petersburg") ||
        (cityCheckboxes.Moscow && item.location === "Moscow") ||
        (cityCheckboxes.Almaty && item.location === "Almaty") ||
        (cityCheckboxes.Minsk && item.location === "Minsk") ||
        (cityCheckboxes.Dubai && item.location === "Dubai") ||
        (cityCheckboxes.AbuDhabi && item.location === "AbuDhabi") ||
        (cityCheckboxes.Shanghai && item.location === "Shanghai");

      const isOwnersMatch =
        (owners.None && item.owners === "0") ||
        (owners.One && item.owners === "1") ||
        (owners.Two && item.owners === "2") ||
        (owners.Three && item.owners === "3") ||
        (owners.More && item.owners === "4");

      const isColorMatch =
        (color.Black && item.color === "Black") ||
        (color.White && item.color === "White") ||
        (color.Gray && item.color === "Gray") ||
        (color.Blue && item.color === "Blue") ||
        (color.Silver && item.color === "Silver") ||
        (color.Brown && item.color === "Brown") ||
        (color.Orange && item.color === "Orange") ||
        (color.Yellow && item.color === "Yellow") ||
        (color.Red && item.color === "Red") ||
        (color.Green && item.color === "Green");

      const isSeatsMatch =
        (seats.TwoSeats && item.seats === "2") ||
        (seats.ThreeSeats && item.seats === "3") ||
        (seats.FourSeats && item.seats === "4") ||
        (seats.FiveSeats && item.seats === "5") ||
        (seats.SixSeats && item.seats === "6") ||
        (seats.SevenSeats && item.seats === "7");

      const isFuelMatch =
        (fuel.Gasoline && item.fuel === "Gasoline") ||
        (fuel.Diesel && item.fuel === "Diesel") ||
        (fuel.Electric && item.fuel === "Electric") ||
        (fuel.Hybrid && item.fuel === "Hybrid");

      const isTransmissionMatch =
        (transmission.Automatic && item.transmission === "Automatic") ||
        (transmission.Manual && item.transmission === "Manual");

      return (
        isBrandMatch &&
        isModelMatch &&
        isMileageMatch &&
        isYearMatch &&
        isPriceMatch &&
        (isTypeMatch ||
          Object.values(vechicleTypeCheckboxes).every((value) => !value)) &&
        (isCity || Object.values(cityCheckboxes).every((value) => !value)) &&
        (isOwnersMatch || Object.values(owners).every((value) => !value)) &&
        (isColorMatch || Object.values(color).every((value) => !value)) &&
        (isSeatsMatch || Object.values(seats).every((value) => !value)) &&
        (isFuelMatch || Object.values(fuel).every((value) => !value)) &&
        (isTransmissionMatch ||
          Object.values(transmission).every((value) => !value))
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
    cityCheckboxes,
    owners,
    color,
    seats,
    fuel,
    transmission,
    itemOffset,
    itemsPerPage,
    carsWithImages,
  ]);

  const handleBrandFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBrandFilter(event.target.value);
    setItemOffset(0);
    setCurrentPage(1);
    //поменять на текущую стр
  };
  const handleModelFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
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

  const handleCitiesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxId = event.target.id as keyof Cities;

    setCityCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [checkboxId]: !prevCheckboxes[checkboxId],
    }));
  };

  const handleOwnersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxId = event.target.id as keyof OwnersCheckboxes;
    setOwners((prevCheckboxes) => ({
      ...prevCheckboxes,
      [checkboxId]: !prevCheckboxes[checkboxId],
    }));
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxId = event.target.id as keyof ColorCheckboxes;
    setColor((prevCheckboxes) => ({
      ...prevCheckboxes,
      [checkboxId]: !prevCheckboxes[checkboxId],
    }));
  };

  const handleSeatsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxId = event.target.id as keyof SeatsCheckboxes;
    setSeats((prevCheckboxes) => ({
      ...prevCheckboxes,
      [checkboxId]: !prevCheckboxes[checkboxId],
    }));
  };

  const handleFuelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxId = event.target.id as keyof FuelCheckboxes;
    setFuel((prevCheckboxes) => ({
      ...prevCheckboxes,
      [checkboxId]: !prevCheckboxes[checkboxId],
    }));
  };

  const handleTransmissionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checkboxId = event.target.id as keyof TransmissionCheckboxes;
    setTransmission((prevCheckboxes) => ({
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
      setMaxPriceValue(99999999);
    } else {
      setVechicleTypeCheckboxes((prevState) => ({
        ...prevState,
        [filter]: false,
      }));
      setCityCheckboxes((prevState) => ({
        ...prevState,
        [filter]: false,
      }));
      setOwners((prevState) => ({
        ...prevState,
        [filter]: false,
      }));
      setColor((prevState) => ({
        ...prevState,
        [filter]: false,
      }));
      setSeats((prevState) => ({
        ...prevState,
        [filter]: false,
      }));
      setFuel((prevState) => ({
        ...prevState,
        [filter]: false,
      }));
      setTransmission((prevState) => ({
        ...prevState,
        [filter]: false,
      }));
    }
  };
  const checkPassword = () => {
    console.log(password);
    if (password === "060606") {
      console.log("You can delete");
    } else {
      console.log("Nio");
    }
  };
  // const onClickDelete = (carId: string, carIndex: string) => {
  //   checkPassword();
  //   setOpenPassword(true);
  // };

  const onClickDelete = async (carId: string, carIndex: string) => {
    setOpenPassword(true);
    if (password === "060606") {
      console.log("You can delete");
      try {
        setOpenPassword(false);
        setPassword("");

        const storage = getStorage();
        const storageRef = ref(storage, `cars/${carId}`);
        const imagesList = await list(storageRef);
        const deleteImagePromises = imagesList.items.map(async (imageRef) => {
          try {
            await deleteObject(imageRef);
          } catch (error) {
            console.error(
              `Ошибка при удалении изображения ${imageRef.name}:`,
              error
            );
          }
        });
        await Promise.all(deleteImagePromises);

        fetch(`https://65378b85bb226bb85dd365a6.mockapi.io/cars/${carIndex}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .then((tasks) => {
            console.log(tasks);
          })
          .catch((error) => {});

        console.log("Автомобиль удален из базы данных");
      } catch (error) {
        console.error(
          "Ошибка удаления изображений из папки и объекта из базы данных:",
          error
        );
      }
    } else {
      console.log("Nio");
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
          onCitiesChange={handleCitiesChange}
          onOwnersChange={handleOwnersChange}
          onColorChange={handleColorChange}
          onSeatsChange={handleSeatsChange}
          onFuelChange={handleFuelChange}
          onTransmissionchange={handleTransmissionChange}
          brandFilterValue={brandFilter}
          resetBrand={resetBrandFilter}
          resetModel={resetModelFilter}
          resetVechicleType={resetVechicleTypeFilter}
          resetMileage={resetMileage}
          resetYear={resetYear}
          resetPrice={resetPrice}
          resetCity={resetCity}
          resetOwners={resetOwners}
          resetColor={resetColor}
          resetSeats={resetSeats}
          resetFuel={resetFuel}
          resetTransmission={resetTransmission}
          modelFilterValue={modelFilter}
          checkBoxes1={vechicleTypeCheckboxes}
          cities={cityCheckboxes}
          ownersBoxes={owners}
          color={color}
          seats={seats}
          fuel={fuel}
          transmission={transmission}
          minMileageValue={minMileageValue}
          maxMileageValue={maxMileageValue}
          onMinMileageValue={handleMinMileageChange}
          onMaxMileageValue={handleMaxMileageChange}
          // mileageSliderChange={handleMileageSliderChange}
          selectedCurrency={selectedCurrency}
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
            onChangeSortBy={(selectedOption) =>
              setSortType(selectedOption.value)
            }
            isFiltersOpen={isFiltersOpen}
            setIsFiltersOpen={setIsFiltersOpen}
            brand={brandFilter}
            model={modelFilter}
            mileage={mileageFilter}
            date={yearFilter}
            price={priceFilter}
            type={vechicleTypeCheckboxes}
            cities={cityCheckboxes}
            owners={owners}
            color={color}
            seats={seats}
            fuel={fuel}
            transmission={transmission}
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
                <div className={style.bigCrad__wrapper}>
                  <BigCard
                    key={index}
                    id={car.id}
                    selectedCurrency={selectedCurrency}
                    usdValue={usdValue}
                    eurValue={eurValue}
                    index={index}
                    brand={car.brand}
                    model={car.model}
                    price={car.price}
                    fuel={car.fuel}
                    owners={car.owners}
                    location={car.location}
                    mileage={car.mileage}
                    description={car.description}
                    previewIMG={car.imageUrl}
                    onLoad={() => setIsLoading(false)}
                  />

                  <DeleteCar
                    deleteCarFunc={() => onClickDelete(car.id, car.index)}
                    id={car.id}
                  />
                  {openPassword && (
                    <input
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  )}
                </div>
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
