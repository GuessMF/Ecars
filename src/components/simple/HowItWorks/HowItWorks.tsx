import React from "react";
import style from "./__howItWorks.module.scss";

export default function HowItWorks() {
  return (
    <div className={style.howItWorks}>
      <div className={style.howItWorks__content}>
        <div className={style.howItWorks__top}>
          <h3>How it works</h3>
          <p>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit.
          </p>
        </div>
        <div className={style.howItWorks__bottom}>
          {/* <hr /> */}
          <div className={style.hr}></div>
          <div className={style.howItWorks__card}>
            <div className={style.card__content}>
              <div className={style.card__circutBox}>
                <div className={style.card__circut}>1</div>
              </div>

              <div className={style.card__text}>
                <h6>Find a car</h6>
                <p>
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint.
                </p>
              </div>
            </div>
          </div>
          <div className={style.howItWorks__card}>
            <div className={style.card__content}>
              <div className={style.card__circutBox}>
                <div className={style.card__circut}>2</div>
              </div>

              <div className={style.card__text}>
                <h6>Extensive inspection</h6>
                <p>
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint.
                </p>
              </div>
            </div>
          </div>
          <div className={style.howItWorks__card}>
            <div className={style.card__content}>
              <div className={style.card__circutBox}>
                <div className={style.card__circut}>3</div>
              </div>

              <div className={style.card__text}>
                <h6>Safe Buying</h6>
                <p>
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint.
                </p>
              </div>
            </div>
          </div>
          <div className={style.howItWorks__card}>
            <div className={style.card__content}>
              <div className={style.card__circutBox}>
                <div className={style.card__circut}>4</div>
              </div>

              <div className={style.card__text}>
                <h6>Delivery and support</h6>
                <p>
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
