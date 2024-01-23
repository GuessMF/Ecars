import React from "react";
import {useState, useEffect, useRef} from "react";
import style from "./__megaCard.module.scss";
import SkeletonSmallImage from "./SkeletonSmallImage";
import SkeletonMegaImage from "./SkeletonMegaImage";
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useAppSelector} from "hooks/redux-hooks";
import {updateDoc, doc, setDoc, getDoc} from "firebase/firestore";
import {ref, listAll, getDownloadURL, getStorage} from "firebase/storage";
import {db, storage} from "../../../firebase";
import {collection} from "firebase/firestore";
import CustomSelect from "../CustomSelect/CustomSelect";
import {ReactComponent as ChangeImage} from "./changeImage.svg";

import carData from "helpers/modelsBrands";
import Edited from "./Edited";
import {button} from "components/simple/ContactUsBlock/__contactUsBlock.module.scss";
// import { updateDoc, doc } from 'firebase/firestore';

interface DateObject {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
}

interface CarModel {
  name: string;
}

interface CarBrand {
  name: string;
  models: CarModel[];
}
interface OptionType {
  value: string;
  label: string;
}
interface OtherOptions {
  value: string;
}

interface Props {
  edition: boolean;
  onChangeEdition: (value: boolean) => void;
  id: string;
  index: number;
  brand: string;
  model: string;
  type: string;
  color: string;
  interior: string;
  year: string;
  price: string;
  fuel: string;
  owners: string;
  location: string;
  mileage: number;
  description: string;
  previewIMG: string;
  transmission: string;
  engineVolume: string;
  exportStatus: string;
  wheels: string;
  seats: string;
  dateObj: DateObject;
  dateEdited: DateObject;
  special: boolean;

  onClickDelete: (id: string, carName: string) => void;
  onClickCheck: (brand: string, id: string) => void;

  // sortBy: string;
}

