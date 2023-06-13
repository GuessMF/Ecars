import React from "react";
import style from "./__reviews.module.scss";
import {ReactComponent as LeftArrow} from "../../../assets/icons/specialOffers/leftArrow.svg";
import {ReactComponent as RightArrow} from "../../../assets/icons/specialOffers/rightArrow.svg";
import ReviewCard from "../../smart/ReviewCard/ReviewCard";

export default function Reviews() {
  return (
    <div className={style.reviews}>
      <div className={style.reviews__content}>
        <div className={style.reviews__header}>
          <h2>Our happy clients say about us</h2>
          <div className={style.reviews__navigation}>
            <LeftArrow />
            <RightArrow />
          </div>
        </div>
        <div className={style.reviews__corousel}>
          {/* <div className={style.reviews__card}></div> */}
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>
      </div>
    </div>
  );
}
