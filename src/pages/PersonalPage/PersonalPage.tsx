import React, {useRef, useEffect, useState} from "react";
import style from "./__personalPage.module.scss";
import {v4 as uuidv4} from "uuid";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import carData from "../../helpers/modelsBrands";
import PopUpError from "./PopUpError";
import PopUpSent from "./PopUpSent";
import {Rings} from "react-loader-spinner";
import {useNavigate} from "react-router-dom";
import {collection} from "firebase/firestore";
import {db} from "../../firebase";
import {doc, setDoc} from "firebase/firestore";
import Cookies from "universal-cookie";

interface Props {
  userID: string;
}

interface CarModel {
  name: string;
}

interface Errors {
  brand?: string;
  model?: string;
  selectedFiles?: string;
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

interface Refs {
  [key: string]: React.RefObject<HTMLDivElement>;
}
export default function PersonalPage({userID}: Props) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [brand, setBrand] = useState<string>("");
  const [models, setModels] = useState<CarModel[]>([]);
  const [model, setModel] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [mileage, setMileage] = useState<number>(0);
  const [transmission, setTransmission] = useState<string>("");
  const [fuel, setFuel] = useState<string>("");
  const [wheels, setWheels] = useState<string>("");
  const [vehicleType, setVehicleType] = useState<string>("");
  const [engineCapacity, setEngineCapacity] = useState<string>("");
  const [seats, setSeats] = useState<string>("");
  const [interior, setInterior] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [owners, setOwners] = useState<string>("");
  const [exportStatus, setExportStatus] = useState<string>("");
  const [description, setDescription] = useState("");

  const [specialOffer, setSpecialOffer] = useState<boolean>(false);

  const [formErrors, setFormErrors] = useState<Errors>({});
  const [popUpErrors, setPopUpErrors] = useState<boolean>(false);
  const errors: Errors = {};

  const selectedFilesRef = useRef<HTMLDivElement>(null);
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

  const cookies = new Cookies(null, {path: "/"});
  useEffect(() => {
    if (!cookies.get("auth")) {
      navigate("/login");
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let imageCounter = 1;
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => {
        const renamedFile = new File([file], `${imageCounter}.webp`, {
          type: file.type,
        });
        imageCounter++;
        return renamedFile;
      });

      setSelectedFiles([...selectedFiles, ...newFiles]);
    }

    const files = e.target.files;
    if (files) {
      const images: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            images.push(reader.result);
            if (images.length === files.length) {
              setPreviewImages(images);
            }
          }
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  const generateNewId = (): string => {
    return uuidv4();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

      selectedFiles.forEach((file) => {
        const storageRef = ref(storage, `cars/${newId}/${file.name}`);

        uploadTasks.push(
          uploadBytes(storageRef, file).then(() => getDownloadURL(storageRef))
        );
      });

      const imageUrls = await Promise.all(uploadTasks);
      const carsRef = collection(db, "cars");
      const newIndex = uuidv4();
      try {
        await setDoc(doc(carsRef, newId), {
          index: newIndex,
          id: newId,
          userId: userID,
          dateAdded: currentDate,
          brand: brand,
          model: model,
          price: price,
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

  return (
    <div className={style.login}>
      <h3>Sell your car</h3>

      {popUpErrors ? <PopUpError closePopUp={handleAgreeClick} /> : null}
      <PopUpSent sent={sent} />

      <form onSubmit={handleSubmit} id="form" className={style.form}>
        <div
          className={formErrors.selectedFiles ? style.error : style.photos}
          ref={selectedFilesRef}
        >
          <label>
            <span> Фотография машины:</span>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </label>
          <div className={style.preview__photos}>
            {previewImages.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`preview-${index}`}
                style={{maxWidth: "100px", maxHeight: "100px", margin: "5px"}}
              />
            ))}
          </div>
        </div>

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
          <label className={style.color__label}>
            Цвет автомобиля:
            <select value={color} onChange={(e) => setColor(e.target.value)}>
              <option value="">Выберите цвет</option>
              <option value="White">
                <span>White</span> <div className={style.block__white}></div>
              </option>
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
              <option value="TwoSeats">2</option>
              <option value="ThreeSeats">3</option>
              <option value="FourSeats">4</option>
              <option value="FiveSeats">5</option>
              <option value="SixSeats">6</option>
              <option value="SevenSeats">7</option>
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
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value, 10))}
            />
          </label>
        </div>

        <div
          className={formErrors.description ? style.error : ""}
          ref={descriptionRef}
        >
          <label>
            Описание:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
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

        <button type="submit" className={loading ? style.button__load : ""}>
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
