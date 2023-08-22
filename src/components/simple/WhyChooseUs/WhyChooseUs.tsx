import React from "react";
import style from "./__whyChooseUs.module.scss";
import img from "../../../assets/images/manAndWoman.webp";

export default function WhyChooseUs() {
  return (
    <div className={style.whyChooseUs}>
      <div
        className={style.whyChooseUs__image}
        // style={{backgroundImage: `url(${img})`}}
      ></div>
      <div className={style.whyChooseUs__content}>
        <div className={style.whyChooseUs__topContent}>
          <h2>Why choose us</h2>
          <span>
            <p>
              {" "}
              Quis blandit turpis cursus in hac. In hendrerit gravida rutrum
              quisque. Pellentesque habitant morbi tristique senectus et. Eget
              gravida cum sociis natoque. Pharetra diam sit amet nisl suscipit
              adipiscing bibendum.
            </p>
            <p>
              Porttitor massa id neque aliquam. In fermentum posuere urna nec.
              Rhoncus aenean vel elit scelerisque mauris pellentesque. Nullam ac
              tortor vitae purus faucibus ornare suspendisse sed nisi. Consequat
              id porta nibh venenatis cras sed.
            </p>
          </span>
        </div>
        <div className={style.whyChooseUs__bottomContent}>
          <div
          //   className={style.bottomContent__first}
          >
            <div className={style.bottomContent__left}>
              <hr />
            </div>
            <div className={style.bottomContent__right}>
              <span>Some headline</span>
              <p>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint.
              </p>
            </div>
          </div>
          <div
          //    className={style.bottomContent__second}
          >
            <div className={style.bottomContent__left}>
              <hr />
            </div>
            <div className={style.bottomContent__right}>
              <span>Some headline</span>
              <p>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint.
              </p>
            </div>
          </div>
          <div
          //   className={style.bottomContent__third}
          >
            <div className={style.bottomContent__left}>
              <hr />
            </div>
            <div className={style.bottomContent__right}>
              <span>Some headline</span>
              <p>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
