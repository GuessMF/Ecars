import React, {useRef, useEffect, useState} from "react";
import style from "../PersonalPage/__personalPage.module.scss";
import {v4 as uuidv4} from "uuid";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import carData from "../../helpers/modelsBrands";
// import PopUpError from "./PopUpError";
// import PopUpSent from "./PopUpSent";
import PopUpError from "pages/PersonalPage/PopUpError";
import PopUpSent from "pages/PersonalPage/PopUpSent";
import {Rings} from "react-loader-spinner";
import {useNavigate} from "react-router-dom";
import {collection} from "firebase/firestore";
import {db} from "../../firebase";
import {doc, setDoc} from "firebase/firestore";
import Cookies from "universal-cookie";
//import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useAppSelector} from "hooks/redux-hooks";
//import * as imageConversion from "image-conversion";
//import sharp from "sharp";
//import imagemin from "imagemin";
//import imageminWebp from "imagemin-webp";
//import Select from "react-select";
import CustomSelect from "components/smart/CustomSelect/CustomSelect";
//import {OptionTypeBase, GroupBase} from "react-select";
//import OptionTypeBase from "react-select";

//import imageminWebp from "imagemin-webp";

import {ReactComponent as PlusIcon} from "./plusIcon.svg";
import {ReactComponent as ChangeImage} from "./changeImage.svg";
import {ReactComponent as DeleteIcon} from "./deleteIcon.svg";
import {useAuth} from "hooks/use-auth";

// interface CarBrand {
//   name: string;
//   models: CarModel[];
// }
interface Props {
  userID: string;
}

interface CarModel {
  name: string;
}

// interface CarModel {
//   name: string;
// }

interface CarBrand {
  name: string;
  models: CarModel[];
}
interface OtherOptions {
  value: string;
}

