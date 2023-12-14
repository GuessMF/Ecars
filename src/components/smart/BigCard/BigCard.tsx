import React from "react";

import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import style from "./__bigCard.module.scss";
import Details from "../../ui/Details/Details";
import {NavLink} from "react-router-dom";
import Skeleton from "components/ui/Skeleton/Skeleton";
import {useAuth} from "hooks/use-auth";
import {doc, setDoc, getDoc, deleteDoc} from "firebase/firestore";
import {
  ref,
  listAll,
  getDownloadURL,
  getStorage,
  deleteObject,
  getMetadata,
} from "firebase/storage";
import {db} from "../../../firebase";
import {Swiper as SwiperCore} from "swiper/types";
import {collection, query, getDocs} from "firebase/firestore";
import {LazyLoadImage} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
interface Props {
  id: string;
  index: number;
  brand: string;
  model: string;
  price: string;
  fuel: string;
  owners: string;
  location: string;
  mileage: number;
  description: string;
  previewIMG: string;
  selectedCurrency: string;
  usdValue: number;
  eurValue: number;
  onClickDelete: (id: string, carName: string) => void;
  onClickCheck: (brand: string, id: string) => void;
}

export default function BigCard({
  id,
  index,
  brand,
  model,
  price,
  fuel,
  owners,
  location,
  mileage,
  description,
  previewIMG,
  selectedCurrency,
  eurValue,
  usdValue,
  onClickDelete,
  onClickCheck,
}: // onLoad,
Props) {
  let multiplier: number =
    selectedCurrency === "RUB"
      ? usdValue
      : selectedCurrency === "EUR"
      ? usdValue / eurValue
      : 1;

  const {isAuth, email, displayName} = useAuth();
  const [userPage, setUserPage] = useState<boolean>(false);
  const newPrice = Number(price) * multiplier;
  const currentPrice = parseInt(newPrice.toFixed(0));

  const formattedPrice: string = currentPrice
    .toLocaleString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  const owner = Number(owners);

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImageLoaded(true);
    };
    image.src = previewIMG; // Подставьте свой путь к изображению из carData
  }, [previewIMG]);

  const locationn = useLocation();
  const pathname = locationn.pathname;
  const userPageIndex = pathname.indexOf("/user-page/");
  const storage = getStorage();
  useEffect(() => {
    if (userPageIndex !== -1) {
      setUserPage(true);
    }
  }, []);

  return (
    <div className={style.wrapper}>
      <NavLink to={`${isAuth ? `/details/${id}` : `/login`}`}>
        <div className={style.bigCard}>
          <div className={style.bigCard__image}>
            <LazyLoadImage
              className={style.bigCard__img}
              effect="blur" // Добавляет эффект размытия
              src={previewIMG}
              alt="Car Preview"
            />
          </div>
          <div className={style.bigCard__information}>
            <div className={style.information__top}>
              <div className={style.information__name}>
                <span>
                  {brand.charAt(0).toLocaleUpperCase() + brand.slice(1)}
                </span>
                <span>{model.toLocaleUpperCase()}</span>
              </div>

              <div className={style.information__state}>
                {location} • {mileage < 20 ? "Brand NEW" : "Used"} • {mileage}{" "}
                km
                {owners === "None"
                  ? " "
                  : owners === "One"
                  ? " • One owner"
                  : " • " + owners + " Owners"}
              </div>
              <div className={style.information__description}>
                {description}
              </div>
            </div>

            <div className={style.information__bottom}>
              <span>
                {selectedCurrency === "RUB"
                  ? `₽ `
                  : selectedCurrency === "USD"
                  ? "$ "
                  : selectedCurrency === "EUR"
                  ? "€ "
                  : ""}
                {formattedPrice}
              </span>
              <Details />
            </div>
          </div>
        </div>
      </NavLink>
      {userPage && (
        <button
          // onClick={() => onClickDelete(id, brand)}
          onClick={() => onClickCheck(brand, id)}
          className={style.delBtn}
        >
          delete
        </button>
      )}
    </div>
  );
}
