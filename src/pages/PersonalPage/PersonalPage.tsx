import React, {useRef, useEffect, useState} from "react";
import style from "./__personalPage.module.scss";
import {ReactComponent as GoogleIcon} from "../../assets/icons/google_icon.svg";
import {NavLink} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
// import { carData } from "../../helpers/modelsBrands";
import carData from "../../helpers/modelsBrands";
// import ImageCompressor from "image-compressor";
//import sharp from "sharp";
import PopUpError from "./PopUpError";
import PopUpSent from "./PopUpSent";
import PhotoList from "../../components/ordinary/PhotoList/PhotoList";
import ScrollToTop from "../../utils/scrollToTop";
import ScrollToTopPagination from "../../utils/scrollToTopPagination";
import {Rings} from "react-loader-spinner";

import {db} from "../../firebase";
import {collection, doc, setDoc} from "firebase/firestore";

const storage = getStorage();

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
  // Добавьте другие поля с ошибками, если необходимо
}

type DateObject = {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
};

interface Photo {
  id: string;
  url: string;
}
interface Refs {
  [key: string]: React.RefObject<HTMLDivElement>;
}
export default function PersonalPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  //const [selectedFiles, setSelectedFiles] = useState<Photo[]>([]);

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

  const [formErrors, setFormErrors] = useState<Errors>({});
  const [popUpErrors, setPopUpErrors] = useState<boolean>(false);
  const errors: Errors = {};
  //console.log(formErrors);

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
  //const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const storage = getStorage();
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // const handleReorderPhotos = (reorderedPhotos: File[]) => {
  //   // Преобразовать объекты типа File в объекты типа Photo
  //   const photos: Photo[] = reorderedPhotos.map((file) => ({
  //     id: uuidv4(), // Здесь вы должны сгенерировать уникальный идентификатор для фотографии
  //     url: URL.createObjectURL(file), // Используйте URL.createObjectURL для получения временной ссылки на файл
  //   }));
  //   setSelectedFiles(photos);
  //   // Здесь вы можете отправить обновленный порядок фотографий на сервер или выполнить другие необходимые действия.
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let imageCounter = 1;
    // if (e.target.files) {
    //   console.log(e.target.files);

    //   setSelectedFiles([...selectedFiles, ...Array.from(e.target.files)]);
    // }
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => {
        const renamedFile = new File([file], `${imageCounter}.webp`, {
          type: file.type,
        });
        imageCounter++;
        return renamedFile;
      });

      setSelectedFiles([...selectedFiles, ...newFiles]);
      //  console.log(selectedFiles);
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
      console.log("No Errors");

      const uploadTasks: Promise<string>[] = [];
      const newId = generateNewId();

      const currentDate: Date = new Date();
      const dateObj: DateObject = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1, // Месяцы в JavaScript начинаются с 0, поэтому добавляем 1
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

      // Используйте сгенерированный ID в названии папки в Firebase Storage
      // const storageFolder = `cars/${newId}`;

      const carObject = {
        id: newId,
        dateAdded: currentDate,
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
        dateObj: dateObj,
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
          setSent(true);
          setLoading(false);
          setTimeout(() => {
            setSent(false);
          }, 2000);
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

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBrand = e.target.value;
    setBrand(selectedBrand);

    // Найти модели для выбранной марки из carData
    const selectedBrandData = carData.brands.find(
      (item) => item.name === selectedBrand
    );
    setModels(selectedBrandData ? selectedBrandData.models : []);
  };
  // <PhotoList
  //           photos={selectedFiles}
  //           onReorderPhotos={handleReorderPhotos}
  //         />

  const hasErrors = Object.keys(formErrors);

  const handleAgreeClick = () => {
    // const firstEmptyField = hasErrors.find((element) => !eval(element)); // Проверяем, есть ли пустые поля
    //console.log(hasErrors[0]);
    const scrollTopOffset = 100; // Задайте желаемый отступ сверху в пикселях
    setPopUpErrors(false);
    const fieldName = hasErrors[0];
    const fieldRef = refs[fieldName];
    // console.log(fieldName, fieldRef);

    if (fieldRef && fieldRef.current !== null) {
      // console.log(`${fieldName} ref value:`);
      const topOffset =
        fieldRef.current.getBoundingClientRect().top +
        window.scrollY -
        scrollTopOffset;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    } else {
      // console.log(`${fieldName} ref NOvalue:`);
      // setPopUpErrors(true);
    }
  };
  //console.log(popUpErrors);

  //Новая отправка формы
  // useEffect(() => {
  //   const newDoc = async () => {
  //     try {
  //       await setDoc(doc(db, "cities", "TEST"), {
  //         name: "Los",
  //         state: "CAaa",
  //         country: "USAaa",
  //       });
  //       console.log("Document successfully written!");
  //     } catch (error) {
  //       console.error("Error writing document: ", error);
  //     }
  //   };

  //   // Вызываем функцию создания нового документа
  //   newDoc();
  // }, []);

  // useEffect(() => {
  //   const addCities = async () => {
  //     const citiesRef = collection(db, "cities");

  //     try {
  //       // await setDoc(doc(carsRef, "1"), {
  //       //   index: "1",
  //       //   id: "ee624a58-fbd8-4e4b-9554-50166670e82d",
  //       //   dateAdded: "2023-11-03T13:57:40.085Z",
  //       //   brand: "Acura",
  //       //   model: "MDX",
  //       //   price: 121990,
  //       //   year: 2008,
  //       //   mileage: 72,
  //       //   transmission: "Automatic",
  //       //   fuel: "Gasoline",
  //       //   wheels: "21",
  //       //   vehicleType: "SUV",
  //       //   engineCapacity: "3.0",
  //       //   seats: "5",
  //       //   owners: "0",
  //       //   color: "Yellow",
  //       //   interior: "White",
  //       //   location: "Saint-Petersburg",
  //       //   exportStatus: "Can be exported",
  //       //   description: "Первая Acura MDX T7-местный салон.",
  //       //   dateObj: {
  //       //     year: 2023,
  //       //     month: 11,
  //       //     day: 3,
  //       //     hours: 16,
  //       //     minutes: 57,
  //       //   },

  //       //   imageUrls: [
  //       //     "https://firebasestorage.googleapis.com/v0/b/ecars-de7bc.appspot.com/o/cars%2Fee624a58-fbd8-4e4b-9554-50166670e82d%2F1200x900n%20(3).webp?alt=media&token=7e46bc12-2b54-4acc-bc59-6aaf09fcebd4",
  //       //     "https://firebasestorage.googleapis.com/v0/b/ecars-de7bc.appspot.com/o/cars%2Fee624a58-fbd8-4e4b-9554-50166670e82d%2F1200x900n%20(1).webp?alt=media&token=aef89f5d-ed5e-440d-999e-b73e1da21ce1",
  //       //     "https://firebasestorage.googleapis.com/v0/b/ecars-de7bc.appspot.com/o/cars%2Fee624a58-fbd8-4e4b-9554-50166670e82d%2F1200x900n%20(2).webp?alt=media&token=3980cb51-0731-464c-92af-6e446ccf02a1",
  //       //     "https://firebasestorage.googleapis.com/v0/b/ecars-de7bc.appspot.com/o/cars%2Fee624a58-fbd8-4e4b-9554-50166670e82d%2F1200x900n%20(4).webp?alt=media&token=52c39bdd-9402-4302-bdab-68b2983a2579",
  //       //     "https://firebasestorage.googleapis.com/v0/b/ecars-de7bc.appspot.com/o/cars%2Fee624a58-fbd8-4e4b-9554-50166670e82d%2F1200x900n.webp?alt=media&token=bb43a7a2-bdcb-4f53-8f6e-18732d5867fe",
  //       //     "https://firebasestorage.googleapis.com/v0/b/ecars-de7bc.appspot.com/o/cars%2Fee624a58-fbd8-4e4b-9554-50166670e82d%2FHx-9DwCtkkpFWq0y2m4qV_-lamtYFi9oLv9gSxS31BfUbR_yXNCcVjAa1IrqLjK0dQB2iELb99ml-jkzMuRf-V5O_Q8Q744TFx_nKokvfwC3u3w3HAkmUgWTQHw_l_QrvlI-4AaWwk5zXLzn5X1rkEJNFdsgupiv5MonHlKCP-wBMq4ACLnWb0hE5zPSbA9R7_pnfnpjJUAetGN5Jr3_KKpfBOwigc4Fa2WU0ZBXb5BybRf.webp?alt=media&token=48d42fd5-3b4f-4f40-aa58-2b69f03c14c9",
  //       //     "https://firebasestorage.googleapis.com/v0/b/ecars-de7bc.appspot.com/o/cars%2Fee624a58-fbd8-4e4b-9554-50166670e82d%2FHx-9DwCtkkpFWq0y2m4qV_-lamtYFi9oLv9gSxS31BfUbR_yXNObWDcQ24nqIzPmLgByghKMp4-jqj5kOrdbqgxI-l0R7o0SGBHneNgvfwC3u3w3HAkmUgWTQHw_l_QrvlI-4AaWwk5zXLzn5X1rkEJNFdsgupiv5MonHlKCP-wBMq4ACLnWb0hE5zPSbA9R7_pnfnpjJUAetGN5Jr3_KKpfBOwigc4Fa2WU0ZBXb5BybRf.webp?alt=media&token=d429dc41-00ae-489a-83b3-fe3f8e4976e7",
  //       //     "https://firebasestorage.googleapis.com/v0/b/ecars-de7bc.appspot.com/o/cars%2Fee624a58-fbd8-4e4b-9554-50166670e82d%2FHx-9DwCtkkpFWq0y2m4qV_-lamtYFi9oLv9gSxS31BfUbR_yXNCcVjcc0IvqfDbjdgFz00nT9NT3_Gk0M-YO_lBK8VhD7Y9BRRrieoMvfwC3u3w3HAkmUgWTQHw_l_QrvlI-4AaWwk5zXLzn5X1rkEJNFdsgupiv5MonHlKCP-wBMq4ACLnWb0hE5zPSbA9R7_pnfnpjJUAetGN5Jr3_KKpfBOwigc4Fa2WU0ZBXb5BybRf.webp?alt=media&token=3421c86d-e1ce-4842-a69c-f72a67612a25",
  //       //     "https://firebasestorage.googleapis.com/v0/b/ecars-de7bc.appspot.com/o/cars%2Fee624a58-fbd8-4e4b-9554-50166670e82d%2FHx-9DwCtkkpFWq0y2m4qV_-lamtYFi9oLv9gSxS31BfUbR_yXNCcVzUR24jqezi1cQQmhRPbp4mkr29nPetarlsdrQsXuokWFx6zfoMvfwC3u3w3HAkmUgWTQHw_l_QrvlI-4AaWwk5zXLzn5X1rkEJNFdsgupiv5MonHlKCP-wBMq4ACLnWb0hE5zPSbA9R7_pnfnpjJUAetGN5Jr3_KKpfBOwigc4Fa2WU0ZBXb5BybRf.webp?alt=media&token=46d8f28a-b7c8-41a6-8293-1206965e1094",
  //       //   ],
  //       // });

  //       // await setDoc(doc(citiesRef, "Acura"), {
  //       //   name: "Los Angeless",
  //       //   state: "CAs",
  //       //   country: "USAs",
  //       //   capital: false,
  //       //   population: 39000020,
  //       // });

  //       // await setDoc(doc(db, "cars", "car1"), {
  //       //   name: "Tset",
  //       //   state: "CAci",
  //       //   country: "USAch",
  //       // });
  //       // await setDoc(doc(db, "cars", "car2"), {
  //       //   name: "Tset2",
  //       //   state: "CAc2i",
  //       //   country: "U2SAch",
  //       // });
  //       // await setDoc(doc(db, "cars", "car3"), {
  //       //   name: "Tset3",
  //       //   state: "CAc3i",
  //       //   country: "U3SAch",
  //       // });
  //       // await setDoc(doc(db, "cars", "car4"), {
  //       //   name: "Tset4",
  //       //   state: "CAc4i",
  //       //   country: "U4SAch",
  //       // });

  //       // await setDoc(doc(citiesRef, "DC"), {
  //       //   name: "Washington, D.C.",
  //       //   state: null,
  //       //   country: "USA",
  //       //   capital: true,
  //       //   population: 680000,
  //       // });
  //       // await setDoc(doc(citiesRef, "TOK"), {
  //       //   name: "Tokyo",
  //       //   state: null,
  //       //   country: "Japan",
  //       //   capital: true,
  //       //   population: 9000000,
  //       // });
  //       // await setDoc(doc(citiesRef, "BJ"), {
  //       //   name: "Beijing",
  //       //   state: null,
  //       //   country: "China",
  //       //   capital: true,
  //       //   population: 21500000,
  //       // });

  //       //       // Другие вызовы setDoc...

  //       console.log("Documents successfully added!");
  //     } catch (error) {
  //       console.error("Error adding documents: ", error);
  //     }
  //   };

  //   // Вызываем функцию добавления документов
  //   addCities();
  // }, []);

  useEffect(() => {
    // for (let i = 0; i < 10; i++) {
    const addCars = async () => {
      const carsRef = collection(db, "cars");
      const newID = uuidv4();

      try {
        // await setDoc(doc(carsRef, newID), {
        //   brand: "2",
        //   model: "2",
        //   year: 1991,
        //   price: 121900,
        //   imageUrls: [
        //     "https://firebasestorage.googleapis.com/v0/b/ecars-de7bc.appspot.com/o/cars%2Fee624a58-fbd8-4e4b-9554-50166670e82d%2F1200x900n%20(1).webp?alt=media&token=aef89f5d-ed5e-440d-999e-b73e1da21ce1",
        //     "https://firebasestorage.googleapis.com/v0/b/ecars-de7bc.appspot.com/o/cars%2Fee624a58-fbd8-4e4b-9554-50166670e82d%2F1200x900n%20(2).webp?alt=media&token=3980cb51-0731-464c-92af-6e446ccf02a1",
        //     "https://firebasestorage.googleapis.com/v0/b/ecars-de7bc.appspot.com/o/cars%2Fee624a58-fbd8-4e4b-9554-50166670e82d%2F1200x900n%20(4).webp?alt=media&token=52c39bdd-9402-4302-bdab-68b2983a2579",
        //     "https://firebasestorage.googleapis.com/v0/b/ecars-de7bc.appspot.com/o/cars%2Fee624a58-fbd8-4e4b-9554-50166670e82d%2F1200x900n.webp?alt=media&token=bb43a7a2-bdcb-4f53-8f6e-18732d5867fe",
        //     "https://firebasestorage.googleapis.com/v0/b/ecars-de7bc.appspot.com/o/cars%2Fee624a58-fbd8-4e4b-9554-50166670e82d%2FHx-9DwCtkkpFWq0y2m4qV_-lamtYFi9oLv9gSxS31BfUbR_yXNCcVjAa1IrqLjK0dQB2iELb99ml-jkzMuRf-V5O_Q8Q744TFx_nKokvfwC3u3w3HAkmUgWTQHw_l_QrvlI-4AaWwk5zXLzn5X1rkEJNFdsgupiv5MonHlKCP-wBMq4ACLnWb0hE5zPSbA9R7_pnfnpjJUAetGN5Jr3_KKpfBOwigc4Fa2WU0ZBXb5BybRf.webp?alt=media&token=48d42fd5-3b4f-4f40-aa58-2b69f03c14c9",
        //     "https://firebasestorage.googleapis.com/v0/b/ecars-de7bc.appspot.com/o/cars%2Fee624a58-fbd8-4e4b-9554-50166670e82d%2FHx-9DwCtkkpFWq0y2m4qV_-lamtYFi9oLv9gSxS31BfUbR_yXNObWDcQ24nqIzPmLgByghKMp4-jqj5kOrdbqgxI-l0R7o0SGBHneNgvfwC3u3w3HAkmUgWTQHw_l_QrvlI-4AaWwk5zXLzn5X1rkEJNFdsgupiv5MonHlKCP-wBMq4ACLnWb0hE5zPSbA9R7_pnfnpjJUAetGN5Jr3_KKpfBOwigc4Fa2WU0ZBXb5BybRf.webp?alt=media&token=d429dc41-00ae-489a-83b3-fe3f8e4976e7",
        //     "https://firebasestorage.googleapis.com/v0/b/ecars-de7bc.appspot.com/o/cars%2Fee624a58-fbd8-4e4b-9554-50166670e82d%2FHx-9DwCtkkpFWq0y2m4qV_-lamtYFi9oLv9gSxS31BfUbR_yXNCcVjcc0IvqfDbjdgFz00nT9NT3_Gk0M-YO_lBK8VhD7Y9BRRrieoMvfwC3u3w3HAkmUgWTQHw_l_QrvlI-4AaWwk5zXLzn5X1rkEJNFdsgupiv5MonHlKCP-wBMq4ACLnWb0hE5zPSbA9R7_pnfnpjJUAetGN5Jr3_KKpfBOwigc4Fa2WU0ZBXb5BybRf.webp?alt=media&token=3421c86d-e1ce-4842-a69c-f72a67612a25",
        //     "https://firebasestorage.googleapis.com/v0/b/ecars-de7bc.appspot.com/o/cars%2Fee624a58-fbd8-4e4b-9554-50166670e82d%2FHx-9DwCtkkpFWq0y2m4qV_-lamtYFi9oLv9gSxS31BfUbR_yXNCcVzUR24jqezi1cQQmhRPbp4mkr29nPetarlsdrQsXuokWFx6zfoMvfwC3u3w3HAkmUgWTQHw_l_QrvlI-4AaWwk5zXLzn5X1rkEJNFdsgupiv5MonHlKCP-wBMq4ACLnWb0hE5zPSbA9R7_pnfnpjJUAetGN5Jr3_KKpfBOwigc4Fa2WU0ZBXb5BybRf.webp?alt=media&token=46d8f28a-b7c8-41a6-8293-1206965e1094",
        //   ],
        // });

        await setDoc(doc(carsRef, newID), {
          index: "19",
          id: "139544bb-079f-4b3f-8948-22cc660bb440",
          dateAdded: "2023-11-03T15:12:13.283Z",
          brand: "BMW",
          model: "1",
          yearMileagePrice: {
            price: 200000,
            year: 2023,
            mileage: 31,
          },

          transmission: "Automatic",
          fuel: "Gasoline",
          wheels: "23",
          vehicleType: "Sedan",
          engineCapacity: "4.0",
          seats: "5",
          owners: "0",
          color: "Black",
          interior: "Black",
          location: "Minsk",
          exportStatus: "Can be exported",
          description:
            'Новый АSTON MARTIN DBX707 Q-Series в наличии в Минске. Автомобиль для рынка РФ (зимний пакет, доп защиты и т.п.), полностью растаможен без Киргизских и прочих схем, ПТС получен. Заказывался в подразделении Aston Martin "Q": Кузов цвета Nero Daytona из палитры Ferrari, салон эксклюзивная кожа Partlona Frau цвета Rosso Ferrari c контрастным швом и вставками цвета Sabbia. Единственный автомобиль в таком сочетании в мире.',
          dateObj: {
            year: 2023,
            month: 11,
            day: 3,
            hours: 18,
            minutes: 12,
          },
          imageUrls: [
            "https://firebasestorage.googleapis.com/v0/b/ecars-de7bc.appspot.com/o/cars%2F139544bb-079f-4b3f-8948-22cc660bb440%2FibguyOxE2sbNOTnJ0nxaB4vh_OJdFaCA2SW9r-2jB0ScawOrEMvTbPKUqSRR7ESjaWRdg1wHm1T8gNuj0JzKMTzJXsnpII7nDdlN7XapD9M-pV0HvMFxdamXCo3u4GRHTh1AuXMfNyinZW1QdwrEV3kQGsdrwr_yycAvttS7nnD4qW_4_MSr0E-biAwRXunk6fBZAf5FdVJ7Fqjvn8LW9z59wmtBzTVKt7FOsUS5UwdLAfq.webp?alt=media&token=714c5c3e-f2e3-40ef-bd0c-d6d8518417a5",
            "https://firebasestorage.googleapis.com/v0/b/ecars-de7bc.appspot.com/o/cars%2F139544bb-079f-4b3f-8948-22cc660bb440%2FibguyOxE2sbNOTnJ0nxaB4vh_OJdFaCA2SW9r-2jB0ScawOrEMvTPLLk2URx_cUm3CEdA3wHjiTs0Otm5SlfEUypa5wsMO7neLkt-AbcbhLelX0DONHhcEqHC23u0bVGn62gWQHudzkTcK0i1w0xxohD6QSZk43BSXH-52fITvB5iG-JPQXZkF8Zid-BT0nFi5F7QbzVxqLLJWkczGMFNv8vcmvT7BUpx1NMEWSaYfSZo7t.webp?alt=media&token=dcbc6bb2-f250-4cf0-a6bd-6f34d0b6e5a1",
            "https://firebasestorage.googleapis.com/v0/b/ecars-de7bc.appspot.com/o/cars%2F139544bb-079f-4b3f-8948-22cc660bb440%2FibguyOxE2sbNOTnJ0nxaB4vh_OJdFaCA2SW9r-2jB0ScawOrEMvTTHKU6WRRvcUDvCStE_xHiwT5oNuD5QxKBFzMe5zJwK6nLaw96AP53hLelX0DONHhcEqHC23u0bVGn62gWQHudzkTcK0i1w0xxohD6QSZk43BSXH-52fITvB5iG-JPQXZkF8Zid-BT0nFi5F7QbzVxqLLJWkczGMFNv8vcmvT7BUpx1NMEWSaYfSZo7t.webp?alt=media&token=58f053a9-aec8-438e-bc71-836408bd0047",
            "https://firebasestorage.googleapis.com/v0/b/ecars-de7bc.appspot.com/o/cars%2F139544bb-079f-4b3f-8948-22cc660bb440%2FibguyOxE2sbNOTnJ0nxaB4vh_OJdFaCA2SW9r-2jB0ScawOrEMvTXPLEGVRB7cXDnFENlnw3OxT85cuTkGxqZOy8G4w5NZ7yfalN_XbZ3hLelX0DONHhcEqHC23u0bVGn62gWQHudzkTcK0i1w0xxohD6QSZk43BSXH-52fITvB5iG-JPQXZkF8Zid-BT0nFi5F7QbzVxqLLJWkczGMFNv8vcmvT7BUpx1NMEWSaYfSZo7t.webp?alt=media&token=718b5633-4419-446f-8805-a15e67d12293",
          ],
        });

        console.log("Documents successfully added!");
      } catch (error) {
        console.error("Error adding documents: ", error);
      }
    };

    // Вызываем функцию добавления документов
    addCars();
    // }
  }, []);

  return (
    <div className={style.login}>
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
              <option value="Station Wagon">Station Wagon</option>
              <option value="Convertible">Convertible</option>
              <option value="Pick Up">Pick Up</option>
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
              <option value="Saint-Petersburg">Saint-Petersburg</option>
              <option value="Moscow">Moscow</option>
              <option value="Almaty">Almaty</option>
              <option value="Minsk">Minsk</option>
              <option value="Abu Dhabi">Abu Dhabi</option>
              <option value="Shanghai">Shanghai</option>
            </select>
          </label>
        </div>

        <div className={formErrors.owners ? style.error : ""} ref={ownersRef}>
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
