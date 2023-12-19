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
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useAppSelector} from "hooks/redux-hooks";
import * as imageConversion from "image-conversion";
import sharp from "sharp";
import imagemin from "imagemin";
//import imageminWebp from "imagemin-webp";
import Select from "react-select";
import CustomSelect from "components/smart/CustomSelect/CustomSelect";
//import {OptionTypeBase, GroupBase} from "react-select";
//import OptionTypeBase from "react-select";

import imageminWebp from "imagemin-webp";

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
  engineCapacity?: string;
  seats?: string;
  interior?: string;
  color?: string;
  location?: string;
  owners?: string;
  exportStatus?: string;
  description?: string;
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
  // console.log(displayName);
  // console.log(email);
  const [userName, setUserName] = useState<string>("");

  // const options: GroupBase<{value: string; label: string}>[] = [
  //   {
  //     label: "Group 1",
  //     options: [
  //       {value: "value1", label: "Option 1"},
  //       {value: "value2", label: "Option 2"},
  //     ],
  //   },
  //   {
  //     label: "Group 2",
  //     options: [
  //       {value: "value3", label: "Option 3"},
  //       {value: "value4", label: "Option 4"},
  //     ],
  //   },
  // ];

  useEffect(() => {
    if (displayName) {
      setUserName(displayName);
    }
  }, [displayName]);

  const usdValue = useAppSelector((state) => state.currValue.usdValue);
  const eurValue = useAppSelector((state) => state.currValue.eurValue);
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };
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
  const [sent, setSent] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedPreview, setSelectedPreview] = useState<File[]>([]);

  const [brand, setBrand] = useState<string>("test");
  const [models, setModels] = useState<CarModel[]>([]);

  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [modelsOptions, setModelsOptions] = useState<OptionType[]>([]);

  const [brandAndModel, setBrandAndModel] = useState<string>("");
  const [model, setModel] = useState("test");
  const [price, setPrice] = useState<number>(10);
  const [year, setYear] = useState<number>(2010);
  const [mileage, setMileage] = useState<number>(10);
  const [transmission, setTransmission] = useState<string>("test");
  const [fuel, setFuel] = useState<string>("test");
  const [wheels, setWheels] = useState<string>("test");
  const [vehicleType, setVehicleType] = useState<string>("test");
  const [engineCapacity, setEngineCapacity] = useState<string>("test");
  const [seats, setSeats] = useState<string>("test");
  const [interior, setInterior] = useState<string>("test");
  const [color, setColor] = useState<string>("test");
  const [location, setLocation] = useState<string>("test");
  const [owners, setOwners] = useState<string>("test");
  const [exportStatus, setExportStatus] = useState<string>("test");
  const [description, setDescription] = useState("test");
  const [fisrtCarPhoto, setFirstCarPhoto] = useState<string>();

  // const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [currentCur, setCurrentCur] = useState<string>("");

  const [specialOffer, setSpecialOffer] = useState<boolean>(false);

  const [formErrors, setFormErrors] = useState<Errors>({});
  const [popUpErrors, setPopUpErrors] = useState<boolean>(false);
  const errors: Errors = {};

  const previewPicker = useRef<HTMLInputElement>(null);
  const photosPicker = useRef<HTMLInputElement>(null);

  const selectedFilesRef = useRef<HTMLDivElement>(null);
  const selectedPreviewRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const vehicleTypeRef = useRef<HTMLDivElement>(null);
  const fuelRef = useRef<HTMLDivElement>(null);
  const engineCapacityRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);
  const interiorRef = useRef<HTMLDivElement>(null);
  const transmissionRef = useRef<HTMLDivElement>(null);
  const wheelsRef = useRef<HTMLDivElement>(null);
  const seatsRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const ownersRef = useRef<HTMLDivElement>(null);
  const exportStatusRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const mileageRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const refs: Refs = {
    selectedFiles: selectedFilesRef,
    selectedPreview: selectedPreviewRef,
    brand: brandRef,
    model: modelRef,
    vehicleType: vehicleTypeRef,
    fuel: fuelRef,
    engineCapacity: engineCapacityRef,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
    if (!engineCapacity) {
      errors.engineCapacity = "Поле модель должна быть заполнена";
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

    if (Object.keys(errors).length > 0) {
      console.log(errors);

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
      console.log("Brand: " + brand);
      console.log("Model: " + model);

      setBrandAndModel(`${brand} ${model}`);
      console.log(brandAndModel);

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
            currentCur === "RUB"
              ? price / usdValue
              : currentCur === "EUR"
              ? price / (usdValue / eurValue)
              : price,
          year: year,
          mileage: mileage,
          transmission: transmission,
          fuel: fuel,
          wheels: wheels,
          vehicleType: vehicleType,
          engineCapacity: engineCapacity,
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
      setModel("");
      setPrice(0);
      setYear(0);
      setTransmission("");
      setEngineCapacity("");
      setMileage(0);
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

  const handleEngineCapacityChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let input = e.target.value;
    const regex = /^(\d+(\.\d{0,1})?)?$/;
    if (
      regex.test(input) &&
      parseFloat(input) >= 0.1 &&
      parseFloat(input) <= 9.9
    ) {
      if (input.length === 1) {
        input += ".";
      }
      setEngineCapacity(input);
    } else {
      setEngineCapacity("");
    }
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBrand = e.target.value;
    setBrand(selectedBrand);
    const selectedBrandData = carData.brands.find(
      (item) => item.name === selectedBrand
    );
    setModels(selectedBrandData ? selectedBrandData.models : []);
  };

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

  const pickPreview = () => {
    previewPicker.current?.click();
  };

  const pickPhotos = () => {
    photosPicker.current?.click();
  };

  // useEffect(() => {
  //   console.log(selectedFiles);
  //   console.log(selectedPreview);
  // }, [selectedFiles, selectedPreview]);

  const rechangePreview = () => {
    setSelectedPreview([]);
  };

  const deleteAddedPhoto = (index: number) => {
    // const currentIndex = index
    console.log(index);
    console.log(selectedFiles);
    // const newArr = selectedFiles.filter((file: File[]) => file !== index);
    //   console.log(newArr);

    // delete selectedFiles[index];
    // delete previewImages[index];
  };

  useEffect(() => {
    console.log(selectedFiles);
    console.log(previewImages);
  }, [previewImages, selectedFiles]);

  const brands = [
    {value: "Acura", label: "Acura"},
    {value: "Bmw", label: "Bmw"},
    {value: "Jaguar", label: "Jaguar"},
  ];
  const modelss = [
    {value: "3313", label: "3131"},
    {value: "33333", label: "33333"},
    {value: "Ja44gu44ar", label: "Jag444uar"},
  ];

  const mapCarBrandToOptionType = (brand: CarBrand): OptionType => ({
    value: brand.name,
    label: brand.name,
  });

  const brandOptions: OptionType[] = carData.brands.map(
    mapCarBrandToOptionType
  );

  useEffect(() => {
    console.log(brands);
    console.log(carData.brands);
  }, []);

  const handleNewBrandChange = (brand: string) => {
    setSelectedBrand(brand);

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
          className={formErrors.selectedPreview ? style.error : style.preview}
          ref={selectedPreviewRef}
        >
          <label>
            {selectedPreview.length < 1 ? (
              <div className={style.carPreview}>
                <h3>Car preview</h3>

                <button onClick={pickPreview}>
                  <PlusIcon />
                </button>
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
          className={formErrors.selectedFiles ? style.error : style.photos}
          ref={selectedFilesRef}
        >
          {selectedFiles.length < 1 && (
            <label>
              <h3>Сar photos</h3>
              <button onClick={pickPhotos} className={style.addPhotos}>
                <PlusIcon />
              </button>

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
            <td>
              <CustomSelect options={brandOptions} />
              {/* <CustomSelect
        options={carData.brands.map((brand) => ({ value: brand.name, label: brand.name }))}
        onChange={(selectedOption) => handleBrandChange(selectedOption.value)}
      /> */}
              {/* <CustomSelect
                options={carData.brands.map((brand) => ({
                  value: brand.name,
                  label: brand.name,
                }))}
                onChange={handleNewBrandChange}
              /> */}
            </td>

            <td className={style.tableTitle}>Interior</td>
            <td> {/* <CustomSelect options={modelss} /> */}</td>
          </tr>
          <tr>
            <td className={style.tableTitle}>Model</td>
            <td>
              {" "}
              <CustomSelect options={modelsOptions} />
            </td>

            <td className={style.tableTitle}>Wheels</td>
            <td>{/* <CustomSelect /> */}</td>
          </tr>
          <tr>
            <td className={style.tableTitle}>Year</td>
            <td> {/* <CustomSelect /> */}</td>
            <td className={style.tableTitle}>Seats</td>
            <td>{/* <CustomSelect /> */}</td>
          </tr>
          <tr>
            <td className={style.tableTitle}>Color</td>
            <td>{/* <CustomSelect /> */}</td>

            <td className={style.tableTitle}>Location</td>
            <td> {/* <CustomSelect /> */}</td>
          </tr>
          <tr>
            <td className={style.tableTitle}>Gearbox</td>
            <td> {/* <CustomSelect /> */}</td>

            <td className={style.tableTitle}>Export</td>
            <td> {/* <CustomSelect /> */}</td>
          </tr>

          <tr>
            <td className={style.tableTitle}>Fuel</td>
            <td> {/* <CustomSelect /> */}</td>

            <td className={style.tableTitle}>Owners</td>
            <td> {/* <CustomSelect /> */}</td>
          </tr>

          <tr>
            <td className={style.tableTitle}>Engine value</td>
            <td> {/* <CustomSelect /> */}</td>

            <td className={style.tableTitle}>Mileage</td>
            <td> {/* <CustomSelect /> */}</td>
          </tr>
          <tr>
            <td className={style.tableTitle}>Vehicle Type</td>
            <td> {/* <CustomSelect /> */}</td>

            <td className={style.tableTitle}>Special</td>
            <td> {/* <CustomSelect /> */}</td>
          </tr>
        </table>
        <div className={formErrors.brand ? style.error : ""} ref={brandRef}>
          <label>
            <span>Марка:</span>

            <select value={brand} onChange={handleBrandChange}>
              <option value="">Выберите Марку</option>
              {carData.brands.map((brand) => {
                return (
                  <option key={brand.name} value={brand.name}>
                    {brand.name}
                  </option>
                );
              })}
            </select>
          </label>
        </div>

        <div className={formErrors.model ? style.error : ""} ref={modelRef}>
          <label>
            <span>Модель:</span>
            <select onChange={(e) => setModel(e.target.value)}>
              <option value="">Выбери модель</option>
              {models.map((model) => (
                <option key={model.name} value={model.name}>
                  {model.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div
          className={formErrors.vehicleType ? style.error : ""}
          ref={vehicleTypeRef}
        >
          <label>
            Тип кузова:
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="">Тип кузова</option>
              <option value="Sedan">Sedan</option>
              <option value="Coupe">Coupe</option>
              <option value="Hatchback">Hatchback</option>
              <option value="SUV">SUV (Sport Utility Vehicle)</option>
              <option value="Van">Van</option>
              <option value="StationWagon">Station Wagon</option>
              <option value="Convertible">Convertible</option>
              <option value="PickUp">Pick Up</option>
            </select>
          </label>
        </div>

        <div className={formErrors.fuel ? style.error : ""} ref={fuelRef}>
          <label>
            Топливо:
            <select value={fuel} onChange={(e) => setFuel(e.target.value)}>
              <option value="">Вид топлива</option>
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </label>
        </div>
        <div className={formErrors.engineCapacity ? style.error : ""}>
          <label>
            Обьем двигателя:
            <input
              type="text"
              value={engineCapacity}
              onChange={handleEngineCapacityChange}
              placeholder="Введите число (макс. 9.9)"
            />
          </label>
        </div>

        <div className={formErrors.color ? style.error : ""} ref={colorRef}>
          <label>
            Цвет автомобиля:
            <select value={color} onChange={(e) => setColor(e.target.value)}>
              <option value="">Выберите цвет</option>
              <option value="White">White</option>
              <option value="Black">Black</option>
              <option value="Silver">Silver</option>
              <option value="Gray">Gray</option>
              <option value="Blue">Blue</option>
              <option value="Red">Red</option>
              <option value="Green">Green</option>
              <option value="Brown">Brown</option>
              <option value="Gold">Gold</option>
              <option value="Purple">Purple</option>
              <option value="Orange">Orange</option>
              <option value="Yellow">Yellow</option>
              <option value="Pink">Pink</option>
            </select>
          </label>
        </div>
        <div
          className={formErrors.interior ? style.error : ""}
          ref={interiorRef}
        >
          <label>
            Цвет интерьера:
            <select
              value={interior}
              onChange={(e) => setInterior(e.target.value)}
            >
              <option value="">Выберите цвет</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Brown">Brown</option>
              <option value="Orange">Orange</option>
              <option value="Yellow">Yellow</option>
              <option value="Red">Red</option>
            </select>
          </label>
        </div>

        <div
          className={formErrors.transmission ? style.error : ""}
          ref={transmissionRef}
        >
          <label>
            Трансмиссия:
            <select
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
            >
              <option value="">Выберите трансмиссию</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </label>
        </div>

        <div className={formErrors.wheels ? style.error : ""} ref={wheelsRef}>
          <label>
            Размер колес:
            <select value={wheels} onChange={(e) => setWheels(e.target.value)}>
              <option value="">Размер колес</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
            </select>
          </label>
        </div>

        <div className={formErrors.seats ? style.error : ""} ref={seatsRef}>
          <label>
            Колличество мест:
            <select value={seats} onChange={(e) => setSeats(e.target.value)}>
              <option value="">Выберите колличество мест</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </label>
        </div>

        <div
          className={formErrors.location ? style.error : ""}
          ref={locationRef}
        >
          <label>
            Местоположение:
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Выберите город</option>
              <option value="SaintPetersburg">Saint-Petersburg</option>
              <option value="Moscow">Moscow</option>
              <option value="Almaty">Almaty</option>
              <option value="Minsk">Minsk</option>
              <option value="Dubai">Dubai</option>
              <option value="AbuDhabi">Abu Dhabi</option>
              <option value="Shanghai">Shanghai</option>
            </select>
          </label>
        </div>

        <div className={formErrors.owners ? style.error : ""} ref={ownersRef}>
          <label>
            Владельцы:
            <select value={owners} onChange={(e) => setOwners(e.target.value)}>
              <option value="">Количество владельцев</option>
              <option value="None">None</option>
              <option value="One">1</option>
              <option value="Two">2</option>
              <option value="Three">3</option>
              <option value="More">3+</option>
            </select>
          </label>
        </div>

        <div
          className={formErrors.exportStatus ? style.error : ""}
          ref={exportStatusRef}
        >
          <label>
            Export status:
            <select
              value={exportStatus}
              onChange={(e) => setExportStatus(e.target.value)}
            >
              <option value="">Выберите export status</option>
              <option value="Can be exported">Can be exported</option>
              <option value="Can't be exported">Can't be exported</option>
            </select>
          </label>
        </div>

        <div className={formErrors.year ? style.error : ""} ref={yearRef}>
          <label>
            Год выпуска:
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value, 10))}
            />
          </label>
        </div>

        <div className={formErrors.mileage ? style.error : ""} ref={mileageRef}>
          <label>
            Пробег:
            <input
              type="number"
              value={mileage}
              onChange={(e) => setMileage(parseInt(e.target.value, 10))}
            />
          </label>
        </div>

        <div className={formErrors.price ? style.error : ""} ref={priceRef}>
          <label>
            Цена:
            <select
              value={currentCur}
              onChange={(e) => setCurrentCur(e.target.value)}
            >
              <option value="">Выберите валюту</option>
              <option value="USD">USD</option>
              <option value="RUB">RUB</option>
              <option value="EUR">EUR</option>
            </select>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value, 10))}
            />
          </label>
        </div>

        <div
          className={formErrors.description ? style.error : style.description}
          ref={descriptionRef}
        >
          <label>Описание:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div
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
        </div>

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
