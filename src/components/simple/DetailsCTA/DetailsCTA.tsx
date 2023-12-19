import React from "react";
import {useState, useRef} from "react";
import style from "./__detailsCTA.module.scss";
import {ReactComponent as CheckMarkDetails} from "../../../assets/icons/checkMarkDetails.svg";
import {ReactComponent as DownloadIcon} from "../../../assets/icons/downloadIcon.svg";
import {ReactComponent as LikeIcon} from "../../../assets/icons/likeIcon.svg";
import {ReactComponent as ShareIcon} from "../../../assets/icons/shareIcon.svg";

import Email from "../../../components/ui/Email/Email";
import Mobile from "../../../components/ui/Mobile/Mobile";

interface DateObject {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
}

interface Props {
  brand: string | undefined;
  model: string | undefined;
  price: string | undefined;
  year: number | undefined;
  location: string | undefined;
  exportStatus: string | undefined;
  mileage: string | undefined;
  dateObj: DateObject | undefined;
  selectedCurrency: string;
  usdValue: number;
  eurValue: number;
  addLiked: () => void;
  liked: boolean;
  handleLike: () => void;
  sellerEmail: string | undefined;
  sellerName: string | undefined;
  sellerMobile: string | undefined;
}

export default function DetailsCTA({
  brand,
  model,
  price,
  year,
  location,
  exportStatus,
  mileage,
  dateObj,
  selectedCurrency,
  usdValue,
  eurValue,
  addLiked,
  liked,
  handleLike,
  sellerEmail,
  sellerName,
  sellerMobile,
}: Props) {
  const black: string = "#1A1A1A";
  // console.log(dateObj.year);

  // const [likeded, setLikeded] = useState<boolean>(liked);

  let multiplier: number =
    selectedCurrency === "RUB"
      ? usdValue
      : selectedCurrency === "EUR"
      ? usdValue / eurValue
      : 1;
  // console.log(multiplier);

  const newPrice = Number(price) * multiplier;
  const currentPrice = parseInt(newPrice.toFixed(0));

  const formattedPrice: string = currentPrice
    .toLocaleString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  // const formattedMileage: string = mileage
  //   .toLocaleString()
  //   .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
  const monthNames: {[key: number]: string} = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };
  // console.log(monthNames[dateObj.month]);
  // console.log(dateObj.month);

  // const likeCar = () => {
  //   // setLikeded(!liked);
  //   addLiked();
  // };
  // console.log(liked);
  let formatedBrand;
  let formatedModel;

  if (brand) {
    const capitalizeWords = (brand: string) => {
      const words = brand.toLowerCase().split(" ");
      const capitalizeWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });
      return capitalizeWords.join(" ");
    };

    formatedBrand = capitalizeWords(brand);
  }
  if (model) {
    formatedModel = model.toLocaleUpperCase();
  }

  return (
    <div
      className={`${style.CTA} ${window.innerWidth <= 768 ? style.mobile : ""}`}
    >
      <div className={style.CTA__info}>
        <div className={style.info__top}>
          <div className={style.saveAndShare}>
            <span>
              <i onClick={handleLike}>
                <LikeIcon className={liked ? style.liked : ""} />
              </i>
              Save
            </span>
            <span>
              <i>
                <ShareIcon />
              </i>
              Share
            </span>
          </div>
          <h5>
            {formatedBrand}
            <br />
            {formatedModel}
          </h5>
          <h4>
            {selectedCurrency === "RUB"
              ? `₽ `
              : selectedCurrency === "USD"
              ? "$ "
              : selectedCurrency === "EUR"
              ? "€ "
              : ""}

            {formattedPrice}
          </h4>
          <table>
            <tbody>
              <tr>
                <td>Year</td>
                <td>{year}</td>
              </tr>
              <tr>
                <td>Mileage</td>
                <td>{mileage + " km"}</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>
                  {location === "SaintPetersburg"
                    ? "Saint-Petersburg"
                    : location === "AbuDhabi"
                    ? "Abu Dhabi"
                    : location}
                </td>
              </tr>
              <tr>
                <td>Export status</td>
                <td>{exportStatus}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={style.info__bottom}>
          <span>
            Interested in this car or want a personalized offer of the best
            deals?
          </span>
          <p>
            Contact us and our manager will give you all the information you
            need.
          </p>
          <button
            className={style.checkAvail}
            onClick={() => window.open("https://t.me/+79214003269", "_blank")}
          >
            Check availability
          </button>
          <div
            className={
              sellerEmail && sellerMobile
                ? style.contacts
                : style.contactsOneBtn
            }
          >
            {sellerMobile && (
              <button
                onClick={() =>
                  window.open(`https://wa.me/${sellerMobile}`, "_blank")
                }
              >
                <Mobile color={black} number={sellerMobile} />
              </button>
            )}

            {sellerEmail && (
              <button
                onClick={() =>
                  (window.location.href = `mailto:${
                    sellerEmail ? sellerEmail : ""
                  }`)
                }
              >
                <Email color={black} email={sellerEmail} />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={style.CTA__inspection}>
        <div className={style.inspection__report}>
          <div className={style.inspection__top}>
            <h5>Vehicle inspection</h5>
            <div className={style.inspected__label}>
              <i>
                <CheckMarkDetails />
              </i>
              inspected
            </div>
          </div>

          <table>
            <tbody>
              <tr>
                <td>Accidents or damage</td>
                <td>None reported</td>
              </tr>
              <tr>
                <td>Mileage comparison</td>
                <td>15,000 km</td>
              </tr>
              <tr>
                <td>1-owner vehicle</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Basic maintenance</td>
                <td>Passed</td>
              </tr>
            </tbody>
          </table>
          <div className={style.download}>
            <i>
              <DownloadIcon />
            </i>
            <span> Download the basic report</span>
          </div>
        </div>
        <div className={style.full_inspection}>
          <span>Full Inspection</span>
          <p>
            A complete inspection and history check. In addition, we send you
            lots of photos and videos of the car to help you make that important
            purchase.
          </p>
          <button>Book a full inspection</button>
          <a href="">Learn more about the full inspection</a>
        </div>
        <div className={style.CTA__added}>
          <span>Added:</span>
          <b>
            {dateObj?.day} {dateObj && monthNames[dateObj?.month]},{" "}
            {dateObj?.year}{" "}
          </b>
          <span>
            {" "}
            {dateObj?.hours}:{dateObj?.minutes}
          </span>
        </div>
      </div>
    </div>
  );
}
