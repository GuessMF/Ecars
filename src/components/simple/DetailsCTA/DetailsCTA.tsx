import React from "react";
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
  brand: string;
  model: string;
  price: number;
  year: number;
  location: string;
  exportStatus: string;
  mileage: number;
  dateObj: DateObject;
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
}: Props) {
  const black: string = "#1A1A1A";
  console.log(dateObj.year);
  const formattedPrice: string = price
    .toLocaleString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  const formattedMileage: string = mileage
    .toLocaleString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
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
  console.log(monthNames[dateObj.month]);
  console.log(dateObj.month);
  return (
    <div
      className={`${style.CTA} ${window.innerWidth <= 768 ? style.mobile : ""}`}
    >
      <div className={style.CTA__info}>
        <div className={style.info__top}>
          <div className={style.saveAndShare}>
            <span>
              <i>
                <LikeIcon />
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
            {brand}
            <br />
            {model}
          </h5>
          <h4>${formattedPrice}</h4>
          <table>
            <tr>
              <td>Year</td>
              <td>{year}</td>
            </tr>
            <tr>
              <td>Mileage</td>
              <td>{formattedMileage + " km"}</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>{location}</td>
            </tr>
            <tr>
              <td>Export status</td>
              <td>{exportStatus}</td>
            </tr>
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
          <div className={style.contacts}>
            <button
              onClick={() =>
                window.open("https://wa.me/+79214003269", "_blank")
              }
            >
              <Mobile color={black} />
            </button>
            <button
              onClick={() =>
                (window.location.href = `mailto:segas95@yandex.ru`)
              }
            >
              <Email color={black} />
            </button>
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
      </div>
      <div className={style.CTA__added}>
        <span>Added:</span>
        <b>
          {dateObj.day} {monthNames[dateObj.month]}, {dateObj.year}{" "}
        </b>
        <span>
          {" "}
          {dateObj.hours}:{dateObj.minutes}
        </span>
      </div>
    </div>
  );
}