interface CarData {
  brands: CarBrand[];
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
  const selectedCurrency = useAppSelector(
    (state) => state.currency.currencyTerm
  );
  const {isAuth, email, displayName} = useAuth();

  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    if (displayName) {
      setUserName(displayName);
    }
  }, [displayName]);

  const usdValue = useAppSelector((state) => state.currValue.usdValue);
  const eurValue = useAppSelector((state) => state.currValue.eurValue);
  // const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  // const toggleMenu = () => {
  //   setMenuIsOpen(!menuIsOpen);
  // };
  // const user = useAppSelector((state) => state.user);
  // console.log(user);

  // const [userEmail, setUserEmail] = useState<string>("");
  // const [userMobile, setUserMobile] = useState<string>("");

  let multiplier: number =
    selectedCurrency === "RUB"
      ? usdValue
      : selectedCurrency === "EUR"
      ? usdValue / eurValue
      : 1;

  // const newPrice = Number(price) * multiplier;
  // const currentPrice = parseInt(newPrice.toFixed(0));

  // const formattedPrice: string = currentPrice
  //   .toLocaleString()
  //   .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

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

  //let selectedFiles: File[] = [];
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

  // useEffect(() => {
  //   console.log(brandAndModel);
  // }, [brandAndModel]);

  // const toggleMenu = () => {
  //   setMenuIsOpen(!menuIsOpen);
  // };

  // const onClickCurrency = (selectedOption: any) => {
  //   setCurrentCur(selectedOption);
  //   // onCurrencyChange(selectedOption);
  //   console.log(selectedOption);
  //   setMenuIsOpen(false);
  // };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
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
              //  selectedFiles.push(compressedFile);

              setPreviewImages(images);
              setLoadingPhoto(false);
              console.log("фото загружено");
            }
          };
        }
      };

      reader.readAsDataURL(file);
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
            // selectedFiles.push(compressedFile);
            //  setSelectedFiles(compressedFiles);
            //   setPreviewImages(images);
          }
        };
      }
    };

    reader.readAsDataURL(file);
    // }
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
    // console.log("Price:   " + price);

    const newPrice =
      currency === "RUB"
        ? Number(price) / usdValue
        : currency === "EUR"
        ? Number(price) / (usdValue / eurValue)
        : Number(price);

    // console.log("New price:  " + newPrice);
    // console.log(parseInt(price.replace(/\s/g, ""), 10));
  }, [price]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFirstClick(true);
    checkErrors();

    if (Object.keys(errors).length > 0) {
      // console.log(errors);

      setFormErrors(errors);
      setPopUpErrors(true);
    } else {
      setLoading(true);

      const uploadTasks: Promise<string>[] = [];
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

      // Отдельная группа задач для selectedFiles
      const filesUploadTasks = selectedFiles.map((file) => {
        const storageRef = ref(storage, `cars/${newId}/${file.name}`);
        return uploadBytes(storageRef, file).then(() =>
          getDownloadURL(storageRef)
        );
      });

      // const imageUrls = await Promise.all(uploadTasks);
      // const previewImg = await Promise.all(uploadTasks);
      // console.log("Brand: " + brand);
      // console.log("Model: " + model);

      setBrandAndModel(`${brand} ${model}`);
      //console.log(brandAndModel);

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
          // price: price,
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
        }, 2000);
      } catch (error) {
        console.error("Error adding documents: ", error);
      }

      setSelectedFiles([]);
      // selectedFiles = [];
      setPreviewImages([]);
      setBrand("");
      // setBrand([]);
      setModel("");
      setPrice("");
      // setYear(0);
      setYear("");
      setTransmission("");
      // setEngineCapacity("");
      setEngineValue("");
      // setMileage(0);
      setMileage("1");
      setFuel("");
      setWheels("");
      setVehicleType("");
      setSeats("");
      setInterior("");
      setColor("");
      setLocation("");
      setExportStatus("");
      setDescription("");
      setOwners("");
      setSpecialOffer(false);
    }
  };

  // const handleEngineCapacityChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   let input = e.target.value;
  //   const regex = /^(\d+(\.\d{0,1})?)?$/;
  //   if (
  //     regex.test(input) &&
  //     parseFloat(input) >= 0.1 &&
  //     parseFloat(input) <= 9.9
  //   ) {
  //     if (input.length === 1) {
  //       input += ".";
  //     }
  //     setEngineCapacity(input);
  //   } else {
  //     setEngineCapacity("");
  //   }
  // };

  // const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedBrand = e.target.value;
  //   // setBrand(selectedBrand);
  //   const selectedBrandData = carData.brands.find(
  //     (item) => item.name === selectedBrand
  //   );
  //   setModels(selectedBrandData ? selectedBrandData.models : []);
  // };

  const hasErrors = Object.keys(formErrors);

  const handleAgreeClick = () => {
    const scrollTopOffset = 100;
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

  // const changePrice = (price: number) => {

  //   setPrice(price);
  //   console.log(price);

  //   // useEffect(() => {
  //   //   console.log(currentCur);
  //   //   console.log(price);
  //   //   if (currentCur === "USD") {
  //   //     setPrice(price);
  //   //   }
  //   //   if (currentCur === "RUB") {
  //   //     setPrice(price * usdValue);
  //   //   }
  //   // }, [currentCur, price]);
  // };
  //console.log("Selected brand: " + selectedBrand);

  const pickPreview = () => {
    previewPicker.current?.click();
  };

  const pickPhotos = () => {
    photosPicker.current?.click();
  };

  const rechangePreview = () => {
    setSelectedPreview([]);
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

  // useEffect(() => {
  //   onModelChange("");
  // }, [brand]);

  const onModelChange = (value: string) => {
    console.log(value);
    setModel(value);
  };
  const onYearChange = (year: string) => {
    setYear(year);
    console.log("Year :" + year);
  };

  const onColorChange = (color: string) => {
    setColor(color);
    console.log("Color :" + color);
  };
  const onTransmissionChange = (transmission: string) => {
    setTransmission(transmission);
    console.log("Transmission :" + transmission);
  };

  const onFuelChange = (fuel: string) => {
    setFuel(fuel);
    console.log("Fuel :" + fuel);
  };

  const onEngineValueChange = (engineValue: string) => {
    setEngineValue(engineValue);
    console.log("EngineValue :" + engineValue);
  };

  const onVehicleTypeChange = (vehicleType: string) => {
    setVehicleType(vehicleType);
    console.log("Vehicle Type :" + vehicleType);
  };

  const onInteriorChange = (interior: string) => {
    setInterior(interior);
    console.log("Interior :" + interior);
  };

  const onWheelsChange = (wheels: string) => {
    setWheels(wheels);
    console.log("Wheels :" + wheels);
  };

  const onSeatsChange = (seats: string) => {
    setSeats(seats);
    console.log("Seats :" + seats);
  };

  const onLocationChange = (location: string) => {
    setLocation(location);
    console.log("Location :" + location);
  };

  const onExportStatusChange = (exportStatus: string) => {
    setExportStatus(exportStatus);
    console.log("Export Status :" + exportStatus);
  };

  const onOwnersChange = (owners: string) => {
    setOwners(owners);
    console.log("Owners :" + owners);
  };
  const onCurrencyChange = (currency: string) => {
    setCurrency(currency);
    // console.log("Owners :" + owners);
  };

  useEffect(() => {
    if (firstClick) {
      // console.log(errors);

      // setFormErrors(errors);
      // setPopUpErrors(true);
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

  // useEffect(() => {
  //   console.log(loadedLittlePhotos);
  // }, [loadedLittlePhotos]);

  return (
    <div className={style.personalPage}>
      <div className={style.header}>
        <h1>Sell your car</h1>
        <p>
          {userName.charAt(0).toLocaleUpperCase() + userName.slice(1)}, here you
          can fill in the card of the car you are going to sell.
        </p>
      </div>

      {popUpErrors ? <PopUpError closePopUp={handleAgreeClick} /> : null}
      <PopUpSent sent={sent} />

      <form
        //  onSubmit={handleSubmit}
        id="form"
        className={style.form}
      >
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
                    // radius="6"
                    // wrapperStyle={{}}
                    wrapperClass={style.loader}
                    visible={true}
                    // ariaLabel="rings-loading"
                  />
                ) : (
                  <button onClick={pickPreview}>
                    <PlusIcon />
                  </button>
                )}
              </div>
            ) : (
              <div className={style.preview__photo}>
                {fisrtCarPhoto && (
                  <img src={fisrtCarPhoto} alt={`preview-${fisrtCarPhoto}`} />
                )}
              </div>
            )}

            <input
              className={style.hidden}
              ref={previewPicker}
              type="file"
              accept="image/*"
              onChange={handlePreviewChange}
            />
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
          // className={formErrors.selectedFiles ? style.error : style.photos}
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
                  // radius="6"
                  // wrapperStyle={{}}
                  wrapperClass={style.loader}
                  visible={true}
                  // ariaLabel="rings-loading"
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
                <div className={style.previewPhoto}>
                  <button
                    className={style.deletePhoto}
                    onClick={() => deleteAddedPhoto(index)}
                  >
                    <DeleteIcon />
                  </button>
                  <img
                    key={index}
                    src={preview}
                    alt={`preview-${index}`}
                    // className={index !== 0 && style.opacity}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <table>
          <tr>
            <td className={style.tableTitle}>Brand</td>
            <td className={formErrors.brand ? style.error : ""} ref={brandRef}>
              <CustomSelect
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
            <td className={formErrors.model ? style.error : ""} ref={modelRef}>
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
            <td className={formErrors.seats ? style.error : ""} ref={seatsRef}>
              <CustomSelect
                value={seats}
                onChange={onSeatsChange}
                options={seatsOptions}
              />
            </td>
          </tr>
          <tr>
            <td className={style.tableTitle}>Color</td>
            <td className={formErrors.color ? style.error : ""} ref={colorRef}>
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
                placeholder="Min"
                min="1"
                // max="999999"
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
            <td
            // className={formErrors.special ? style.error : ""}
            >
              <input
                type="checkbox"
                checked={specialOffer}
                // value={specialOffer}
                onChange={(e) => setSpecialOffer(e.target.checked)}
              />
            </td>
          </tr>
        </table>

        <div
          // className={formErrors.description ? style.error : style.description}
          className={style.description}
          // ref={descriptionRef}
        >
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

        <div
          className={style.priceBox}
          // className={formErrors.price ? style.error : style.price}
          // ref={priceRef}
        >
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
              // max="999999"
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
              // value={currencyOptions[0]}
              value={currency}
              onChange={onCurrencyChange}
              options={currencyOptions}
            />
          </div>
        </div>

        {/* <div
          className={formErrors.description ? style.error : ""}
          // ref={specialRef}
        >
        <label>
            Special:
            <input
              type="checkbox"
              checked={specialOffer}
              // value={specialOffer}
              onChange={(e) => setSpecialOffer(e.target.checked)}
            />
          </label> 
        </div> */}

        <button
          //  type="submit"
          onClick={handleSubmit}
          className={loading ? style.button__load : ""}
        >
          {loading ? (
            <Rings
              height="48"
              width="30"
              color="#4fa94d"
              // radius="6"
              // wrapperStyle={{}}
              wrapperClass={style.loader}
              visible={true}
              // ariaLabel="rings-loading"
            />
          ) : (
            "Добавить машину"
          )}
        </button>
      </form>
    </div>
  );
}
