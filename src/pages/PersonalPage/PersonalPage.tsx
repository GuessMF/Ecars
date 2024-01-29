import React, {useRef, useEffect, useState} from "react";
import style from "../PersonalPage/__personalPage.module.scss";
import {v4 as uuidv4} from "uuid";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import carData from "../../helpers/modelsBrands";

import PopUpError from "pages/PersonalPage/PopUpError";
import PopUpSent from "pages/PersonalPage/PopUpSent";
import {Rings} from "react-loader-spinner";
import {useNavigate} from "react-router-dom";
import {collection} from "firebase/firestore";
import {db} from "../../firebase";
import {doc, setDoc} from "firebase/firestore";
import Cookies from "universal-cookie";
import {useAppSelector} from "hooks/redux-hooks";
import CustomSelect from "components/smart/CustomSelect/CustomSelect";

import {ReactComponent as PlusIcon} from "./plusIcon.svg";
import {ReactComponent as ChangeImage} from "./changeImage.svg";
import {ReactComponent as DeleteIcon} from "./deleteIcon.svg";
import {useAuth} from "hooks/use-auth";

interface Props {
  userID: string;
}

interface CarModel {
  name: string;
}

interface CarBrand {
  name: string;
  models: CarModel[];
}
interface OtherOptions {
  value: string;
}

interface Errors {
  brand?: string;
  model?: string;
  selectedFiles?: string;
  selectedPreview?: string;
  price?: string;
  year?: string;
  mileage?: string;
  transmission?: string;
  fuel?: string;
  wheels?: string;
  vehicleType?: string;
  engineValue?: string;
  seats?: string;
  interior?: string;
  color?: string;
  location?: string;
  owners?: string;
  exportStatus?: string;
  description?: string;
  priceCurrency?: string;
}

type DateObject = {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
};

interface OptionType {
  value: string;
  label: string;
}

