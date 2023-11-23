import React from "react";
import {useState, useEffect} from "react";
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

export default function Liked({userID}: Props) {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [likedCars, setLikedCars] = useState<LikedCar[]>([]);
  const [liked, setLiked] = useState<boolean>(false);

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
        setLiked(hasMatch);
        console.log(hasMatch + " hasMatch");
      }
    } catch (error) {
      console.error("Ошибка при скачивании документа: ", error);
    }
  };

  useEffect(() => {
    if (userID) {
      fetchLiked();
    }
  }, [userID]);

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
        {likedCars.map((car: any, index: any) => (
          <div>{car}</div>
        ))}
      </div>
    </div>
  );
}
