import React from "react";
import {useState, useEffect} from "react";
import style from "./__details.module.scss";
import {useParams} from "react-router-dom";
// import {cars} from '../../helpers/cars.json'
// import {cars} from "../../helpers/carList";
// import jsonData from "../../helpers/cars.json";

// import {ReactComponent as RightArrow} from "../../../assets/icons/specialOffers/rightArrow.svg";
import {ReactComponent as RightArrow} from "../../assets/icons/specialOffers/rightArrow.svg";
import ContactUsBlock from "../../components/simple/ContactUsBlock/ContactUsBlock";
import Email from "../../components/ui/Email/Email";
import Mobile from "../../components/ui/Mobile/Mobile";
import {ReactComponent as CheckMarkDetails} from "../../assets/icons/checkMarkDetails.svg";
import {ReactComponent as DownloadIcon} from "../../assets/icons/downloadIcon.svg";
import {ReactComponent as LikeIcon} from "../../assets/icons/likeIcon.svg";
import {ReactComponent as ShareIcon} from "../../assets/icons/shareIcon.svg";
import DetailsCTA from "../../components/simple/DetailsCTA/DetailsCTA";

import Skeleton from "../../components/ui/Skeleton/Skeleton";

import {ref, listAll, getDownloadURL, getStorage} from "firebase/storage";
import {log} from "console";
// import { listAll, getDownloadURL } from 'firebase/storage';
import {getDocs} from "firebase/firestore/lite";
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import SelectedFilter from "../../components/ui/SelectedFilter/SelectedFilter";

// interface RouteParams {
//   id: string;
//   [key: string]: string | undefined;
// }
// interface Car {
//   id: string;
//   brand: string;
//   model: string;
//   price?: string;
//   year?: string;
// }
interface DataItem {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;

  // Добавьте другие свойства объекта данных, если необходимо
}
interface DateObject {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
}

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

