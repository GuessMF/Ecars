import React from "react";
import {useState, useEffect, useRef} from "react";
import style from "./__liked.module.scss";
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

import {db} from "../../firebase";
import {doc, setDoc, getDoc} from "firebase/firestore";
import BigCard from "components/smart/BigCard/BigCard";

interface Props {
  userID: string;
}
interface LikedCar {
  carId: string;
  carIndex: string;
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
}

export default function Liked({userID}: Props) {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [likedCars, setLikedCars] = useState<string[]>([]);
  const [liked, setLiked] = useState<boolean>(false);
  const [cars, setCars] = useState<Car[]>([]);
  const prevLikedCars = useRef<string[]>([]);

  const [loadingLiked, setLoadingLiked] = useState(true);
  //   const fetchLikedCars = async () => {
  //     try {
  //       const likedRef = collection(db, "likedCars");
  //       let first = query(likedRef);
  //       first = query(first, where("id", "==", "7sCg7gnCYCb1qgRZTPTAoamOy663"));
  //       const querySnapshot = await getDocs(first);
  //       console.log(querySnapshot.docs);

  //         const cars = querySnapshot.docs.map(
  //           (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as LikedCar
  //         );

  //     //   const cars = querySnapshot.docs.map(
  //     //     (doc: QueryDocumentSnapshot<DocumentData>) => {
  //     //       const data = doc.data() as LikedCar;
  //     //       return {id: doc.id, ...data};
  //     //     }
  //     //   );

  //       setLikedCars(cars);
  //       console.log(cars);

  //       // console.log(likedCars);
  //       console.log("Загружены лайкнутые авто");
  //       setLoaded(true);
  //     } catch (error) {
  //       console.error("Error fetching first page: ", error);
  //     }
  //   };

  const fetchLiked = async () => {
    const likedRef = collection(db, "likedCars");
    const likedDocRef = doc(likedRef, userID);
    try {
      const likedDocSnap = await getDoc(likedDocRef);
      if (likedDocSnap.exists()) {
        const likedData = likedDocSnap.data();
        const currentLikedCars = likedData?.likedCars || [];
        console.log(currentLikedCars);
        setLikedCars(currentLikedCars);
        const hasMatch = currentLikedCars.some((el: string) => el === userID);
        //  setLiked(hasMatch);
        // console.log(hasMatch + " hasMatch");
      }
    } catch (error) {
      console.error("Ошибка при скачивании документа: ", error);
    }
  };

  // const fetchCars = async () => {
  //   try {
  //     const carsRef = collection(db, "cars");
  //     const querySnapshot = await getDocs(carsRef);

  //     const cars: Car[] = querySnapshot.docs
  //       .map((doc) => {
  //         const carData = doc.data() as Car;

  //         if (likedCars.includes('61b7c881-9143-42bd-bff7-ab1b41842d2a')) {
  //           return carData; // Если ID автомобиля есть в likedCars, добавляем в массив cars
  //         }
  //         return null;
  //       })
  //       .filter((car) => car !== null) as Car[]; // Фильтруем null значения (авто, которых нет в likedCars)

  //     // Теперь у вас есть массив автомобилей, которые соответствуют likedCars
  //     console.log(cars);

  //     // setCars(cars);
  //     // setLoaded(true);
  //   } catch (error) {
  //     console.error("Error fetching cars: ", error);
  //   }
  // };
  const fetchLikedCarsData = async (likedCars: string[]) => {
    try {
      const otherCarsRef = collection(db, "cars");
      const querySnapshot = await getDocs(otherCarsRef);

      const carsData: Car[] = querySnapshot.docs
        .map((doc) => {
          const carData = doc.data() as Car;
          console.log("Car ID from collection:", carData.id);

          if (likedCars.includes(carData.id)) {
            return carData; // Если ID автомобиля есть в likedCars, добавляем в массив carsDat
          }
          return null;
        })
        .filter((car) => car !== null) as Car[]; // Фильтруем null значения (авто, которых нет в likedCars)
      setCars(carsData);
      console.log("Cars data:", carsData);

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

  console.log(cars);

  // useEffect(() => {
  //   if (userID) {
  //     fetchLiked();
  //     fetchCars(likedCars);
  //   }
  // }, [userID]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (userID) {
  //       await fetchLiked(); // Подгрузка данных о лайкнутых автомобилях
  //       if (
  //         JSON.stringify(prevLikedCars.current) !== JSON.stringify(likedCars)
  //       ) {
  //         prevLikedCars.current = likedCars.slice(); // Обновляем предыдущее состояние
  //         fetchLikedCarsData(likedCars); // Вызываем только если likedCars изменился
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [userID, likedCars]);

  // useEffect(() => {
  //   console.log(likedCars);
  // }, [likedCars]);

  //   {likedCars.map((car: any, i) => {
  //     return (

  //         <NavLink to={`/details/${car.id}`}>
  //           <LittleCard
  //             brand={car.brand}
  //             model={car.model}
  //             price={car.price}
  //             fuel={car.fuel}
  //             mileage={car.mileage}
  //             owners={car.owners}
  //             selectedCurrency={selectedCurrency}
  //             eurValue={eurValue}
  //             usdValue={usdValue}
  //             //special={car.special}
  //             previewIMG={car.imageUrls[0]}
  //           />
  //         </NavLink>

  //     );
  //   })}

  // {likedCars &&
  //   likedCars.map((car: any, index: any) => (
  //     <BigCard
  //       key={index}
  //       id={car.id}
  //       selectedCurrency={"USD"}
  //       usdValue={10}
  //       eurValue={20}
  //       index={index}
  //       brand={car.brand}
  //       model={car.model}
  //       price={car.price}
  //       fuel={car.fuel}
  //       owners={car.owners}
  //       location={car.location}
  //       mileage={car.mileage}
  //       description={car.description}
  //       previewIMG={car.imageUrls[0]}
  //       //onLoad={handleLoad}
  //     />
  //   ))}

  return (
    <div className={style.liked}>
      <div>
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
