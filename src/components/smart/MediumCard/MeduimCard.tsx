import React from "react";
import style from "./__mediumCard.module.scss";
import ddd from "./1200x900n.webp";
type Props = {
  image: string;
  brand: string;
  model: string;
  mileage: string;
  fuel: string;
  price: string;
  id: string;
  year: string;

  selectedCurrency: string;
  usdValue: number;

  eurValue: number;
};
export default function MeduimCard({
  image,
  brand,
  model,
  mileage,
  fuel,
  price,
  year,
  selectedCurrency,
  usdValue,
  eurValue,
  id,
}: Props) {
  let multiplier: number =
    selectedCurrency === "RUB"
      ? usdValue
      : selectedCurrency === "EUR"
      ? usdValue / eurValue
      : 1;

  const newPrice = Number(price) * multiplier;
  const currentPrice = parseInt(newPrice.toFixed(0));

  const formattedPrice: string = currentPrice
    .toLocaleString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  const formattedMileage: string = mileage
    .toLocaleString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  let formatedBrand;

  const capitalizeWords = (brand: string) => {
    const words = brand.toLowerCase().split(" ");
    const capitalizeWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizeWords.join(" ");
  };
  if (brand) {
    formatedBrand = capitalizeWords(brand);
  }

  return (
    <div className={style.mediumCard}>
      <div className={style.mediumCard__img}>
        <img src={image} alt="img" />
      </div>

      <div className={style.information}>
        <div className={style.brandModel}>
          <span>{formatedBrand}</span>
          <span>{model.toLocaleUpperCase()}</span>
          <span>{year}</span>
        </div>
        <div className={style.ownersYearMileage}>
          <span>{Number(mileage) < 100 ? " New" : "Used"}</span>
          <span>{formattedMileage} Km</span>
          <span>{fuel}</span>
        </div>
        <div className={style.prices}>
          <span>
            {selectedCurrency === "RUB"
              ? `₽ `
              : selectedCurrency === "USD"
              ? "$ "
              : selectedCurrency === "EUR"
              ? "€ "
              : ""}{" "}
            {formattedPrice}
          </span>
        </div>
      </div>
    </div>
  );
}