interface DetailsProps {
  selectedCurrency: string;
  eurValue: number;
  usdValue: number;
}
export default function Details({
  selectedCurrency,
  eurValue,
  usdValue,
}: DetailsProps) {
  const black: string = "#1A1A1A";
  const [carData, setCarData] = useState(null);

  const [photoURLs, setPhotoURLs] = useState<string[]>([]);
  const {id} = useParams<{id?: string}>(); // Тип id может быть строкой или undefined

  const [selectedPhoto, setSelectedPhoto] = useState(0);

  useEffect(() => {
    const loadPhotosFromFirebase = async (currentIndex?: string) => {
      const folderRef = ref(storage, `cars/${currentIndex}`);
      try {
        const photoList = await listAll(folderRef);
        const urls = await Promise.all(
          photoList.items.map(async (photo) => {
            return await getDownloadURL(photo);
          })
        );
        setPhotoURLs(urls);
        // console.log(photoURLs);
      } catch (error) {
        console.error("Error loading photos from Firebase:", error);
      }
    };

    const currentIndex = id; // Ваш текущий индекс
    loadPhotosFromFirebase(currentIndex);
  }, [id]);

  const [currentCar, setCurrentCar] = useState<{
    brand: string;
    model: string;
    price: number;
    year: number;
    mileage: number;
    transmission: string;
    fuel: string;
    wheels: number;
    vehicleType: string;
    engineCapacity: number;
    owners: string;
    seats: number;
    color: string;
    interior: string;
    location: string;
    exportStatus: string;
    description: string;
    dateObj: DateObject;
  } | null>(null);

  useEffect(() => {
    fetch("https://65378b85bb226bb85dd365a6.mockapi.io/cars")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        const foundObject = json.find((item: {id: string}) => item.id === id);
        if (foundObject) {
          // console.log("Найденный объект:", foundObject);
          setCurrentCar({
            brand: foundObject.brand,
            model: foundObject.model,
            price: foundObject.price,
            year: foundObject.year,
            transmission: foundObject.transmission,
            owners: foundObject.owners,
            fuel: foundObject.fuel,
            wheels: foundObject.wheels,
            color: foundObject.color,
            vehicleType: foundObject.vehicleType,
            engineCapacity: foundObject.engineCapacity,
            seats: foundObject.seats,
            interior: foundObject.interior,
            location: foundObject.location,
            exportStatus: foundObject.exportStatus,

            mileage: foundObject.mileage,
            description: foundObject.description,
            dateObj: foundObject.dateObj,
          });
        } else {
          console.log("Объект с id", id, "не найден.");
        }
      })
      .catch((error) => {
        console.error("Произошла ошибка при получении данных:", error);
      });
  }, []);

  // if (filteredData.length === 0) {
  //   return <div>Объект с id {id} не найден</div>;
  // }
  // const {brand, model, year, price} = filteredData[0];

  let mileage: string | undefined = currentCar?.mileage
    .toLocaleString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  return (
    <div className={style.details}>
      <div className={style.topNavigation}>
        <span>Home</span>
        <i>
          <RightArrow />
        </i>
        <span>Used cars for slae in Dubai</span>
        <i>
          <RightArrow />
        </i>
        <span>Toyota</span>
        <i>
          <RightArrow />
        </i>
        <span>Toyota Land Cruiser</span>
      </div>
      {currentCar !== null ? (
        <div className={style.details__main}>
          <div className={style.content}>
            <div className={style.content__pictures}>
              <div className={style.bigPicture}>
                <img src={photoURLs?.[selectedPhoto]} alt="pic" />
              </div>
              <div className={style.littlePictures}>
                {photoURLs.map((img, index) => (
                  <img
                    className={style.little_preview}
                    src={img}
                    onClick={() => setSelectedPhoto(index)}
                  />
                ))}
              </div>
              <div></div>
            </div>

            {window.innerWidth <= 768 && (
              <DetailsCTA
                brand={currentCar.brand}
                model={currentCar.model}
                price={currentCar.price}
                location={currentCar.location}
                exportStatus={currentCar.exportStatus}
                year={currentCar.year}
                mileage={currentCar.mileage}
                dateObj={currentCar.dateObj}
                selectedCurrency={selectedCurrency}
                usdValue={usdValue}
                eurValue={eurValue}
              />
            )}

            <div className={style.content__mainInformation}>
              <div className={style.left__information}>
                <div>
                  <span>Make</span> <span>{currentCar.brand}</span>
                </div>
                <div>
                  <span>Model</span> <span>{currentCar.model}</span>
                </div>

                <div>
                  <span>Vehicle type</span>
                  <span>{currentCar.vehicleType}</span>
                </div>
                <div>
                  <span>Color</span>
                  <span>{currentCar.color}</span>
                </div>
                <div>
                  <span>Interior</span> <span>{currentCar.interior}</span>
                </div>
                <div>
                  <span>Owners</span>{" "}
                  <span>
                    {currentCar.owners === "0"
                      ? "None"
                      : currentCar.owners
                      ? "4"
                      : "3+"}
                  </span>
                </div>

                <div>
                  <span>Mileage</span> <span>{mileage + " km"}</span>
                </div>
              </div>
              <div className={style.right__information}>
                <div>
                  <span>Year</span> <span>{currentCar.year}</span>
                </div>
                <div>
                  <span>Gearbox</span> <span>{currentCar.transmission}</span>
                </div>
                <div>
                  <span>Engine Volume</span>{" "}
                  <span>{currentCar.engineCapacity}</span>
                </div>

                <div>
                  <span>Fuel</span> <span>{currentCar.fuel}</span>
                </div>
                <div>
                  <span>Wheels</span> <span>{"R " + currentCar.wheels}</span>
                </div>

                <div>
                  <span>Seats</span> <span>{currentCar.seats}</span>
                </div>

                <div>
                  <span>Location</span> <span>{currentCar.location}</span>
                </div>
              </div>
            </div>
            <div className={style.content__description}>
              <h5>Description</h5>
              <div className={style.description}>{currentCar.description}</div>
              <div>MORE</div>
            </div>
            <div className={style.content__features}>
              <h5>Features</h5>
              <div className={style.features}>
                {" "}
                <div className={style.features_left}>
                  {" "}
                  <span>Interior</span>
                  <ul>
                    <li>Air conditioning</li>
                    <li>Bluetooth system</li>
                    <li>Climate control</li>
                    <li>Cooled front seats</li>
                    <li>Cruise control</li>
                    <li>Heated seats</li>
                    <li>Leather seats</li>
                    <li>Sunroof</li>
                    <li>Navigation system</li>
                    <li>Power locks</li>
                    <li>Power seats</li>
                    <li>Power windows</li>
                    <li>Premium sound system</li>
                    <li>Tuner/radio</li>
                    <li>Rear camera</li>
                  </ul>
                </div>
                <div className={style.features_right}>
                  <span>Exterior</span>
                  <ul>
                    <li>Rear camera</li>
                    <li>Keyless go</li>
                    <li>Performance tyres</li>
                    <li>Premium paint</li>
                  </ul>
                  <span>Security & Environment</span>
                  <ul>
                    <li>4WD</li>
                    <li>ABS</li>
                    <li>Adaptive lighting</li>
                    <li>Airbags (front and side)</li>
                    <li>Tinted windows</li>
                    <li>All wheel drive</li>
                    <li>Adaptive cruise control</li>
                    <li>Traction control</li>
                    <li>Differential lock</li>
                  </ul>
                </div>
              </div>
            </div>
            <ContactUsBlock />
            <div className={style.content__quick_links}>
              <h5>Quick links</h5>
              <div className={style.links}>
                <a href="">Toyota Land Cruiser for sale in Dubai</a>
                <a href="">Toyota Land Cruiser 2017</a>
                <a href="">Toyota for sale in Dubai</a>
                <a href="">All cars for sale in Dubai</a>
              </div>
            </div>
            <div className={style.content__similar_cars}>
              <h5>Similar Cars</h5>
            </div>
          </div>

          {window.innerWidth > 768 && (
            <DetailsCTA
              brand={currentCar.brand}
              model={currentCar.model}
              price={currentCar.price}
              location={currentCar.location}
              exportStatus={currentCar.exportStatus}
              year={currentCar.year}
              mileage={currentCar.mileage}
              dateObj={currentCar.dateObj}
              selectedCurrency={selectedCurrency}
              usdValue={usdValue}
              eurValue={eurValue}
            />
          )}
        </div>
      ) : (
        <p>Данные не загружены</p>
      )}

      {/* <div className={style.testGAPI}>
        <Skeleton />
      </div> */}
    </div>
  );
}
