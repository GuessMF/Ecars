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
// import {initializeApp} from "firebase/app";
// import {getStorage, ref, listAll} from "firebase/storage";
// import {getDownloadURL} from "firebase/storage";
// import {getFirestore} from "firebase/firestore";

// import {useAppSelector} from "hooks/redux-hooks";
// import {useAppDispatch} from "hooks/redux-hooks";

import {db} from "../../../firebase";
import {
  collection,
  query,
  getDocs,
  where,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
// import {getAuth, signOut, onAuthStateChanged} from "firebase/auth";
import {useAuth} from "hooks/use-auth";

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
  const {isAuth, email, displayName} = useAuth();
  const swiperRef = React.useRef<SwiperCore>();
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  // const selectedCurrency = useAppSelector((state) => state.currency);
  // const usdValue = useAppSelector((state) => state.currValue.usdValue);
  // const eurValue = useAppSelector((state) => state.currValue.eurValue);

  // useEffect(() => {}, [isAuth]);
  const [specialCars, setSpecialCars] = useState<Car[]>([]);

  const screenWidth = windowWidth;
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
            // autoplay={false}
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
                  <NavLink to={`${isAuth ? `/details/${car.id}` : `/login`}`}>
                    <LittleCard
                      brand={car.brand}
                      model={car.model}
                      price={car.price}
                      fuel={car.fuel}
                      mileage={car.mileage}
                      owners={car.owners}
                      special={true}
                      previewIMG={car.imageUrls[0]}
                    />
                  </NavLink>
                </SwiperSlide>
              );
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
