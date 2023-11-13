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
import {initializeApp} from "firebase/app";
import {getStorage, ref, listAll} from "firebase/storage";
import {getDownloadURL} from "firebase/storage";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPhpxFJD0FYxtAih7jSx8wgqETXHhOBeI",
  authDomain: "ecars-de7bc.firebaseapp.com",
  projectId: "ecars-de7bc",
  storageBucket: "ecars-de7bc.appspot.com",
  messagingSenderId: "110000528537",
  appId: "1:110000528537:web:321165893ea4a7a8ac6c08",
  measurementId: "G-XDXHPB18TW",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

interface Props {
  selectedCurrency: string;
  eurValue: number;
  usdValue: number;
}

export default function SpecialOffers({
  selectedCurrency,
  eurValue,
  usdValue,
}: Props) {
  const swiperRef = React.useRef<SwiperCore>();
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [carsDownloaded, setCarsDownloaded] = useState<
    {
      id: string;
      brand: string;
      model: string;
      price: string;
      year: number;
      fuel: string;
      color: string;
      seats: string;
      transmission: string;
      owners: string;
      vehicleType: string;
      location: string;
      description: string;
      mileage: number;
      imageUrl: string;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const specialCarsArr: number[] = [];

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

  useEffect(() => {
    const fetchCarImages = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://65378b85bb226bb85dd365a6.mockapi.io/cars`
        );
        if (response.ok) {
          const carData = await response.json();
          for (let i = 0; i < 7; i++) {
            const num = Math.floor(Math.random() * carData.length);
            specialCarsArr.push(num);
          }
          const extractedCars: any = specialCarsArr.map(
            (index) => carData[index]
          );

          const carsArray = [];
          for (const car of extractedCars) {
            const folderRef = ref(storage, `cars/${car.id}`);

            try {
              const carImages = await listAll(folderRef);
              if (carImages.items.length > 0) {
                const imageUrl = await getDownloadURL(carImages.items[0]);

                carsArray.push({
                  id: car.id.toString(),
                  brand: car.brand,
                  model: car.model,
                  price: car.price.toString(),
                  year: car.year,
                  fuel: car.fuel,
                  color: car.color,
                  seats: car.seats,
                  transmission: car.transmission,
                  owners: car.owners,
                  location: car.location,
                  vehicleType: car.vehicleType,
                  description: car.description,
                  mileage: car.mileage,
                  imageUrl: imageUrl,
                });
              }
            } catch (error) {
              console.error(
                `Error fetching images for car with ID ${car.id}:`,
                error
              );
            }
          }

          setCarsDownloaded(carsArray);
          setIsLoading(false);
        } else {
          console.error("Failed to fetch car data");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching car data: ", error);
        setIsLoading(false);
      }
    };

    fetchCarImages();
  }, []);

  console.log(carsDownloaded);

  // {carsDownloaded.map((car, i) => (
  //   <LittleCard
  //     brand={car.brand}
  //     model={car.model}
  //     price={car.price}
  //     //special={car.special}
  //     previewIMG={car.imageUrl}
  //   />
  // ))}

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
            {carsDownloaded.map((car, i) => {
              return (
                <SwiperSlide key={car.price} virtualIndex={i}>
                  <NavLink to={`/details/${car.id}`}>
                    <LittleCard
                      brand={car.brand}
                      model={car.model}
                      price={car.price}
                      fuel={car.fuel}
                      mileage={car.mileage}
                      owners={car.owners}
                      selectedCurrency={selectedCurrency}
                      eurValue={eurValue}
                      usdValue={usdValue}
                      //special={car.special}
                      previewIMG={car.imageUrl}
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
