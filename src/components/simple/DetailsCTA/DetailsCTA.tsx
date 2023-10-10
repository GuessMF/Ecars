import React from "react";
import style from "./__detailsCTA.module.scss";
import {ReactComponent as CheckMarkDetails} from "../../../assets/icons/checkMarkDetails.svg";
import {ReactComponent as DownloadIcon} from "../../../assets/icons/downloadIcon.svg";
import {ReactComponent as LikeIcon} from "../../../assets/icons/likeIcon.svg";
import {ReactComponent as ShareIcon} from "../../../assets/icons/shareIcon.svg";

import Email from "../../../components/ui/Email/Email";
import Mobile from "../../../components/ui/Mobile/Mobile";
export default function DetailsCTA() {
  const black: string = "#1A1A1A";
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
            Toyota Land Cruiser 2017 ZX-G Frontier Face-Lifted Petrol 4.6L
            Sunroof 4WD
          </h5>
          <h4>$45,995</h4>
          <table>
            <tr>
              <td>Year</td>
              <td>2017</td>
            </tr>
            <tr>
              <td>Kilometers</td>
              <td>15,000</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>Dubai</td>
            </tr>
            <tr>
              <td>Export status</td>
              <td>Can be exported</td>
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
          <button className={style.checkAvail}>Check availability</button>
          <div className={style.contacts}>
            <button>
              <Mobile color={black} />
            </button>
            <button>
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
        <b>Jan 6, 2023</b>
        <span>• Views:</span> <b>38</b>
      </div>
    </div>
  );
}