interface Refs {
  [key: string]: React.RefObject<HTMLDivElement>;
}
export default function PersonalPage({userID}: Props) {
  const {email, displayName} = useAuth();

  const usdValue = useAppSelector((state) => state.currValue.usdValue);
  const eurValue = useAppSelector((state) => state.currValue.eurValue);

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [firstClick, setFirstClick] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedPreview, setSelectedPreview] = useState<File[]>([]);
  const [currency, setCurrency] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [modelsOptions, setModelsOptions] = useState<OptionType[]>([]);
  const [brandAndModel, setBrandAndModel] = useState<string>("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [mileage, setMileage] = useState<string>("");
  const [transmission, setTransmission] = useState<string>("");
  const [fuel, setFuel] = useState<string>("");
  const [wheels, setWheels] = useState<string>("");
  const [vehicleType, setVehicleType] = useState<string>("");
  const [engineValue, setEngineValue] = useState<string>("");
  const [seats, setSeats] = useState<string>("");
  const [interior, setInterior] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [owners, setOwners] = useState<string>("");
  const [exportStatus, setExportStatus] = useState<string>("");
  const [description, setDescription] = useState("");
  const [fisrtCarPhoto, setFirstCarPhoto] = useState<string>();
  const [specialOffer, setSpecialOffer] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<Errors>({});
  const [popUpErrors, setPopUpErrors] = useState<boolean>(false);

  const [loadingPhoto, setLoadingPhoto] = useState<boolean>(false);

  const errors: Errors = {};

  const previewPicker = useRef<HTMLInputElement>(null);
  const photosPicker = useRef<HTMLInputElement>(null);

  const selectedFilesRef = useRef<HTMLDivElement>(null);
  const selectedPreviewRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLTableCellElement>(null);
  const modelRef = useRef<HTMLTableCellElement>(null);
  const vehicleTypeRef = useRef<HTMLTableCellElement>(null);
  const fuelRef = useRef<HTMLTableCellElement>(null);
  const engineValueRef = useRef<HTMLTableCellElement>(null);
  const colorRef = useRef<HTMLTableCellElement>(null);
  const interiorRef = useRef<HTMLTableCellElement>(null);
  const transmissionRef = useRef<HTMLTableCellElement>(null);
  const wheelsRef = useRef<HTMLTableCellElement>(null);
  const seatsRef = useRef<HTMLTableCellElement>(null);
  const locationRef = useRef<HTMLTableCellElement>(null);
  const ownersRef = useRef<HTMLTableCellElement>(null);
  const exportStatusRef = useRef<HTMLTableCellElement>(null);
  const yearRef = useRef<HTMLTableCellElement>(null);
  const mileageRef = useRef<HTMLTableCellElement>(null);
  const priceRef = useRef<HTMLTableCellElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const priceCurrencyRef = useRef<HTMLDivElement>(null);

  const refs: Refs = {
    selectedFiles: selectedFilesRef,
    selectedPreview: selectedPreviewRef,
    brand: brandRef,
    model: modelRef,
    vehicleType: vehicleTypeRef,
    fuel: fuelRef,
    engineValue: engineValueRef,
    color: colorRef,
    interior: interiorRef,
    transmission: transmissionRef,
    wheels: wheelsRef,
    seats: seatsRef,
    location: locationRef,
    owners: ownersRef,
    exportStatus: exportStatusRef,
    year: yearRef,
    mileage: mileageRef,
    price: priceRef,
    description: descriptionRef,
    priceCurrency: priceCurrencyRef,
  };
  const storage = getStorage();
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const userMobile = useAppSelector((state) => state.user.mobile);
  const cookies = new Cookies(null, {path: "/"});
  useEffect(() => {
    if (!cookies.get("auth")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    setBrandAndModel(
      `${brand.toLocaleLowerCase()} ${model.toLocaleLowerCase()}`
    );
  }, [model]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    if (files.length > 20) {
      alert("Меньше 20 нужно");
      return;
    } else {
      setLoadingPhoto(true);
      const compressedFiles: File[] = [];
      const images: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = async () => {
          if (reader.result) {
            const image = new Image();
            image.src = reader.result as string;

            image.onload = async () => {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              if (!ctx) return;
              canvas.width = image.width;
              canvas.height = image.height;
              ctx.drawImage(image, 0, 0);

              const compressedDataURL = canvas.toDataURL("image/webp", 0.7);

              const blob = await fetch(compressedDataURL).then((res) =>
                res.blob()
              );

              const compressedFile = new File([blob], `${i + 1}.webp`, {
                type: "image/webp",
                lastModified: Date.now(),
              });

              compressedFiles.push(compressedFile);
              images.push(compressedDataURL);

              if (compressedFiles.length === files.length) {
                setSelectedFiles(compressedFiles);
                setPreviewImages(images);
                setLoadingPhoto(false);
              }
            };
          }
        };

        reader.readAsDataURL(file);
      }
    }
  };

  const handlePreviewChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;
    setLoadingPhoto(true);
    const compressedFiles: File[] = [];
    const images: string[] = [];

    const file = files[0];
    const reader = new FileReader();

    reader.onload = async () => {
      if (reader.result) {
        const image = new Image();
        image.src = reader.result as string;

        image.onload = async () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);

          const compressedDataURL = canvas.toDataURL("image/webp", 0.7);

          const blob = await fetch(compressedDataURL).then((res) => res.blob());

          const compressedFile = new File([blob], `0.webp`, {
            type: "image/webp",
            lastModified: Date.now(),
          });

          compressedFiles.push(compressedFile);
          images.push(compressedDataURL);

          if (compressedFiles.length === files.length) {
            setFirstCarPhoto(images[0]);
            setSelectedPreview(compressedFiles);
            setLoadingPhoto(false);
          }
        };
      }
    };

    reader.readAsDataURL(file);
  };
  const generateNewId = (): string => {
    return uuidv4();
  };

  const checkErrors = () => {
    if (selectedPreview.length < 1) {
      errors.selectedPreview = "Должно быть добавлено хотя бы 1 фото";
    }

    if (selectedFiles.length < 1) {
      errors.selectedFiles = "Должно быть добавлено хотя бы 1 фото";
    }

    if (!brand) {
      errors.brand = "Поле Марка обязательно для заполнения";
    }

    if (!model) {
      errors.model = "Поле Модель должна быть заполнена";
    }
    if (!vehicleType) {
      errors.vehicleType = "Поле Тип кузова должна быть заполнена";
    }

    if (!fuel) {
      errors.fuel = "Поле модель должна быть заполнена";
    }
    if (!engineValue) {
      errors.engineValue = "Поле модель должна быть заполнена";
    }
    if (!color) {
      errors.color = "Поле модель должна быть заполнена";
    }
    if (!interior) {
      errors.interior = "Поле модель должна быть заполнена";
    }

    if (!transmission) {
      errors.transmission = "Поле модель должна быть заполнена";
    }
    if (!wheels) {
      errors.wheels = "Поле модель должна быть заполнена";
    }
    if (!seats) {
      errors.seats = "Поле модель должна быть заполнена";
    }
    if (!location) {
      errors.location = "Поле модель должна быть заполнена";
    }
    if (!owners) {
      errors.owners = "Поле модель должна быть заполнена";
    }
    if (!exportStatus) {
      errors.exportStatus = "Поле модель должна быть заполнена";
    }
    if (!year) {
      errors.year = "Поле модель должна быть заполнена";
    }
    if (!mileage) {
      errors.mileage = "Поле модель должна быть заполнена";
    }
    if (!price) {
      errors.price = "Поле модель должна быть заполнена";
    }
    if (!description) {
      errors.description = "Поле модель должна быть заполнена";
    }
    if (!currency) {
      errors.priceCurrency = "выберите валюту";
    }
  };
  useEffect(() => {
    const newPrice =
      currency === "RUB"
        ? Number(price) / usdValue
        : currency === "EUR"
        ? Number(price) / (usdValue / eurValue)
        : Number(price);
  }, [price]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFirstClick(true);
    checkErrors();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setPopUpErrors(true);
    } else {
      setLoading(true);
      const newId = generateNewId();
      const currentDate: Date = new Date();
      const dateObj: DateObject = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        day: currentDate.getDate(),
        hours: currentDate.getHours(),
        minutes: currentDate.getMinutes(),
      };

      const previewUploadTasks = selectedPreview.map((file) => {
        const storageForPreview = ref(
          storage,
          `cars/${newId}/preview/${file.name}`
        );
        return uploadBytes(storageForPreview, file).then(() =>
          getDownloadURL(storageForPreview)
        );
      });

      const filesUploadTasks = selectedFiles.map((file) => {
        const storageRef = ref(storage, `cars/${newId}/${file.name}`);
        return uploadBytes(storageRef, file).then(() =>
          getDownloadURL(storageRef)
        );
      });

      setBrandAndModel(`${brand} ${model}`);

      const previewImg = await Promise.all(previewUploadTasks);
      const imageUrls = await Promise.all(filesUploadTasks);

      const carsRef = collection(db, "cars");
      const newIndex = uuidv4();
      try {
        await setDoc(doc(carsRef, newId), {
          index: newIndex,
          id: newId,
          userId: userID,
          userName: displayName,
          userEmail: email,
          userMobile: userMobile,
          dateAdded: currentDate,
          brand: brand.toLocaleLowerCase(),
          model: model.toLocaleLowerCase(),
          brandAndModel: brandAndModel,

          price:
            currency === "RUB"
              ? parseInt(price.replace(/\s/g, ""), 10) / usdValue
              : currency === "EUR"
              ? parseInt(price.replace(/\s/g, ""), 10) / (usdValue / eurValue)
              : parseInt(price.replace(/\s/g, ""), 10),
          year: year,
          mileage: parseInt(mileage.replace(/\s/g, ""), 10),
          transmission: transmission,
          fuel: fuel,
          wheels: wheels,
          vehicleType: vehicleType,
          engineCapacity: engineValue,
          seats: seats,
          owners: owners,
          color: color,
          interior: interior,
          location: location,
          exportStatus: exportStatus,
          description: description,
          dateObj: dateObj,
          previewImage: previewImg,
          imageUrls: imageUrls,
          special: specialOffer,
        });

        setSent(true);
        setLoading(false);
        setTimeout(() => {
          setSent(false);
          navigate(`/details/${newId}`);
        }, 1500);
      } catch (error) {
        console.error("Error adding documents: ", error);
      }
    }
  };

  const hasErrors = Object.keys(formErrors);

  const handleAgreeClick = () => {
    const scrollTopOffset = 150;
    setPopUpErrors(false);
    const fieldName = hasErrors[0];
    const fieldRef = refs[fieldName];

    if (fieldRef && fieldRef.current !== null) {
      const topOffset =
        fieldRef.current.getBoundingClientRect().top +
        window.scrollY -
        scrollTopOffset;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    } else {
      setPopUpErrors(true);
    }
  };

  const pickPreview = () => {
    previewPicker.current?.click();
  };

  const pickPhotos = () => {
    photosPicker.current?.click();
  };

  const rechangePreview = () => {
    setSelectedPreview([]);

    previewPicker.current?.click();
  };

  const deleteAddedPhoto = (index: number) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });

    setPreviewImages((prevImages) => {
      const updatedPreviews = [...prevImages];
      updatedPreviews.splice(index, 1);
      return updatedPreviews;
    });
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
    setBrand(brand);
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

  const formatMileage = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");
    const formattedValue = Number(cleanedValue).toLocaleString();
    setMileage(formattedValue);
  };

  const formatPrice = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");
    const formattedValue = Number(cleanedValue).toLocaleString();
    setPrice(formattedValue);
  };

  const onModelChange = (value: string) => {
    setModel(value);
  };
  const onYearChange = (year: string) => {
    setYear(year);
  };

  const onColorChange = (color: string) => {
    setColor(color);
  };
  const onTransmissionChange = (transmission: string) => {
    setTransmission(transmission);
  };

  const onFuelChange = (fuel: string) => {
    setFuel(fuel);
  };

  const onEngineValueChange = (engineValue: string) => {
    setEngineValue(engineValue);
  };

  const onVehicleTypeChange = (vehicleType: string) => {
    setVehicleType(vehicleType);
  };

  const onInteriorChange = (interior: string) => {
    setInterior(interior);
  };

  const onWheelsChange = (wheels: string) => {
    setWheels(wheels);
  };

  const onSeatsChange = (seats: string) => {
    setSeats(seats);
  };

  const onLocationChange = (location: string) => {
    setLocation(location);
  };

  const onExportStatusChange = (exportStatus: string) => {
    setExportStatus(exportStatus);
  };

  const onOwnersChange = (owners: string) => {
    setOwners(owners);
  };
  const onCurrencyChange = (currency: string) => {
    setCurrency(currency);
  };

  useEffect(() => {
    if (firstClick) {
      checkErrors();
      setFormErrors(errors);
    }
  }, [
    selectedPreview,
    selectedFiles,
    brand,
    model,
    year,
    color,
    transmission,
    fuel,
    engineValue,
    vehicleType,
    interior,
    wheels,
    seats,
    location,
    exportStatus,
    owners,
    mileage,
    description,
    price,
    currency,
  ]);

  return (
    <div className={style.personalPage}>
      <div className={style.header}>
        <h1>Sell your car</h1>
        <p>
          {userID &&
            (displayName
              ? displayName.charAt(0).toLocaleUpperCase() + displayName.slice(1)
              : userMobile)}
          , here you can fill in the card of the car you are going to sell.
        </p>
      </div>

      {popUpErrors ? <PopUpError closePopUp={handleAgreeClick} /> : null}
      <PopUpSent sent={sent} />

      <div id="form" className={style.form}>
        <div
          className={
            formErrors.selectedPreview
              ? `${style.preview} ${style.error}`
              : style.preview
          }
          ref={selectedPreviewRef}
        >
          <label>
            {selectedPreview.length < 1 ? (
              <div className={style.carPreview}>
                <h3>Car preview</h3>
                {loadingPhoto ? (
                  <Rings
                    height="80"
                    width="500"
                    color="#4fa94d"
                    wrapperClass={style.loader}
                    visible={true}
                  />
                ) : (
                  <div>
                    {" "}
                    <button onClick={pickPreview}>
                      <PlusIcon />
                    </button>
                    <input
                      className={style.hidden}
                      ref={previewPicker}
                      type="file"
                      accept="image/*"
                      onChange={handlePreviewChange}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className={style.preview__photo}>
                {fisrtCarPhoto && (
                  <img src={fisrtCarPhoto} alt={`preview-${fisrtCarPhoto}`} />
                )}
              </div>
            )}
          </label>

          {selectedPreview.length > 0 && (
            <button
              onClick={rechangePreview}
              className={style.rechangePreviewBtn}
            >
              <ChangeImage />
            </button>
          )}
        </div>

        <div
          className={
            formErrors.selectedFiles
              ? `${style.photos} ${style.error}`
              : style.photos
          }
          ref={selectedFilesRef}
        >
          {selectedFiles.length < 1 && (
            <label>
              <h3>Сar photos</h3>
              {loadingPhoto ? (
                <Rings
                  height="80"
                  width="500"
                  color="#4fa94d"
                  wrapperClass={style.loader}
                  visible={true}
                />
              ) : (
                <button onClick={pickPhotos} className={style.addPhotos}>
                  <PlusIcon />
                </button>
              )}

              <input
                className={style.hidden}
                ref={photosPicker}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
            </label>
          )}

          {selectedFiles.length > 0 && (
            <div className={style.preview__photos}>
              {previewImages.map((preview, index) => (
                <div
                  className={style.previewPhoto}
                  key={`previewbox indexx ${index}`}
                >
                  <button
                    className={style.deletePhoto}
                    onClick={() => deleteAddedPhoto(index)}
                  >
                    <DeleteIcon />
                  </button>
                  <img
                    key={`little prev ${index}`}
                    src={preview}
                    alt={`preview-${index}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <table className={style.desktopTable}>
          <tbody>
            <tr>
              <td className={style.tableTitle}>Brand</td>
              <td
                className={formErrors.brand ? style.error : ""}
                ref={brandRef}
              >
                <CustomSelect
                  key={`brand-${brand}`}
                  value={brand}
                  onChange={handleNewBrandChange}
                  options={brandOptions}
                />
              </td>

              <td className={style.tableTitle}>Interior</td>
              <td
                className={formErrors.interior ? style.error : ""}
                ref={brandRef}
              >
                <CustomSelect
                  value={interior}
                  onChange={onInteriorChange}
                  options={interiorOptions}
                />
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Model</td>
              <td
                className={formErrors.model ? style.error : ""}
                ref={modelRef}
              >
                <CustomSelect
                  value={model}
                  onChange={onModelChange}
                  options={modelsOptions}
                />
              </td>

              <td className={style.tableTitle}>Wheels</td>
              <td
                className={formErrors.wheels ? style.error : ""}
                ref={wheelsRef}
              >
                <CustomSelect
                  value={wheels}
                  onChange={onWheelsChange}
                  options={wheelsOptions}
                />
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Year</td>
              <td className={formErrors.year ? style.error : ""} ref={yearRef}>
                <CustomSelect
                  value={year}
                  onChange={onYearChange}
                  options={yearOptions}
                />
              </td>
              <td className={style.tableTitle}>Seats</td>
              <td
                className={formErrors.seats ? style.error : ""}
                ref={seatsRef}
              >
                <CustomSelect
                  value={seats}
                  onChange={onSeatsChange}
                  options={seatsOptions}
                />
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Color</td>
              <td
                className={formErrors.color ? style.error : ""}
                ref={colorRef}
              >
                <CustomSelect
                  value={color}
                  onChange={onColorChange}
                  options={colorOptions}
                />
              </td>

              <td className={style.tableTitle}>Location</td>
              <td
                className={formErrors.location ? style.error : ""}
                ref={locationRef}
              >
                <CustomSelect
                  value={location}
                  onChange={onLocationChange}
                  options={locationOptions}
                />
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Transmission</td>
              <td
                className={formErrors.transmission ? style.error : ""}
                ref={transmissionRef}
              >
                <CustomSelect
                  value={transmission}
                  onChange={onTransmissionChange}
                  options={transmissionOptions}
                />
              </td>

              <td className={style.tableTitle}>Export</td>
              <td
                className={formErrors.exportStatus ? style.error : ""}
                ref={exportStatusRef}
              >
                <CustomSelect
                  value={exportStatus}
                  onChange={onExportStatusChange}
                  options={exportStatusOptions}
                />
              </td>
            </tr>

            <tr>
              <td className={style.tableTitle}>Fuel</td>
              <td className={formErrors.fuel ? style.error : ""} ref={fuelRef}>
                <CustomSelect
                  value={fuel}
                  onChange={onFuelChange}
                  options={fuelOptions}
                />
              </td>

              <td className={style.tableTitle}>Owners</td>
              <td
                className={formErrors.owners ? style.error : ""}
                ref={ownersRef}
              >
                <CustomSelect
                  value={owners}
                  onChange={onOwnersChange}
                  options={ownersOptions}
                />
              </td>
            </tr>

            <tr>
              <td className={style.tableTitle}>Engine value</td>
              <td
                className={formErrors.engineValue ? style.error : ""}
                ref={engineValueRef}
              >
                <CustomSelect
                  value={engineValue}
                  onChange={onEngineValueChange}
                  options={engineValueOptions}
                />
              </td>

              <td className={style.tableTitle}>Mileage</td>
              <td
                className={formErrors.mileage ? style.error : ""}
                ref={mileageRef}
              >
                <input
                  type="text"
                  placeholder="Enter mileage"
                  min="1"
                  maxLength={7}
                  value={mileage}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    formatMileage(e.target.value);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Vehicle Type</td>
              <td
                className={formErrors.vehicleType ? style.error : ""}
                ref={vehicleTypeRef}
              >
                <CustomSelect
                  value={vehicleType}
                  onChange={onVehicleTypeChange}
                  options={vehicleOptions}
                />
              </td>

              <td className={style.tableTitle}>Special</td>
              <td>
                <input
                  className={style.checkBox}
                  type="checkbox"
                  checked={specialOffer}
                  onChange={(e) => setSpecialOffer(e.target.checked)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <table className={style.mobileTable}>
          <tbody>
            <tr>
              <td className={style.tableTitle}>Brand</td>
              <td
                className={formErrors.brand ? style.error : ""}
                ref={brandRef}
              >
                <CustomSelect
                  key={`brand-${brand}`}
                  value={brand}
                  onChange={handleNewBrandChange}
                  options={brandOptions}
                />
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Model</td>
              <td
                className={formErrors.model ? style.error : ""}
                ref={modelRef}
              >
                <CustomSelect
                  value={model}
                  onChange={onModelChange}
                  options={modelsOptions}
                />
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Year</td>
              <td className={formErrors.year ? style.error : ""} ref={yearRef}>
                <CustomSelect
                  value={year}
                  onChange={onYearChange}
                  options={yearOptions}
                />
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Color</td>
              <td
                className={formErrors.color ? style.error : ""}
                ref={colorRef}
              >
                <CustomSelect
                  value={color}
                  onChange={onColorChange}
                  options={colorOptions}
                />
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Transmission</td>
              <td
                className={formErrors.transmission ? style.error : ""}
                ref={transmissionRef}
              >
                <CustomSelect
                  value={transmission}
                  onChange={onTransmissionChange}
                  options={transmissionOptions}
                />
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Fuel</td>
              <td className={formErrors.fuel ? style.error : ""} ref={fuelRef}>
                <CustomSelect
                  value={fuel}
                  onChange={onFuelChange}
                  options={fuelOptions}
                />
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Engine value</td>
              <td
                className={formErrors.engineValue ? style.error : ""}
                ref={engineValueRef}
              >
                <CustomSelect
                  value={engineValue}
                  onChange={onEngineValueChange}
                  options={engineValueOptions}
                />
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Vehicle Type</td>
              <td
                className={formErrors.vehicleType ? style.error : ""}
                ref={vehicleTypeRef}
              >
                <CustomSelect
                  value={vehicleType}
                  onChange={onVehicleTypeChange}
                  options={vehicleOptions}
                />
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Interior</td>
              <td
                className={formErrors.interior ? style.error : ""}
                ref={brandRef}
              >
                <CustomSelect
                  value={interior}
                  onChange={onInteriorChange}
                  options={interiorOptions}
                />
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Wheels</td>
              <td
                className={formErrors.wheels ? style.error : ""}
                ref={wheelsRef}
              >
                <CustomSelect
                  value={wheels}
                  onChange={onWheelsChange}
                  options={wheelsOptions}
                />
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Seats</td>
              <td
                className={formErrors.seats ? style.error : ""}
                ref={seatsRef}
              >
                <CustomSelect
                  value={seats}
                  onChange={onSeatsChange}
                  options={seatsOptions}
                />
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Location</td>
              <td
                className={formErrors.location ? style.error : ""}
                ref={locationRef}
              >
                <CustomSelect
                  value={location}
                  onChange={onLocationChange}
                  options={locationOptions}
                />
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Export</td>
              <td
                className={formErrors.exportStatus ? style.error : ""}
                ref={exportStatusRef}
              >
                <CustomSelect
                  value={exportStatus}
                  onChange={onExportStatusChange}
                  options={exportStatusOptions}
                />
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Owners</td>
              <td
                className={formErrors.owners ? style.error : ""}
                ref={ownersRef}
              >
                <CustomSelect
                  value={owners}
                  onChange={onOwnersChange}
                  options={ownersOptions}
                />
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Mileage</td>
              <td
                className={formErrors.mileage ? style.error : ""}
                ref={mileageRef}
              >
                <input
                  type="text"
                  placeholder="Enter mileage"
                  min="1"
                  maxLength={7}
                  value={mileage}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    formatMileage(e.target.value);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td className={style.tableTitle}>Special</td>
              <td>
                <input
                  className={style.checkBox}
                  type="checkbox"
                  checked={specialOffer}
                  onChange={(e) => setSpecialOffer(e.target.checked)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className={style.description}>
          <h4>Description:</h4>
          <div
            className={
              formErrors.description
                ? `${style.descriptionBox} ${style.error}`
                : style.descriptionBox
            }
            ref={descriptionRef}
          >
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className={style.priceBox}>
          <h5>Price: </h5>
          <div
            className={formErrors.price ? style.error : style.price}
            ref={priceRef}
          >
            <input
              type="text"
              placeholder="Min"
              min="1"
              className={style.price}
              maxLength={currency === "RUB" ? 11 : 10}
              value={price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formatPrice(e.target.value);
              }}
            />
          </div>

          <div
            className={
              formErrors.priceCurrency
                ? `${style.priceCurrency} ${style.error}`
                : style.priceCurrency
            }
            ref={priceCurrencyRef}
          >
            <CustomSelect
              value={currency}
              onChange={onCurrencyChange}
              options={currencyOptions}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className={loading ? style.button__load : ""}
        >
          {loading ? (
            <Rings
              height="48"
              width="30"
              color="#4fa94d"
              wrapperClass={style.loader}
              visible={true}
            />
          ) : (
            "Добавить машину"
          )}
        </button>
      </div>
    </div>
  );
}
