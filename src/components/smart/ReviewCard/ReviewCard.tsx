import React from "react";
import style from "./__reviewCard.module.scss";
// import star from "../../../assets/icons/reviews/star.svg";
import {ReactComponent as Star} from "../../../assets/icons/reviews/star.svg";
import img from "../../../assets/images/reviews/RobertFox.webp";

export default function ReviewCard() {
  return (
    <div className={style.reviewCard}>
      <div className={style.reviewCard__content}>
        <div className={style.reviewCard__header}>
          <div className={style.reviewCard__block}>
            <img src={img} alt="imgUser" />
            <div className={style.reviewCard_info}>
              <span className={style.reviewCard_name}>Robert Fox</span>
              <span className={style.reviewCard_car}>BMW M850</span>
            </div>
          </div>

          <div
          // className={style.reviewCard__stars}
          >
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
        </div>
        <div className={style.reviewCard__text}>
          “Adipiscing at in tellus integer. Pellentesque massa placerat duis
          ultricies lacus. Nisi porta lorem mollis aliquam ut porttitor leo.
          Venenatis cras sed felis eget. Duis ultricies lacus sed turpis
          tincidunt. Interdum varius sit amet mattis. Libero justo laoreet sit
          amet cursus sit amet dictum sit. Consequat interdum varius sit amet
          mattis vulputate enim nulla.”
        </div>
      </div>
    </div>
  );
}
