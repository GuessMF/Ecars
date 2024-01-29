import React, {useState} from "react";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import style from "./__catalog.module.scss";
import Filters from "../../components/ordinary/Filters/Filters";
import Sorted from "../../components/ordinary/Sorted/Sorted";
import BigCard from "../../components/smart/BigCard/BigCard";
import Skeleton from "../../components/ui/Skeleton/Skeleton";
import SkeletonMobile from "../../components/ui/SkeletonMobile/SkeletonMobile";
import Sorry from "../../assets/images/sorry.webp";
import {setCurrentCatalogPage} from "store/slices/currentCatalogPageSlice";
import {useAppDispatch} from "hooks/redux-hooks";
import carData from "helpers/modelsBrands";
import "../../firebase";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {
  collection,
  query,
  orderBy,
  getDocs,
  DocumentSnapshot,
  where,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import {db} from "../../firebase";

import {useAppSelector} from "hooks/redux-hooks";

interface SortObj {
  value: string;
  sort: string;
  desc: boolean;
  label: string;
}
type CityCheckboxes = {
  [key: string]: boolean;
  SaintPetersburg: boolean;
  Moscow: boolean;
  Almaty: boolean;
  Minsk: boolean;
  Dubai: boolean;
  AbuDhabi: boolean;
  Shanghai: boolean;
};

export default function Catalog() {
  const searchTerm = useAppSelector((state) => state.search.searchTerm);
  const selectedCurrency = useAppSelector(
    (state) => state.currency.currencyTerm
  );

  const usdValue = useAppSelector((state) => state.currValue.usdValue);
  const eurValue = useAppSelector((state) => state.currValue.eurValue);

  const currentCatalogPage = useAppSelector(
    (state) => state.currentCatalogPage.currentCatalogPage
  );

  const dispatch = useAppDispatch();

  let multiplier: number =
    selectedCurrency === "RUB"
      ? usdValue
      : selectedCurrency === "EUR"
      ? usdValue / eurValue
      : 1;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const brandParam = searchParams.get("brand") || "";
  const yearParam = searchParams.get("year") || "1980";
  const modelParam = searchParams.get("model") || "";
  const locationParam = searchParams.get("location") || "";
  const mileageParam = searchParams.get("mileage" || "");

  const currendate = new Date();
  const currentYear = currendate.getFullYear();

  const [brandFilter, setBrandFilter] = useState<string>(
    brandParam.toLocaleLowerCase()
  );
  const [modelFilter, setModelFilter] = useState<string>(modelParam);
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
  const [minMileageValue, setMinMileageValue] = useState<string>("0");
  const [maxMileageValue, setMaxMileageValue] = useState<string>("999 999");
  const [mileageFilter, setMileageFilter] = useState<boolean>(false);

  const [minYearValue, setMinYearValue] = useState<number>(Number(yearParam));
  const [maxYearValue, setMaxYearValue] = useState<number>(currentYear);
  const [yearFilter, setYearFilter] = useState<boolean>(false);

  const [minPriceValue, setMinPriceValue] = useState<string>("0");
  const [maxPriceValue, setMaxPriceValue] = useState<string>("99 999 999");

  const priceFilter: boolean = false;
  const [cityCheckboxes, setCityCheckboxes] = useState<CityCheckboxes>({
    SaintPetersburg: false,
    Moscow: false,
    Almaty: false,
    Minsk: false,
    Dubai: false,
    AbuDhabi: false,
    Shanghai: false,
  });

  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (mileageParam === "Used") {
      setMinMileageValue("100");
      setMaxMileageValue("999 999");
    }
    if (mileageParam === "New") {
      setMinMileageValue("1");
      setMaxMileageValue("99");
    }
  }, [location]);

  const newLocationParam = () => {
    let location = locationParam;

    if (locationParam == "Saint-Petersburg") {
      location = "SaintPetersburg";
    }
    if (locationParam) {
      const updatedCityCheckboxes = {...cityCheckboxes};
      if (locationParam && updatedCityCheckboxes.hasOwnProperty(location)) {
        updatedCityCheckboxes[location] = true;
      }
      setCityCheckboxes(updatedCityCheckboxes);
    }
  };
  const newMileageParam = () => {
    if (mileageParam === "New") {
      setMinMileageValue("1");
      setMaxMileageValue("99");
    } else if (mileageParam === "Used") {
      setMinMileageValue("100");
    }
  };
  useEffect(() => {
    newLocationParam();
    newMileageParam();
  }, []);

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
    Gold: false,
    Purple: false,

    Pink: false,
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

  const [totalCars, setTotalCars] = useState<number>(0);
  const [filtredCars, setFiltredCars] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);

  const itemsPerPage: number = 5;
  const pages = Math.ceil(totalCars / itemsPerPage);

  const [cars, setCars] = useState<Car[]>([]);

  const [lastVisibleRefs, setLastVisibleRefs] = useState<
    DocumentSnapshot<Car>[]
  >([]);

  const [sortType, setSortType] = useState<SortObj>({
    value: "Expensive",
    sort: "price",
    desc: true,
    label: "Expensive",
  });

  useEffect(() => {
    fetchFirstPage(
      sortType,
      brandFilter,
      modelFilter,
      vechicleTypeCheckboxes,
      cityCheckboxes,
      owners,
      color,
      seats,
      fuel,
      transmission,
      minMileageValue,
      maxMileageValue,
      minYearValue,
      maxYearValue,
      minPriceValue,
      maxPriceValue,
      searchTerm
    );

    if (
      parseInt(minMileageValue.replace(/\s/g, ""), 10) > 0 ||
      parseInt(maxMileageValue.replace(/\s/g, ""), 10) < 999999
    ) {
      setMileageFilter(true);
    } else {
      setMileageFilter(false);
    }

    if (minYearValue > 1980 || maxYearValue < currentYear) {
      setYearFilter(true);
    } else {
      setYearFilter(false);
    }
  }, [
    currentCatalogPage,
    sortType,
    brandFilter,
    modelFilter,
    vechicleTypeCheckboxes,
    cityCheckboxes,
    owners,
    color,
    seats,
    fuel,
    transmission,
    minMileageValue,
    maxMileageValue,
    minYearValue,
    maxYearValue,
    minPriceValue,
    maxPriceValue,
    searchTerm,
    selectedCurrency,
  ]);

  const fetchFirstPage = async (
    sortType: SortObj,
    brandFilter: string,
    modelFilter: string,
    vehicleType: Record<string, boolean>,
    city: Record<string, boolean>,
    owners: Record<string, boolean>,
    color: Record<string, boolean>,
    seats: Record<string, boolean>,
    fuel: Record<string, boolean>,
    transmission: Record<string, boolean>,
    minMileage: string,
    maxMileage: string,
    minYear: number,
    maxYear: number,
    minPrice: string,
    maxPrice: string,
    searchTerm: string
  ) => {
    try {
      const carsRef = collection(db, "cars");
      const firstPrompt = sortType.sort;
      let first = query(carsRef);
      const arrCarTypes = Object.keys(vehicleType).filter(
        (key) => vehicleType[key]
      );
      const arrCities = Object.keys(city).filter((key) => city[key]);
      const arrOwners = Object.keys(owners).filter((key) => owners[key]);
      const arrColor = Object.keys(color).filter((key) => color[key]);
      const arrSeats = Object.keys(seats).filter((key) => seats[key]);
      const arrFuel = Object.keys(fuel).filter((key) => fuel[key]);
      const arrTransmission = Object.keys(transmission).filter(
        (transmissionKey) => transmission[transmissionKey]
      );
      Object.entries(vehicleType).forEach(([carType, isSelected]) => {
        if (isSelected) {
          if (arrCarTypes.length > 0) {
            first = query(first, where("vehicleType", "in", arrCarTypes));
          }
        }
      });

      Object.entries(city).forEach(([city, isSelected]) => {
        if (isSelected) {
          if (arrCities.length > 0) {
            first = query(first, where("location", "in", arrCities));
          }
        }
      });

      Object.entries(owners).forEach(([owners, isSelected]) => {
        if (isSelected) {
          if (arrOwners.length > 0) {
            first = query(first, where("owners", "in", arrOwners));
          }
        }
      });

      Object.entries(color).forEach(([color, isSelected]) => {
        if (isSelected) {
          if (arrColor.length > 0) {
            first = query(first, where("color", "in", arrColor));
          }
        }
      });

      Object.entries(seats).forEach(([seats, isSelected]) => {
        if (isSelected) {
          if (arrSeats.length > 0) {
            first = query(first, where("seats", "in", arrSeats));
          }
        }
      });

      Object.entries(fuel).forEach(([fuel, isSelected]) => {
        if (isSelected) {
          if (arrFuel.length > 0) {
            first = query(first, where("fuel", "in", arrFuel));
          }
        }
      });

      Object.entries(transmission).forEach(([transmission, isSelected]) => {
        if (isSelected) {
          if (arrTransmission.length > 0) {
            first = query(first, where("transmission", "in", arrTransmission));
          }
        }
      });

      if (searchTerm) {
        const searchTermLowerCase = searchTerm.toLowerCase();

        const brandQuery = query(
          collection(db, "cars"),
          where("brand", ">=", searchTermLowerCase),
          where("brand", "<", searchTermLowerCase + "\uf8ff")
        );

        const modelQuery = query(
          collection(db, "cars"),
          where("model", ">=", searchTermLowerCase),
          where("model", "<", searchTermLowerCase + "\uf8ff")
        );

        const combinedQuery = query(
          collection(db, "cars"),
          where("brandAndModel", ">=", searchTermLowerCase),
          where("brandAndModel", "<", searchTermLowerCase + "\uf8ff")
        );

        const [brandSnapshot, modelSnapshot, combinedSnapshot] =
          await Promise.all([
            getDocs(brandQuery),
            getDocs(modelQuery),
            getDocs(combinedQuery),
          ]);

        const carsFromBrandQuery = brandSnapshot.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as Car
        );

        const carsFromModelQuery = modelSnapshot.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as Car
        );

        const carsFromCombinedQuery = combinedSnapshot.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as Car
        );

        const uniqueCars = new Map();

        [
          ...carsFromBrandQuery,
          ...carsFromModelQuery,
          ...carsFromCombinedQuery,
        ].forEach((car) => {
          uniqueCars.set(car.id, car);
        });

        const mergedCars = Array.from(uniqueCars.values());

        const paginatedCars = mergedCars.slice(
          currentCatalogPage * itemsPerPage - itemsPerPage,
          currentCatalogPage * itemsPerPage
        );

        setCars(paginatedCars);

        setTotalCars(mergedCars.length);
        setCars(paginatedCars);
        setFiltredCars(mergedCars.length);
        setLoaded(true);
      }

      if (!searchTerm) {
        if (brandFilter) {
          first = query(
            first,

            where("brand", "==", brandFilter)
          );
        }

        if (modelFilter) {
          first = query(
            first,
            where("model", "==", modelFilter.toLocaleLowerCase())
          );
        }

        first = query(
          first,
          orderBy(firstPrompt, `${sortType.desc ? "desc" : "asc"}`)
        );

        const querySnapshot = await getDocs(first);

        const cars = querySnapshot.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as Car
        );

        const minMileage = parseInt(minMileageValue.replace(/\s/g, ""), 10);
        const maxMileage = parseInt(maxMileageValue.replace(/\s/g, ""), 10);

        const filtredMileageCars = cars.filter(
          (car) => car.mileage <= maxMileage && car.mileage >= minMileage
        );
        const filtredYearCars = filtredMileageCars.filter(
          (car) => car.year <= maxYearValue && car.year >= minYearValue
        );

        const minPrice = parseInt(minPriceValue.replace(/\s/g, ""), 10);
        const maxPrice = parseInt(maxPriceValue.replace(/\s/g, ""), 10);
        const filtredPriceCars = filtredYearCars.filter(
          (car) =>
            Number(car.price) * multiplier <= maxPrice &&
            Number(car.price) * multiplier >= minPrice
        );

        if (querySnapshot.docs.length > 0) {
          setLastVisibleRefs([
            querySnapshot.docs[
              querySnapshot.docs.length - 1
            ] as QueryDocumentSnapshot<Car>,
          ]);
        }

        const paginatedCars = filtredPriceCars.slice(
          currentCatalogPage * itemsPerPage - itemsPerPage,
          currentCatalogPage * itemsPerPage
        );

        setTotalCars(filtredPriceCars.length);
        setCars(paginatedCars);
        setFiltredCars(filtredPriceCars.length);

        setLoaded(true);
      }
    } catch (error) {
      console.error("Error fetching first page: ", error);
    }
  };

  const [admin, setAdmin] = useState<boolean>(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        uid === "OpHYS3Hk8kgDKKUgCTa9gD7oJKE3" && setAdmin(true);
      }
    });
  });

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
    testImg: string;
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
    Gold: boolean;
    Purple: boolean;

    Pink: boolean;
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

  const [itemOffset, setItemOffset] = React.useState(0);

  const resetBrandFilter = () => {
    setBrandFilter("");
    setModelFilter("");
  };
  const resetModelsFilter = () => {
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
    setMinMileageValue("0");
    setMaxMileageValue("999 999");
  };
  const resetYear = () => {
    setMinYearValue(2000);
    setMaxYearValue(currentYear);
  };

  const resetPrice = () => {
    setMinPriceValue("0");
    setMaxPriceValue("99 999 999");
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
      Gold: false,
      Purple: false,

      Pink: false,
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
    resetModelsFilter();
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

  const handleBrandFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBrandFilter(event.target.value);
    setItemOffset(0);

    dispatch(setCurrentCatalogPage(1));
  };

  useEffect(() => {
    const fountedBrand = carData.brands.find(
      (item) =>
        item.name ===
        searchTerm.charAt(0).toLocaleUpperCase() + searchTerm.slice(1)
    );

    if (fountedBrand) {
      setBrandFilter(fountedBrand.name);
    }

    carData.brands.forEach((brand) => {
      const foundModel = brand.models.find(
        (model) => model.name.toLowerCase() === searchTerm.toLowerCase()
      );
      if (foundModel) {
        setBrandFilter(brand.name);
        setModelFilter(foundModel.name);
      }
    });
  }, [searchTerm]);

  const handleModelFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setModelFilter(event.target.value);
    setItemOffset(0);
    dispatch(setCurrentCatalogPage(1));
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

  const handleMinMileageChange = (value: string) => {
    setMinMileageValue(value);
  };

  const handleMaxMileageChange = (value: string) => {
    setMaxMileageValue(value);
  };

  const handleMinYearChange = (value: number) => {
    setMinYearValue(value);
  };
  const handleMaxYearChange = (value: number) => {
    setMaxYearValue(value);
  };

  const handleMinPriceChange = (value: string) => {
    setMinPriceValue(value);
  };

  const handleMaxPriceChange = (value: string) => {
    setMaxPriceValue(value);
  };

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const closeSelectedFilter = (filter: string) => {
    if (filter === "brand") {
      setBrandFilter("");
    }
    if (filter === "model") {
      setModelFilter("");
    }
    if (filter === "mileage") {
      setMinMileageValue("0");
      setMaxMileageValue("999 999");
    }

    if (filter === "price") {
      setMinPriceValue("0");
      setMaxPriceValue("99 999 999");
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

  const nextNextPage = () => {
    dispatch(setCurrentCatalogPage(currentCatalogPage + 1));
  };
  const prevPrevPage = () => {
    dispatch(setCurrentCatalogPage(currentCatalogPage - 1));
  };

  const changePage = (index: number) => {
    dispatch(setCurrentCatalogPage(index + 1));
    const catalog = document.getElementById("catalog");
    if (catalog) {
      catalog.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  return (
    <div className={style.catalog} id="catalog">
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
          resetModels={resetModelsFilter}
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
            onChangeSortBy={(selectedOption) => setSortType(selectedOption)}
            sortOption="Expensive"
            isFiltersOpen={isFiltersOpen}
            setIsFiltersOpen={setIsFiltersOpen}
            brand={brandFilter}
            model={modelFilter}
            mileage={mileageFilter}
            minYear={minYearValue}
            maxYear={maxYearValue}
            minMileage={minMileageValue}
            maxMileage={maxMileageValue}
            date={yearFilter}
            price={priceFilter}
            type={vechicleTypeCheckboxes}
            cities={cityCheckboxes}
            owners={owners}
            color={color}
            seats={seats}
            fuel={fuel}
            transmission={transmission}
            totalCars={totalCars}
            filtredCars={filtredCars}
            clearFilterArg={clearFiltersArg}
            closeSelectedFilter={(filter) => closeSelectedFilter(filter)}
          />

          <div className={style.catalogPagination}>
            {/* <SkeletonMobile key={`skeleton_${"www"}`} /> */}
            {loaded
              ? cars.map((car: any, index: any) => (
                  <BigCard
                    key={car.id}
                    id={car.id}
                    index={index}
                    brand={car.brand}
                    model={car.model}
                    price={car.price}
                    fuel={car.fuel}
                    owners={car.owners}
                    location={car.location}
                    mileage={car.mileage}
                    description={car.description}
                    previewIMG={car.previewImage[0]}
                    onClickDelete={() => console.log()}
                    onClickCheck={() => console.log()}
                  />
                ))
              : [...new Array(5)].map((_, i) =>
                  screenWidth <= 450 ? (
                    <SkeletonMobile key={`skeleton_${i}`} />
                  ) : (
                    <Skeleton key={`skeleton_${i}`} />
                  )
                )}
          </div>
          {cars.length > 0 ? (
            <div className={style.buttons}>
              <button
                onClick={prevPrevPage}
                disabled={currentCatalogPage === 1}
              >
                Previous
              </button>
              {[...new Array(pages)].map((_, index) => (
                <span
                  key={index}
                  className={
                    index + 1 == currentCatalogPage ? style.currentPage : ""
                  }
                  onClick={() => changePage(index)}
                >
                  {index + 1}
                </span>
              ))}
              <button
                onClick={nextNextPage}
                disabled={currentCatalogPage === pages}
              >
                Next
              </button>
            </div>
          ) : (
            <div className={style.noCars}>
              {" "}
              <h4>We are sorry, but we don't have a car like that here yet.</h4>
              <img src={Sorry} alt="sorry-image" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
