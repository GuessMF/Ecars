import React, {useState, useEffect} from "react";
import LittleCard from "../../smart/LittleCard/LittleCard";
import style, {specialOffers} from "./__specialOffers.module.scss";
import {ReactComponent as LeftArrow} from "../../../assets/icons/specialOffers/leftArrow.svg";
import {ReactComponent as RightArrow} from "../../../assets/icons/specialOffers/rightArrow.svg";
import {Swiper, SwiperSlide} from "swiper/react";
// import {Swiper as SwiperCore} from "swiper/types";
import {NavLink} from "react-router-dom";
import AllCars from "../../ui/AllCars/AllCars";
import {cars} from "../../../helpers/carList";

// import {Swiper, SwiperSlide} from "swiper/react";
import {Swiper as SwiperCore} from "swiper/types";
import {Autoplay, Pagination, Navigation} from "swiper/modules";
import {Virtual} from "swiper/modules";

import {useSwiper} from "swiper/react";
import "swiper/css/virtual";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";

export default function SpecialOffers() {
  const swiperRef = React.useRef<SwiperCore>();

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
  let numberOfCarts = 4;
  if (windowWidth <= 768) {
    numberOfCarts = 2;
  }
  if (windowWidth <= 420) {
    numberOfCarts = 1;
  }
  return (
    <div className={style.specialOffers}>
      <div className={style.specialOffers__content}>
        <div className={style.specialOffers__header}>
          <h2>Special offers</h2>
          <div className={style.specialOffers__navigation}>
            {/* <LeftArrow />
            <RightArrow /> */}

            <button
              className={style.nav__button}
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <LeftArrow />
            </button>
            <button
              className={style.nav__button}
              onClick={() => swiperRef.current?.slideNext()}
            >
              <RightArrow />
            </button>
            <NavLink to="/catalog">
              <AllCars />
            </NavLink>
          </div>
        </div>
        <div className={style.specialOffers__corousel}>
          <Swiper
            // spaceBetween={307}
            // centeredSlides={true}
            // pagination={{clickable: true}}
            navigation={true}
            autoplay={{delay: 2500, disableOnInteraction: false}}
            modules={[Autoplay, Pagination, Navigation, Virtual]}
            slidesPerView={numberOfCarts}
            virtual
            className="mySwiper"
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {cars.map((car, i) => {
              return car.special ? (
                <SwiperSlide key={car.price} virtualIndex={i}>
                  <LittleCard
                    brand={car.brand}
                    model={car.model}
                    price={car.price}
                    //special={car.special}
                    previewIMG={car.previewIMG}
                  />
                </SwiperSlide>
              ) : null;
            })}
          </Swiper>
        </div>
      </div>
      <div className={style.specialOffers__navigation_mobile}>
        {/* <LeftArrow />
      <RightArrow /> */}
        <div className={style.navigation_mobile_btns}>
          <button
            className={style.nav__button}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <LeftArrow />
          </button>
          <button
            className={style.nav__button}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <RightArrow />
          </button>
        </div>

        <NavLink to="/catalog">
          <AllCars />
        </NavLink>
      </div>
    </div>
  );
}
