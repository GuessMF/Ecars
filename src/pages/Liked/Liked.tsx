import React from "react";
import {useState, useEffect, useRef} from "react";
import style from "./__liked.module.scss";
import {OrderByDirection, collection, getDocs} from "firebase/firestore";

import {db} from "../../firebase";
import {doc, getDoc, query, orderBy} from "firebase/firestore";
import BigCard from "components/smart/BigCard/BigCard";
import {useNavigate, NavLink} from "react-router-dom";
import Cookies from "universal-cookie";
import {useAuth} from "hooks/use-auth";
import ArrowUp from "./arrowUp.webp";
import ArrowDown from "./arrowDown.webp";
import {likedCard} from "components/smart/LikedCard/__likedCard.module.scss";
import LikedCard from "components/smart/LikedCard/LikedCard";

interface Props {
  userID: string;
}
// interface LikedCar {
//   carId: string;
//   carIndex: string;
// }
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
  //  testImg: string;
}

export default function Liked({userID}: Props) {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [likedCars, setLikedCars] = useState<string[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [loadingLiked, setLoadingLiked] = useState(true);
  const [sortBy, setSortBy] = useState<string>("brand");
  const {isAuth, email, displayName} = useAuth();
  const [sortSetting, setSortSetting] = useState<string | undefined>("asc");
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const cookies = new Cookies(null, {path: "/"});
  useEffect(() => {
    if (!cookies.get("auth")) {
      navigate("/login");
    }
  }, []);

  const fetchLiked = async () => {
    const likedRef = collection(db, "likedCars");
    const likedDocRef = doc(likedRef, userID);
    try {
      const likedDocSnap = await getDoc(likedDocRef);
      if (likedDocSnap.exists()) {
        const likedData = likedDocSnap.data();
        const currentLikedCars = likedData?.likedCars || [];
        setLikedCars(currentLikedCars);
        //  const hasMatch = currentLikedCars.some((el: string) => el === userID);
      }
    } catch (error) {
      console.error("Ошибка при скачивании документа: ", error);
    }
  };

  const fetchLikedCarsData = async (likedCars: string[]) => {
    try {
      const otherCarsRef = collection(db, "cars");

      let first = query(otherCarsRef);
      first = query(first, orderBy(sortBy, sortSetting as OrderByDirection));
      const querySnapshot = await getDocs(first);
      const carsData: Car[] = querySnapshot.docs
        .map((doc) => {
          const carData = doc.data() as Car;

          if (likedCars.includes(carData.id)) {
            return carData;
          }
          return null;
        })
        .filter((car) => car !== null) as Car[];
      setCars(carsData);
    } catch (error) {
      console.error("Error fetching liked cars data: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (userID) {
        await fetchLiked();
        setLoadingLiked(false);
      }
    };

    fetchData();
  }, [userID]);

  useEffect(() => {
    const fetchData = async () => {
      if (isAuth && displayName) {
        setUserName(displayName);
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuth, displayName, loading]);

  useEffect(() => {
    const fetchData = async () => {
      if (!loadingLiked) {
        fetchLikedCarsData(likedCars);
      }
    };

    fetchData();
  }, [likedCars, loadingLiked, sortBy, sortSetting]);

  const handleSortBy = (value: string) => {
    if (sortBy === value) {
      if (sortSetting === "asc") {
        setSortSetting("desc");
      } else {
        setSortSetting("asc");
      }
    } else {
      setSortBy(value);
    }
  };

  return (
    <div className={style.liked}>
      <div className={style.header}>
        <h1>Cars you liked</h1>
        <p>
          {userName.charAt(0).toLocaleUpperCase() + userName.slice(1)}, welcome
          to your liked page, this shows the cars you've liked.
        </p>
        {cars.length > 0 ? (
          <div className={style.sorting}>
            <span>Sort by:</span>
            <button
              onClick={() => handleSortBy("dateAdded")}
              className={sortBy === "dateAdded" ? style.checked : ""}
            >
              Date
              {sortBy === "dateAdded" &&
                (sortSetting === "asc" ? (
                  <img src={ArrowUp} alt="arrowUp" className={style.icon} />
                ) : (
                  <img src={ArrowDown} alt="arrowDown" className={style.icon} />
                ))}
            </button>
            <button
              onClick={() => handleSortBy("price")}
              className={sortBy === "price" ? style.checked : ""}
            >
              Price
              {sortBy === "price" &&
                (sortSetting === "asc" ? (
                  <img src={ArrowUp} alt="arrowUp" className={style.icon} />
                ) : (
                  <img src={ArrowDown} alt="arrowDown" className={style.icon} />
                ))}
            </button>
            <button
              onClick={() => handleSortBy("brand")}
              className={sortBy === "brand" ? style.checked : ""}
            >
              Brand
              {sortBy === "brand" &&
                (sortSetting === "asc" ? (
                  <img src={ArrowUp} alt="arrowUp" className={style.icon} />
                ) : (
                  <img src={ArrowDown} alt="arrowDown" className={style.icon} />
                ))}
            </button>
          </div>
        ) : (
          <h5>No cars yet</h5>
        )}
      </div>
      <div className={style.wrapper}>
        {likedCars &&
          cars.map((car: any, index: any) => (
            <NavLink to={`/details/${car.id}`}>
              <LikedCard
                key={index}
                id={car.id}
                index={index}
                brand={car.brand}
                model={car.model}
                price={car.price}
                year={car.year}
                fuel={car.fuel}
                owners={car.owners}
                location={car.location}
                mileage={car.mileage}
                description={car.description}
                previewIMG={car.previewImage[0]}
              />
            </NavLink>
            // />
          ))}
      </div>
    </div>
  );
}
