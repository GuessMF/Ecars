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

import {db} from "../../../firebase";
import {
  collection,
  query,
  orderBy,
  startAfter,
  endBefore,
  startAt,
  limit,
  getDocs,
  DocumentSnapshot,
  where,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import {getAuth, signOut, onAuthStateChanged} from "firebase/auth";
import {useAuth} from "hooks/use-auth";

interface Props {
  selectedCurrency: string;
  eurValue: number;
  usdValue: number;
}
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

export default function SpecialOffers({
  selectedCurrency,
  eurValue,
  usdValue,
}: Props) {
  const {isAuth, email, displayName} = useAuth();
  const swiperRef = React.useRef<SwiperCore>();
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  // const [carsDownloaded, setCarsDownloaded] = useState<
  //   {
  //     id: string;
  //     brand: string;
  //     model: string;
  //     price: string;
  //     year: number;
  //     fuel: string;
  //     color: string;
  //     seats: string;
  //     transmission: string;
  //     owners: string;
  //     vehicleType: string;
  //     location: string;
  //     description: string;
  //     mileage: number;
  //     imageUrl: string;
  //   }[]
  // >([]);

  useEffect(() => {
    console.log(isAuth);
  }, [isAuth]);
  const [specialCars, setSpecialCars] = useState<Car[]>([]);

  // const [isLoading, setIsLoading] = useState(true);
  // const specialCarsArr: number[] = [];

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
  useEffect(() => {
    console.log(specialCars);
  }, [specialCars]);

  // const fetchSpecialCars = async () => {
  //   try {
  //     const carsRef = collection(db, "cars");
  //     let first = query(carsRef);
  //     first = query(first, where("special", "==", true));
  //     const querySnapshot = await getDocs(first);
  //     const cars = querySnapshot.docs.map(
  //       (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as Car
  //     );
  //     return cars;
  //   } catch (error) {
  //     console.error("Error fetching first page: ", error);
  //     return []; // или другая обработка ошибки
  //   }
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const cars = await fetchSpecialCars();
  //     if (cars.length > 0) {
  //       setSpecialCars(cars);
  //     }
  //     console.log(specialCars);
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchCarImages = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await fetch(
  //         `https://65378b85bb226bb85dd365a6.mockapi.io/cars`
  //       );
  //       if (response.ok) {
  //         const carData = await response.json();

  //         const extractedCars: any = specialCarsArr.map(
  //           (index) => carData[index]
  //         );

  //         const carsArray = [];
  //         for (const car of extractedCars) {
  //           const folderRef = ref(storage, `cars/${car.id}`);

  //           try {
  //             const carImages = await listAll(folderRef);
  //             if (carImages.items.length > 0) {
  //               const imageUrl = await getDownloadURL(carImages.items[0]);

  //               carsArray.push({
  //                 id: car.id.toString(),
  //                 brand: car.brand,
  //                 model: car.model,
  //                 price: car.price.toString(),
  //                 year: car.year,
  //                 fuel: car.fuel,
  //                 color: car.color,
  //                 seats: car.seats,
  //                 transmission: car.transmission,
  //                 owners: car.owners,
  //                 location: car.location,
  //                 vehicleType: car.vehicleType,
  //                 description: car.description,
  //                 mileage: car.mileage,
  //                 imageUrl: imageUrl,
  //               });
  //             }
  //           } catch (error) {
  //             console.error(
  //               `Error fetching images for car with ID ${car.id}:`,
  //               error
  //             );
  //           }
  //         }

  //         setCarsDownloaded(carsArray);
  //         setIsLoading(false);
  //       } else {
  //         console.error("Failed to fetch car data");
  //         setIsLoading(false);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching car data: ", error);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchCarImages();
  // }, []);

  // {carsDownloaded.map((car, i) => (
  //   <LittleCard
  //     brand={car.brand}
  //     model={car.model}
  //     price={car.price}
  //     //special={car.special}
  //     previewIMG={car.imageUrl}
  //   />
  // ))}
  // <NavLink to={`/details/${car.id}`}>
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
                      selectedCurrency={selectedCurrency}
                      eurValue={eurValue}
                      usdValue={usdValue}
                      //special={car.special}
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
