import React from "react";
import {useState, useEffect} from "react";
import style from "./__details.module.scss";
import {useParams} from "react-router-dom";
// import {cars} from '../../helpers/cars.json'
// import {cars} from "../../helpers/carList";
import jsonData from "../../helpers/cars.json";

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
export default function Details() {
  const black: string = "#1A1A1A";
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
        console.log(photoURLs);
      } catch (error) {
        console.error("Error loading photos from Firebase:", error);
      }
    };

    const currentIndex = id; // Ваш текущий индекс
    loadPhotosFromFirebase(currentIndex);
  }, [id]);

  if (id === undefined) {
    return <div>Параметр id не определен</div>;
  }
  const filteredData: DataItem[] = jsonData.filter(
    (item: DataItem) => item.id.toString() === id
  );
  if (filteredData.length === 0) {
    return <div>Объект с id {id} не найден</div>;
  }
  const {brand, model, year, price} = filteredData[0];

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

          {window.innerWidth <= 768 && <DetailsCTA />}

          <div className={style.content__mainInformation}>
            <div className={style.left__information}>
              <div>
                <span>Make</span> <span>{brand}</span>
              </div>
              <div>
                <span>Model</span> <span>{model}</span>
              </div>
              <div>
                <span>Year</span> <span>{year}</span>
              </div>
              <div>
                <span>Wheels</span> <span>18</span>
              </div>
              <div>
                <span>Vehicle type</span> <span>SUV/Crossover</span>
              </div>
              <div>
                <span>Kilometers</span> <span>15,000</span>
              </div>
            </div>
            <div className={style.right__information}>
              <div>
                <span>Gearbox</span> <span>Automatic</span>
              </div>
              <div>
                <span>Fuel</span> <span>LGasoline</span>
              </div>
              <div>
                <span>Seats</span> <span>8</span>
              </div>
              <div>
                <span>Cylinders</span> <span>8</span>
              </div>
              <div>
                <span>Interior</span> <span>Black</span>
              </div>
              <div>
                <span>Location</span> <span>Dubai</span>
              </div>
              <div>
                <span>Export status</span> <span>Can be exported</span>
              </div>
            </div>
          </div>
          <div className={style.content__description}>
            <h5>Description</h5>
            <div className={style.description}>
              Toyota Land Cruiser 2017 ZX-G Frontier Face-Lifted Petrol 4.6L
              Sunroof 4WD AT 7 Electric Leather Seats [RHD Japan Import] Premium
              Condition.
              ----------------------------------------------------------------------------------------------------------------------
              Quis blandit turpis cursus in hac. In hendrerit gravida rutrum
              quisque. Pellentesque habitant morbi tristique senectus et. Eget
              gravida cum sociis natoque. Pharetra diam sit amet nisl suscipit
              adipiscing bibendum. Porttitor massa id neque aliquam. In
              fermentum posuere urna nec. Rhoncus aenean vel elit scelerisque
              mauris pellentesque. Nullam ac tortor vitae purus faucibus ornare
              suspendisse sed nisi. Consequat id porta nibh venenatis cras sed.
            </div>
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

        {window.innerWidth > 768 && <DetailsCTA />}
      </div>
      {/* <div className={style.testGAPI}>
        <Skeleton />
      </div> */}
    </div>
  );
}
