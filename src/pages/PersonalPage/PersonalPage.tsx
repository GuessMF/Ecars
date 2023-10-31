import React, {useRef, useEffect, useState} from "react";
import style from "./__personalPage.module.scss";
import {ReactComponent as GoogleIcon} from "../../assets/icons/google_icon.svg";
import {NavLink} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
// import ImageCompressor from "image-compressor";
//import sharp from "sharp";

const storage = getStorage();

interface Errors {
  brand?: string;
  model?: string;
  // Добавьте другие поля с ошибками, если необходимо
}

export default function PersonalPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [brand, setBrand] = useState<string>("");
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

  //const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const storage = getStorage();
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files);

      setSelectedFiles([...selectedFiles, ...Array.from(e.target.files)]);
    }

    const files = e.target.files;
    if (files) {
      const images: string[] = [];

      // Проход по списку выбранных файлов и создание превью
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            images.push(reader.result);
            if (images.length === files.length) {
              // Устанавливаем массив с превью в состояние
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
  const [formErrors, setFormErrors] = useState<Errors>({});
  const errors: Errors = {};
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!brand) {
      errors.brand = "Поле Брэнд обязательно для заполнения";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      console.log("Errors Brand");
    } else {
      console.log("No Errors");
      // Если нет ошибок, выполните отправку данных
      // Ваш код для отправки данных на сервер

      const uploadTasks: Promise<string>[] = [];
      const newId = generateNewId();

      selectedFiles.forEach((file) => {
        const storageRef = ref(storage, `cars/${newId}/${file.name}`);

        uploadTasks.push(
          uploadBytes(storageRef, file).then(() => getDownloadURL(storageRef))
        );
      });

      const imageUrls = await Promise.all(uploadTasks);

      // Используйте сгенерированный ID в названии папки в Firebase Storage
      //  const storageFolder = `cars/${newId}`;

      const carObject = {
        id: newId,
        brand,
        model,
        price,
        year,
        mileage,
        transmission,
        fuel,
        wheels,
        vehicleType,
        engineCapacity,
        seats,
        owners,
        color,
        interior,
        location,
        exportStatus,
        description,
        imageUrls, // Массив URL изображений
      };
      // Отправить объект на сервер или выполнить другие действия с ним
      //  console.log(carObject);
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carObject),
      };
      fetch("https://65378b85bb226bb85dd365a6.mockapi.io/cars", requestOptions)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((json) => {
          console.log("Объект успешно отправлен на сервер:", json);
        })
        .catch((error) => {
          console.error("Ошибка при отправке объекта на сервер:", error);
        });

      // Сбросить значения формы

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

  return (
    <div className={style.login}>
      <form onSubmit={handleSubmit}>
        <div className={style.photos}>
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
        <div>
          <label>
            <span>Марка:</span>

            <select value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value="">Выберите Марку</option>
              <option value="Acura">Acura</option>
              <option value="Alfa Romeo">Alfa Romeo</option>
              <option value="Aston Martin">Aston Martin</option>
              <option value="Audi">Audi</option>
              <option value="Bentley">Bentley</option>
              <option value="BMW">BMW</option>
              <option value="Ferrari">Ferrari</option>
              <option value="Ford">Ford</option>
              <option value="Infiniti">Infiniti</option>
              <option value="Jaguar">Jaguar</option>
              <option value="Land Rover">Land Rover</option>
              <option value="Lexus">Lexus</option>
              <option value="Maserati">Maserati</option>
              <option value="Maybach">Maybach</option>
              <option value="Mercedes Benz">Mercedes Benz</option>
              <option value="Nissan">Nissan</option>
              <option value="Porsche">Porsche</option>
              <option value="Rolls Royce">Rolls Royce</option>
              <option value="Tesla">Tesla</option>
              <option value="Toyota">Toyota</option>
              <option value="Volkswagen">Volkswagen</option>
              <option value="Volvo">Volvo</option>
            </select>
          </label>
        </div>

        {formErrors.brand && (
          <div className={style.error}>{formErrors.brand}</div>
        )}
        <div>
          <label>
            <span>Модель:</span>

            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </label>
        </div>

        <div>
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
              <option value="Station Wagon">Station Wagon</option>
              <option value="Convertible">Convertible</option>
              <option value="Pick Up">Pick Up</option>
            </select>
          </label>
        </div>
        <div>
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
        <div>
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

        <div>
          <label>
            Цвет автомобиля:
            <select value={color} onChange={(e) => setColor(e.target.value)}>
              <option value="">Выберите цвет</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Silver">Silver</option>
              <option value="Brown">Brown</option>
              <option value="Orange">Orange</option>
              <option value="Yellow">Yellow</option>
              <option value="Red">Red</option>
              <option value="Green">Green</option>
            </select>
          </label>
        </div>
        <div>
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

        <div>
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

        <div>
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

        <div>
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
        <div>
          <label>
            Местоположение:
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Выберите город</option>
              <option value="Saint-Petersburg">Saint-Petersburg</option>
              <option value="Moscow">Moscow</option>
              <option value="Almaty">Almaty</option>
              <option value="Minsk">Minsk</option>
              <option value="Abu Dhabi">Abu Dhabi</option>
              <option value="Shanghai">Shanghai</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Владельцы:
            <select value={owners} onChange={(e) => setOwners(e.target.value)}>
              <option value="">Количество владельцев</option>
              <option value="0">None</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">3+</option>
            </select>
          </label>
        </div>

        <div>
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

        <div>
          <label>
            Год выпуска:
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value, 10))}
            />
          </label>
        </div>
        <div>
          <label>
            Пробег:
            <input
              type="number"
              value={mileage}
              onChange={(e) => setMileage(parseInt(e.target.value, 10))}
            />
          </label>
        </div>

        <div>
          <label>
            Цена:
            <input
              type="number"
              value={price}
              //onChange={(e) => setPrice(e.target.value)}
              onChange={(e) => setPrice(parseInt(e.target.value, 10))}
            />
          </label>
        </div>
        <div>
          <label>
            Описание:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Добавить машину</button>
      </form>
    </div>
  );
}
