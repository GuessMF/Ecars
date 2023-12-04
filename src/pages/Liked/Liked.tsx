import React from "react";
import {useState, useEffect, useRef} from "react";
import style from "./__liked.module.scss";
import {collection, getDocs} from "firebase/firestore";

import {db} from "../../firebase";
import {doc, getDoc} from "firebase/firestore";
import BigCard from "components/smart/BigCard/BigCard";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";

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
}

export default function Liked({userID}: Props) {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [likedCars, setLikedCars] = useState<string[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [loadingLiked, setLoadingLiked] = useState(true);
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
      const querySnapshot = await getDocs(otherCarsRef);

      const carsData: Car[] = querySnapshot.docs
        .map((doc) => {
          const carData = doc.data() as Car;

          if (likedCars.includes(carData.id)) {
            return carData; // Если ID автомобиля есть в likedCars, добавляем в массив carsDat
          }
          return null;
        })
        .filter((car) => car !== null) as Car[]; // Фильтруем null значения (авто, которых нет в likedCars)
      setCars(carsData);

      // setCars(carsData);
      // setLoaded(true);
    } catch (error) {
      console.error("Error fetching liked cars data: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (userID) {
        await fetchLiked(); // Подгрузка данных о лайкнутых автомобилях
        setLoadingLiked(false);
      }
    };

    fetchData();
  }, [userID]);

  useEffect(() => {
    const fetchData = async () => {
      if (!loadingLiked) {
        fetchLikedCarsData(likedCars); // Вызываем только после успешной загрузки fetchLiked
      }
    };

    fetchData();
  }, [likedCars, loadingLiked]);

  return (
    <div className={style.liked}>
      <h2>Cars you like</h2>
      <div className={style.wrapper}>
        {likedCars &&
          cars.map((car: any, index: any) => (
            <BigCard
              key={index}
              id={car.id}
              selectedCurrency={"USD"}
              usdValue={10}
              eurValue={20}
              index={index}
              brand={car.brand}
              model={car.model}
              price={car.price}
              fuel={car.fuel}
              owners={car.owners}
              location={car.location}
              mileage={car.mileage}
              description={car.description}
              previewIMG={car.imageUrls[0]}
              //onLoad={handleLoad}
            />
          ))}
      </div>
    </div>
  );
}
