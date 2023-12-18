import React from "react";
import style from "./__littleCard.module.scss";
import Details from "../../ui/Details/Details";
// import img from "../../../assets/images/LittleCard/2021_Genesis_GV80_2.5T.webp";
// import Like from "../../ui/Like/Like";
import Choose from "components/ui/Choose/Choose";

import {useAppSelector} from "hooks/redux-hooks";

interface Props {
  brand: string;
  model: string;
  price: string;
  special: boolean;
  fuel: string;
  mileage: number;
  owners: string;
  previewIMG: string;
}
export default function LittleCard({
  brand,
  model,
  price,
  fuel,
  mileage,
  owners,
  special,
  previewIMG,
}: Props) {
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

  // let multiplier = 1;

  const newPrice = Number(price) * multiplier;
  const currentPrice = parseInt(newPrice.toFixed(0));

  const formattedPrice: string = currentPrice
    .toLocaleString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  const randomNum = Math.floor(Math.random() * 10) + 5;

  const persent = Number(currentPrice / randomNum).toFixed(0);

  const oldPrice = currentPrice + Number(persent);
  const formattedOldPrice: string = oldPrice
    .toLocaleString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
  // <Like />
  return (
    <div className={style.littleCard}>
      <div className={style.littleCard__previewImg}>
        <img src={previewIMG} width={200} />
        {special && <span>SALE -{randomNum}%</span>}
      </div>
      <div className={style.littleCard__content}>
        <div className={style.littleCard__top}>
          <div className={style.littleCard__name}>
            <span>{brand}</span>
            <span>{model}</span>
          </div>
          <span className={style.littleCard__state}>
            <li>{owners === "0" || mileage < 100 ? "New" : "Used"}</li>
            <li>•</li>
            <li>{mileage} km</li>
            <li>•</li>
            <li>{fuel}</li>
          </span>
        </div>

        <div className={style.littleCard__bottom}>
          <div className={style.littleCard__prices}>
            <span className={style.littleCard__newPrice}>
              {selectedCurrency == "RUB"
                ? "₽"
                : selectedCurrency == "USD"
                ? "$"
                : selectedCurrency == "EUR"
                ? "€"
                : ""}
              {formattedPrice}
            </span>
            {special && (
              <span className={style.littleCard__oldPrice}>
                {selectedCurrency == "RUB"
                  ? "₽"
                  : selectedCurrency == "USD"
                  ? "$"
                  : selectedCurrency == "EUR"
                  ? "€"
                  : ""}
                {formattedOldPrice}
              </span>
            )}
          </div>
          {special ? <Details /> : <Choose />}
        </div>
      </div>
    </div>
  );
}