export default function MegaCard({
  edition,
  onChangeEdition,
  id,
  previewIMG,
  brand,
  model,
  price,
  mileage,
  owners,
  fuel,
  type,
  color,
  interior,
  year,
  transmission,
  engineVolume,
  wheels,
  seats,
  location,
  description,
  exportStatus,
  special,
  onClickDelete,
  onClickCheck,
  dateObj,
  dateEdited,
}: // sortBy,
Props) {
  const formattedMileage: string = mileage
    .toLocaleString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  const [brandAndModel, setBrandAndModel] = useState<string>("");
  const [newBrand, setNewBrand] = useState<string>(brand);
  const [newModel, setNewModel] = useState(model);
  const [modelsOptions, setModelsOptions] = useState<OptionType[]>([]);
  const [newPricee, setNewPricee] = useState<string>("");
  const [newYear, setNewYear] = useState<string>(year);
  const [newMileage, setNewMileage] = useState<string>(formattedMileage);
  const [newTransmission, setNewTransmission] = useState<string>(transmission);
  const [newFuel, setNewFuel] = useState<string>(fuel);
  const [newWheels, setNewWheels] = useState<string>(wheels);
  const [newVehicleType, setNewVehicleType] = useState<string>(type);
  const [newEngineValue, setNewEngineValue] = useState<string>(engineVolume);
  const [newSeats, setNewSeats] = useState<string>(seats);
  const [newInterior, setNewInterior] = useState<string>(interior);
  const [newColor, setNewColor] = useState<string>(color);
  const [newLocation, setNewLocation] = useState<string>(location);
  const [newOwners, setNewOwners] = useState<string>(owners);
  const [newExportStatus, setNewExportStatus] = useState<string>(exportStatus);
  const [newSpecial, setNewSpecial] = useState<boolean>(special);
  const [newDescription, setNewDescription] = useState(description);
  const [edited, setEdited] = useState<boolean>(false);

  const selectedCurrency = useAppSelector(
    (state) => state.currency.currencyTerm
  );
  const [newCurrency, setNewCurrency] = useState<string>(selectedCurrency);
  const usdValue = useAppSelector((state) => state.currValue.usdValue);
  const eurValue = useAppSelector((state) => state.currValue.eurValue);

  let multiplier: number =
    selectedCurrency === "RUB"
      ? usdValue
      : selectedCurrency === "EUR"
      ? usdValue / eurValue
      : 1;

  const newPrice = Number(price) * multiplier;
  const currentPrice = parseInt(newPrice.toFixed(0));

  const formattedPrice: string = currentPrice
    .toLocaleString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  // let formatedBrand: string;
  let formatedBrand;
  let formatedModel;

  const capitalizeWords = (brand: string) => {
    const words = brand.toLowerCase().split(" ");
    const capitalizeWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizeWords.join(" ");
  };

  if (brand) {
    formatedBrand = capitalizeWords(brand);
  }

  // useEffect(() => {
  //   formatedBrand = capitalizeWords(brand);
  // }, []);

  const [photoURLs, setPhotoURLs] = useState<string[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const loadPhotosFromFirebase = async (currentIndex?: string) => {
      setImageLoaded(false);

      const previewRef = ref(storage, `cars/${currentIndex}/preview/`);
      const folderRef = ref(storage, `cars/${currentIndex}`);

      try {
        const photoList = await listAll(folderRef);
        const previewImage = await listAll(previewRef);
        const urls = await Promise.all(
          photoList.items.map(async (photo) => {
            return await getDownloadURL(photo);
          })
        );

        const previewUrl = await Promise.all(
          previewImage.items.map(async (photo) => {
            return await getDownloadURL(photo);
          })
        );

        setPhotoURLs([...previewUrl]);
        setPhotoURLs((prev) => [...prev, ...urls]);
        setImageLoaded(true);
      } catch (error) {
        console.error("Error loading photos from Firebase:", error);
      }
    };

    const currentIndex = id; // Ваш текущий индекс
    loadPhotosFromFirebase(currentIndex);
  }, [id]);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImageLoaded(true);
    };
    image.src = photoURLs?.[selectedPhoto]; // Подставьте свой путь к изображению из carData
  }, [photoURLs]);

  const onClickLittleImage = (index: number) => {
    window.scrollTo({
      top: 220,
      behavior: "smooth",
    });

    setSelectedPhoto(index);
  };
  const onClickVisitPage = () => {
    navigate(`/details/${id}`);
  };

  const monthNames: {[key: number]: string} = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const updateCar = async () => {
    const docId = id;
    const carsRef = collection(db, "cars");
    const carDocRef = doc(carsRef, docId);

    const currentDate: Date = new Date();
    const dateEdited: DateObject = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate(),
      hours: currentDate.getHours(),
      minutes: currentDate.getMinutes(),
    };
    try {
      await updateDoc(carDocRef, {
        brand: newBrand,
        model: newModel,
        brandAndModel: `${newBrand} ${newModel}`,
        color: newColor,
        description: newDescription,
        engineCapacity: newEngineValue,
        exportStatus: newExportStatus,
        fuel: newFuel,
        interior: newInterior,
        location: newLocation,
        mileage: parseInt(newMileage.replace(/\s/g, ""), 10),
        owners: newOwners,
        price:
          newCurrency === "RUB"
            ? parseInt(newPricee.replace(/\s/g, ""), 10) / usdValue
            : newCurrency === "EUR"
            ? parseInt(newPricee.replace(/\s/g, ""), 10) / (usdValue / eurValue)
            : parseInt(newPricee.replace(/\s/g, ""), 10),
        // price: "test",
        seats: newSeats,
        special: newSpecial,
        transmission: newTransmission,
        vehicleType: newVehicleType,
        wheels: newWheels,
        year: newYear,
        dateEdited: dateEdited,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onClickEdit = () => {
    console.log("edit");
    window.scrollTo({
      top: 200,
      behavior: "smooth",
    });

    if (!edition) {
      onChangeEdition(true);
      setNewBrand(brand);
      setNewModel(model);
      setNewYear(year);
      setNewColor(color);
      setNewTransmission(transmission);
      setNewFuel(fuel);
      setNewEngineValue(engineVolume);
      setNewVehicleType(type);
      setNewInterior(interior);
      setNewWheels(wheels);
      setNewSeats(seats);
      setNewLocation(location);
      setNewExportStatus(exportStatus);
      setNewOwners(owners);
      setNewMileage(formattedMileage);
      setNewSpecial(special);
      setNewDescription(description);
      setNewPricee(formattedPrice);
    } else {
      onChangeEdition(false);
      updateCar();
      setEdited(true);
      setTimeout(() => {
        navigate(`/details/${id}`);
      }, 2000);
    }
  };

  const mapCarBrandToOptionType = (brand: CarBrand): OptionType => ({
    value: brand.name,
    label: brand.name,
  });
  const mapOthersOptions = (type: OtherOptions): OptionType => ({
    value: type.value,
    label: type.value,
  });
  const brandOptions: OptionType[] = carData.brands.map(
    mapCarBrandToOptionType
  );

  const fuelOptions: OptionType[] = carData.fuels.map(mapOthersOptions);
  const yearOptions: OptionType[] = carData.years.map(mapOthersOptions);
  const colorOptions: OptionType[] = carData.colors.map(mapOthersOptions);
  const transmissionOptions: OptionType[] =
    carData.transmissions.map(mapOthersOptions);

  const vehicleOptions: OptionType[] =
    carData.vehicleType.map(mapOthersOptions);

  const interiorOptions: OptionType[] = carData.interior.map(mapOthersOptions);
  const wheelsOptions: OptionType[] = carData.wheels.map(mapOthersOptions);
  const seatsOptions: OptionType[] = carData.seats.map(mapOthersOptions);
  const locationOptions: OptionType[] = carData.location.map(mapOthersOptions);
  const exportStatusOptions: OptionType[] =
    carData.exportStatus.map(mapOthersOptions);
  const ownersOptions: OptionType[] = carData.owners.map(mapOthersOptions);
  const engineValueOptions: OptionType[] =
    carData.engineValue.map(mapOthersOptions);
  const currencyOptions: OptionType[] = carData.currency.map(mapOthersOptions);

  const handleNewBrandChange = (brand: string) => {
    setNewBrand(brand);
    const selectedCarBrand = carData.brands.find(
      (carBrand) => carBrand.name === brand
    );

    if (selectedCarBrand) {
      const models: CarModel[] = selectedCarBrand.models;

      const options: OptionType[] = models.map((model) => ({
        value: model.name,
        label: model.name,
      }));

      setModelsOptions(options);
    }
  };
  useEffect(() => {
    const selectedCarBrand = carData.brands.find(
      (carBrand) => carBrand.name === brand
    );
    if (selectedCarBrand) {
      const models: CarModel[] = selectedCarBrand.models;

      const options: OptionType[] = models.map((model) => ({
        value: model.name,
        label: model.name,
      }));

      setModelsOptions(options);
    }

    setNewModel(model);
  }, [edition]);

  const onModelChange = (value: string) => {
    setNewModel(value);
  };
  const onYearChange = (year: string) => {
    setNewYear(year);
  };

  const onColorChange = (color: string) => {
    setNewColor(color);
  };
  const onTransmissionChange = (transmission: string) => {
    setNewTransmission(transmission);
  };

  const onFuelChange = (fuel: string) => {
    setNewFuel(fuel);
  };

  const onEngineValueChange = (engineValue: string) => {
    setNewEngineValue(engineValue);
  };

  const onVehicleTypeChange = (vehicleType: string) => {
    setNewVehicleType(vehicleType);
  };

  const onInteriorChange = (interior: string) => {
    setNewInterior(interior);
  };

  const onWheelsChange = (wheels: string) => {
    setNewWheels(wheels);
  };

  const onSeatsChange = (seats: string) => {
    setNewSeats(seats);
  };

  const onLocationChange = (location: string) => {
    setNewLocation(location);
  };

  const onExportStatusChange = (exportStatus: string) => {
    setNewExportStatus(exportStatus);
  };

  const onOwnersChange = (owners: string) => {
    setNewOwners(owners);
  };
  const formatPrice = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");
    const formattedValue = Number(cleanedValue).toLocaleString();
    setNewPricee(formattedValue);
  };
  const onCurrencyChange = (currency: string) => {
    setNewCurrency(currency);
  };

  const formatMileage = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");
    const formattedValue = Number(cleanedValue).toLocaleString();
    setNewMileage(formattedValue);
  };

  return (
    <div className={style.megaCard}>
      {edited && <Edited />}

      <div className={style.previewBigImage}>
        {imageLoaded ? (
          <LazyLoadImage
            className={style.bigImg}
            effect="blur" // Добавляет эффект размытия
            src={photoURLs?.[selectedPhoto]}
            alt="Car Preview"
          />
        ) : (
          <SkeletonMegaImage />
        )}
      </div>
      <div className={style.littleImages}>
        {imageLoaded
          ? photoURLs.map((img, index, id) => (
              <LazyLoadImage
                className={style.littleImage}
                effect="blur" // Добавляет эффект размытия
                src={img}
                alt="Car little"
                onClick={() => onClickLittleImage(index)}
              />
            ))
          : [...new Array(8)].map((_, i) => (
              <SkeletonSmallImage key={`skeleton_${i}`} />
            ))}
      </div>

      <div className={style.information}>
        <div className={style.topInformation}>
          <h3>{formatedBrand}</h3>
          <h3>{model?.toLocaleUpperCase()}</h3>
          <h3>{year}</h3>
        </div>

        <table className={style.desktopTable}>
          <tbody>
            <tr>
              <td className={style.tableTitle}>Brand</td>
              <td
              // className={formErrors.brand ? style.error : ""}
              // ref={brandRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newBrand}
                    onChange={handleNewBrandChange}
                    options={brandOptions}
                  />
                ) : (
                  <span>{formatedBrand}</span>
                )}
              </td>

              <td className={style.tableTitle}>Interior</td>
              <td
              // className={formErrors.interior ? style.error : ""}
              // ref={brandRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newInterior}
                    onChange={onInteriorChange}
                    options={interiorOptions}
                  />
                ) : (
                  <span>{interior}</span>
                )}
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Model</td>
              <td
              // className={formErrors.model ? style.error : ""}
              // ref={modelRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newModel}
                    onChange={onModelChange}
                    options={modelsOptions}
                  />
                ) : (
                  <span>{model.toLocaleUpperCase()}</span>
                )}
              </td>

              <td className={style.tableTitle}>Wheels</td>
              <td
              // className={formErrors.wheels ? style.error : ""}
              // ref={wheelsRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newWheels}
                    onChange={onWheelsChange}
                    options={wheelsOptions}
                  />
                ) : (
                  <span>{wheels}</span>
                )}
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Year</td>
              <td
              // className={formErrors.year ? style.error : ""} ref={yearRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newYear}
                    onChange={onYearChange}
                    options={yearOptions}
                  />
                ) : (
                  <span>{year}</span>
                )}
              </td>
              <td className={style.tableTitle}>Seats</td>
              <td
              // className={formErrors.seats ? style.error : ""}
              // ref={seatsRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newSeats}
                    onChange={onSeatsChange}
                    options={seatsOptions}
                  />
                ) : (
                  <span>{seats}</span>
                )}
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Color</td>
              <td
              // className={formErrors.color ? style.error : ""}
              // ref={colorRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newColor}
                    onChange={onColorChange}
                    options={colorOptions}
                  />
                ) : (
                  <span>{color}</span>
                )}
              </td>

              <td className={style.tableTitle}>Location</td>
              <td
              // className={formErrors.location ? style.error : ""}
              // ref={locationRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newLocation}
                    onChange={onLocationChange}
                    options={locationOptions}
                  />
                ) : (
                  <span>{location}</span>
                )}
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Transmission</td>
              <td
              // className={formErrors.transmission ? style.error : ""}
              // ref={transmissionRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newTransmission}
                    onChange={onTransmissionChange}
                    options={transmissionOptions}
                  />
                ) : (
                  <span>{transmission}</span>
                )}
              </td>

              <td className={style.tableTitle}>Export</td>
              <td
              // className={formErrors.exportStatus ? style.error : ""}
              // ref={exportStatusRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newExportStatus}
                    onChange={onExportStatusChange}
                    options={exportStatusOptions}
                  />
                ) : (
                  <span>{exportStatus}</span>
                )}
              </td>
            </tr>

            <tr>
              <td className={style.tableTitle}>Fuel</td>
              <td
              // className={formErrors.fuel ? style.error : ""} ref={fuelRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newFuel}
                    onChange={onFuelChange}
                    options={fuelOptions}
                  />
                ) : (
                  <span>{fuel}</span>
                )}
              </td>

              <td className={style.tableTitle}>Owners</td>
              <td
              // className={formErrors.owners ? style.error : ""}
              // ref={ownersRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newOwners}
                    onChange={onOwnersChange}
                    options={ownersOptions}
                  />
                ) : (
                  <span>{owners}</span>
                )}
              </td>
            </tr>

            <tr>
              <td className={style.tableTitle}>Engine value</td>
              <td
              // className={formErrors.engineValue ? style.error : ""}
              // ref={engineValueRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newEngineValue}
                    onChange={onEngineValueChange}
                    options={engineValueOptions}
                  />
                ) : (
                  <span>{engineVolume} L</span>
                )}
              </td>

              <td className={style.tableTitle}>Mileage</td>
              <td
              // className={formErrors.mileage ? style.error : ""}
              // ref={mileageRef}
              >
                {edition ? (
                  <input
                    type="text"
                    placeholder="Min"
                    min="1"
                    // max="999999"
                    maxLength={7}
                    value={newMileage}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      formatMileage(e.target.value);
                    }}
                  />
                ) : (
                  <span>{formattedMileage} Км</span>
                )}
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Vehicle Type</td>
              <td
              // className={formErrors.vehicleType ? style.error : ""}
              // ref={vehicleTypeRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newVehicleType}
                    onChange={onVehicleTypeChange}
                    options={vehicleOptions}
                  />
                ) : (
                  <span>{type}</span>
                )}
              </td>

              <td className={style.tableTitle}>Special</td>
              <td
              // className={formErrors.special ? style.error : ""}
              >
                {edition ? (
                  <input
                    type="checkbox"
                    checked={newSpecial}
                    // value={newSpecial}
                    onChange={(e) => setNewSpecial(e.target.checked)}
                  />
                ) : (
                  <span>{special ? "Yes" : "No"}</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <table className={style.mobileTable}>
          <tbody>
            <tr>
              <td className={style.tableTitle}>Brand</td>
              <td
              // className={formErrors.brand ? style.error : ""}
              // ref={brandRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newBrand}
                    onChange={handleNewBrandChange}
                    options={brandOptions}
                  />
                ) : (
                  <span>{formatedBrand}</span>
                )}
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Model</td>
              <td
              // className={formErrors.model ? style.error : ""}
              // ref={modelRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newModel}
                    onChange={onModelChange}
                    options={modelsOptions}
                  />
                ) : (
                  <span>{model.toLocaleUpperCase()}</span>
                )}
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Year</td>
              <td
              //  className={formErrors.year ? style.error : ""}
              //   ref={yearRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newYear}
                    onChange={onYearChange}
                    options={yearOptions}
                  />
                ) : (
                  <span>{year}</span>
                )}
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Color</td>
              <td
              // className={formErrors.color ? style.error : ""}
              // ref={colorRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newColor}
                    onChange={onColorChange}
                    options={colorOptions}
                  />
                ) : (
                  <span>{color}</span>
                )}
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Transmission</td>
              <td
              // className={formErrors.transmission ? style.error : ""}
              // ref={transmissionRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newTransmission}
                    onChange={onTransmissionChange}
                    options={transmissionOptions}
                  />
                ) : (
                  <span>{transmission}</span>
                )}
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Fuel</td>
              <td
              //  className={formErrors.fuel ? style.error : ""}
              //   ref={fuelRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newFuel}
                    onChange={onFuelChange}
                    options={fuelOptions}
                  />
                ) : (
                  <span>{fuel}</span>
                )}
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Engine value</td>
              <td
              // className={formErrors.engineValue ? style.error : ""}
              // ref={engineValueRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newEngineValue}
                    onChange={onEngineValueChange}
                    options={engineValueOptions}
                  />
                ) : (
                  <span>{engineVolume} L</span>
                )}
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Vehicle Type</td>
              <td
              // className={formErrors.vehicleType ? style.error : ""}
              // ref={vehicleTypeRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newVehicleType}
                    onChange={onVehicleTypeChange}
                    options={vehicleOptions}
                  />
                ) : (
                  <span>{type}</span>
                )}
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Interior</td>
              <td
              // className={formErrors.interior ? style.error : ""}
              // ref={brandRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newInterior}
                    onChange={onInteriorChange}
                    options={interiorOptions}
                  />
                ) : (
                  <span>{interior}</span>
                )}
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Wheels</td>
              <td
              // className={formErrors.wheels ? style.error : ""}
              // ref={wheelsRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newWheels}
                    onChange={onWheelsChange}
                    options={wheelsOptions}
                  />
                ) : (
                  <span>{wheels}</span>
                )}
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Seats</td>
              <td
              // className={formErrors.seats ? style.error : ""}
              // ref={seatsRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newSeats}
                    onChange={onSeatsChange}
                    options={seatsOptions}
                  />
                ) : (
                  <span>{seats}</span>
                )}
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Location</td>
              <td
              // className={formErrors.location ? style.error : ""}
              // ref={locationRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newLocation}
                    onChange={onLocationChange}
                    options={locationOptions}
                  />
                ) : (
                  <span>{location}</span>
                )}
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Export</td>
              <td
              // className={formErrors.exportStatus ? style.error : ""}
              // ref={exportStatusRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newExportStatus}
                    onChange={onExportStatusChange}
                    options={exportStatusOptions}
                  />
                ) : (
                  <span>{exportStatus}</span>
                )}
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Owners</td>
              <td
              // className={formErrors.owners ? style.error : ""}
              // ref={ownersRef}
              >
                {edition ? (
                  <CustomSelect
                    value={newOwners}
                    onChange={onOwnersChange}
                    options={ownersOptions}
                  />
                ) : (
                  <span>{owners}</span>
                )}
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Mileage</td>
              <td
              // className={formErrors.mileage ? style.error : ""}
              // ref={mileageRef}
              >
                {edition ? (
                  <input
                    type="text"
                    placeholder="Min"
                    min="1"
                    // max="999999"
                    maxLength={7}
                    value={newMileage}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      formatMileage(e.target.value);
                    }}
                  />
                ) : (
                  <span>{formattedMileage} Км</span>
                )}
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Special</td>
              <td
              // className={formErrors.special ? style.error : ""}
              >
                {edition ? (
                  <input
                    type="checkbox"
                    checked={newSpecial}
                    // value={newSpecial}
                    onChange={(e) => setNewSpecial(e.target.checked)}
                  />
                ) : (
                  <span>{special ? "Yes" : "No"}</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>

        <div
          // className={formErrors.description ? style.error : style.description}
          className={style.description}
          // ref={descriptionRef}
        >
          <h4>Description:</h4>
          <div
            // className={
            //   formErrors.description
            //     ? `${style.descriptionBox} ${style.error}`
            //     : style.descriptionBox
            // }
            //  ref={descriptionRef}
            className={style.descriptionBox}
          >
            {edition ? (
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                //onChange={(e) => setNewDescription(e.target.value)}
              />
            ) : (
              <span>{newDescription}</span>
            )}
          </div>
        </div>

        {/* <div className={style.description}>
          <h6>Description:</h6>
          <span> {description}</span>
        </div> */}
        <div className={style.added}>
          <h6>Added:</h6>
          <span>
            {dateObj?.day} {dateObj && monthNames[dateObj?.month]},{" "}
            {dateObj?.year} {dateObj?.hours}:{dateObj?.minutes}
          </span>
        </div>

        {dateEdited && (
          <div className={style.added}>
            <h6>Last edited:</h6>
            <span>
              {dateEdited?.day} {dateEdited && monthNames[dateEdited?.month]},{" "}
              {dateEdited?.year} {dateEdited?.hours}:{dateEdited?.minutes}
            </span>
          </div>
        )}

        {edition ? (
          <div className={style.priceBox}>
            <CustomSelect
              // value={currencyOptions[0]}
              value={newCurrency}
              onChange={onCurrencyChange}
              options={currencyOptions}
            />
            <input
              type="text"
              placeholder="Min"
              min="1"
              className={style.price}
              // max="999999"
              maxLength={newCurrency === "RUB" ? 11 : 10}
              value={newPricee}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formatPrice(e.target.value);
              }}
            />
          </div>
        ) : (
          <span className={style.price}>
            {selectedCurrency === "RUB"
              ? `₽ `
              : selectedCurrency === "USD"
              ? "$ "
              : selectedCurrency === "EUR"
              ? "€ "
              : ""}
            {formattedPrice}
          </span>
        )}

        <div className={style.buttons}>
          {!edition && (
            <button className={style.visit} onClick={onClickVisitPage}>
              Visit page
            </button>
          )}

          <button className={style.edit} onClick={onClickEdit}>
            {edition ? "Confirm" : "Edit"}
          </button>
          {!edition && (
            <button
              className={style.delete}
              onClick={() => onClickCheck(brand, id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
