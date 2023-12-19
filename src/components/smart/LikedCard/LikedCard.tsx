import React from "react";

import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";

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
import style from "./__likedCard.module.scss";
import {useAppSelector} from "hooks/redux-hooks";

import {LazyLoadImage} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

type Props = {
  id: string;
  index: number;
  brand: string;
  model: string;
  price: string;
  year: string;
  fuel: string;
  owners: string;
  location: string;
  mileage: number;
  description: string;
  previewIMG: string;
};

export default function LikedCard({
  id,
  index,
  brand,
  model,
  price,
  year,
  fuel,
  owners,
  location,
  mileage,
  description,
  previewIMG,
}: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const selectedCurrency = useAppSelector(
    (state) => state.currency.currencyTerm
  );

  const usdValue = useAppSelector((state) => state.currValue.usdValue);
  const eurValue = useAppSelector((state) => state.currValue.eurValue);

  let multiplier: number =
    selectedCurrency === "RUB"
      ? usdValue
      : selectedCurrency === "EUR"
      ? usdValue / eurValue
      : 1;

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImageLoaded(true);
    };
    image.src = previewIMG; // Подставьте свой путь к изображению из carData
  }, [previewIMG]);

  const capitalizeWords = (brand: string) => {
    const words = brand.toLowerCase().split(" ");
    const capitalizeWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizeWords.join(" ");
  };

  const formatedBrand = capitalizeWords(brand);
  const formattedMileage: string = mileage
    .toLocaleString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  const newPrice = Number(price) * multiplier;
  const currentPrice = parseInt(newPrice.toFixed(0));

  const formattedPrice: string = currentPrice
    .toLocaleString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  return (
    <div className={style.likedCard}>
      <div className={style.top}>
        <LazyLoadImage
          className={style.image}
          effect="blur" // Добавляет эффект размытия
          src={previewIMG}
          alt="Car Preview"
        />
      </div>
      <div className={style.bottom}>
        <div className={style.brandModelYear}>
          <h6>{mileage < 20 ? "Brand NEW" : "Used"}</h6>
          <h5>{formatedBrand}</h5>
          <h5>{model.toLocaleUpperCase()}</h5>
          <h6>{year}</h6>
        </div>
        <div className={style.ownersFuelMilleage}>
          <span>
            {location === "SaintPetersburg"
              ? "Saint-Petersburg"
              : location === "AbuDhabi"
              ? "Abu Dhabi"
              : location}{" "}
            •
          </span>
          <span>
            {formattedMileage} km • {owners}{" "}
            {owners === "One" ? " Owner" : "Owners"} •
          </span>
          <span>{fuel}</span>
        </div>
        <span className={style.price}>
          {" "}
          {selectedCurrency === "RUB"
            ? `₽ `
            : selectedCurrency === "USD"
            ? "$ "
            : selectedCurrency === "EUR"
            ? "€ "
            : ""}
          {formattedPrice}
          <Details />
        </span>
      </div>
    </div>
  );
}
