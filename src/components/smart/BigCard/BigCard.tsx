import React from "react";

import {useState, useEffect} from "react";
import style from "./__bigCard.module.scss";
import Details from "../../ui/Details/Details";
import {NavLink} from "react-router-dom";
import Skeleton from "components/ui/Skeleton/Skeleton";
import {useAuth} from "hooks/use-auth";
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
  // onLoad: () => void;
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
}: // onLoad,
Props) {
  let multiplier: number =
    selectedCurrency === "RUB"
      ? usdValue
      : selectedCurrency === "EUR"
      ? usdValue / eurValue
      : 1;
  // console.log(multiplier);
  const {isAuth, email, displayName} = useAuth();
  const newPrice = Number(price) * multiplier;
  const currentPrice = parseInt(newPrice.toFixed(0));

  const formattedPrice: string = currentPrice
    .toLocaleString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  const owner = Number(owners);
  // to={`${isAuth ? `/details/${car.id}` : `/login`}`}

  // to={`/details/${id}`}
  return (
    <NavLink to={`${isAuth ? `/details/${id}` : `/login`}`}>
      <div className={style.bigCard}>
        <div className={style.bigCard__image}>
          <img className={style.bigCard__img} src={previewIMG} loading="lazy" />
        </div>
        <div className={style.bigCard__information}>
          <div className={style.information__top}>
            <div className={style.information__name}>
              <span>{brand}</span>
              <span>{model}</span>
            </div>

            <div className={style.information__state}>
              {location} • {mileage < 20 ? "Brand NEW" : "Used"} • {mileage} km
              {owner === 0 ? " " : " • " + owner + " Owners"}
            </div>
            <div className={style.information__description}>{description}</div>
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
  );
}
