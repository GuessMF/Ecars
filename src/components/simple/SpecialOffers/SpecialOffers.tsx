import React, {useState, useEffect} from "react";
import LittleCard from "../../smart/LittleCard/LittleCard";
import style from "./__specialOffers.module.scss";
import {ReactComponent as LeftArrow} from "../../../assets/icons/specialOffers/leftArrow.svg";
import {ReactComponent as RightArrow} from "../../../assets/icons/specialOffers/rightArrow.svg";
import {Swiper, SwiperSlide} from "swiper/react";
import {NavLink} from "react-router-dom";
import AllCars from "../../ui/AllCars/AllCars";
import {Swiper as SwiperCore} from "swiper/types";
import {Autoplay, Pagination, Navigation} from "swiper/modules";
import {Virtual} from "swiper/modules";
import "swiper/css/virtual";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";

import {db} from "../../../firebase";
import {
  collection,
  query,
  getDocs,
  where,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";

import {getAuth, onAuthStateChanged} from "firebase/auth";

interface Car {
  id: string;
  userId: string;
  index: string;
  brand: string;
  model: string;
  price: string;
  fuel: string;
  location: string;
  vehicleType: string;
  year: number;
  owners: string;
  description: string;
  mileage: number;
  imageUrl: string;
  special: boolean;
}

export default function SpecialOffers() {
  const [userId, setUserId] = useState<string>("");
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          setUserId(user.uid);
        } else {
          if (user.phoneNumber) {
            setUserId(user.uid);
          }
        }
      } else {
      }
    });
  }, []);
  const swiperRef = React.useRef<SwiperCore>();
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [specialCars, setSpecialCars] = useState<Car[]>([]);

  let numberOfCarts = 4;
  if (windowWidth <= 768) {
    numberOfCarts = 2;
  }
  if (windowWidth <= 450) {
    numberOfCarts = 1;
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchSpecialCars = async () => {
    try {
      const carsRef = collection(db, "cars");
      let first = query(carsRef);
      first = query(first, where("special", "==", true));
      const querySnapshot = await getDocs(first);
      const cars = querySnapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as Car
      );

      setSpecialCars(cars);
    } catch (error) {
      console.error("Error fetching first page: ", error);
    }
  };
  useEffect(() => {
    fetchSpecialCars();
  }, []);

  return (
    <div className={style.specialOffers} id="specialOffers">
      <div className={style.specialOffers__content}>
        <div className={style.specialOffers__header}>
          <h2>Special offers</h2>
          <div className={style.specialOffers__navigation}>
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
            navigation={true}
            autoplay={{delay: 2500, disableOnInteraction: false}}
            spaceBetween={20}
            modules={[Autoplay, Pagination, Navigation, Virtual]}
            slidesPerView={numberOfCarts}
            virtual
            className="mySwiper"
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {specialCars.map((car: any, i) => {
              return (
                <SwiperSlide key={car.price} virtualIndex={i}>
                  <NavLink to={`${userId ? `/details/${car.id}` : `/login`}`}>
                    <LittleCard
                      brand={car.brand}
                      model={car.model}
                      price={car.price}
                      fuel={car.fuel}
                      mileage={car.mileage}
                      owners={car.owners}
                      special={true}
                      previewIMG={car.imageUrls[0]}
                      location={car.location}
                    />
                  </NavLink>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div className={style.specialOffers__navigation_mobile}>
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
