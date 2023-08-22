import React, {useEffect, useState} from "react";
import style from "./__reviews.module.scss";
import {ReactComponent as LeftArrow} from "../../../assets/icons/specialOffers/leftArrow.svg";
import {ReactComponent as RightArrow} from "../../../assets/icons/specialOffers/rightArrow.svg";
import ReviewCard from "../../smart/ReviewCard/ReviewCard";

export default function Reviews() {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const screenWidth = windowWidth;

  return (
    <div className={style.reviews}>
      <div className={style.reviews__content}>
        <div className={style.reviews__header}>
          <h2>Our happy clients say about us</h2>
          <div className={style.reviews__navigation}>
            <LeftArrow className={style.arrow} />
            <RightArrow className={style.arrow} />
          </div>
        </div>
        <div className={style.reviews__corousel}>
          {/* <div className={style.reviews__card}></div> */}
          <ReviewCard />
          <ReviewCard />
          {screenWidth > 768 ? <ReviewCard /> : null}
        </div>
      </div>
    </div>
  );
}
