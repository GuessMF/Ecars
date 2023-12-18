import React, {useState, useEffect} from "react";
import style from "./__similarCars.module.scss";
import {
  collection,
  query,
  where,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import {db} from "../../../firebase";

import MeduimCard from "components/smart/MediumCard/MeduimCard";
import {current} from "@reduxjs/toolkit";
import {NavLink} from "react-router-dom";

import {useAppSelector} from "hooks/redux-hooks";

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
type Props = {
  similarBrand: string | undefined;
  similarModel: string | undefined;
  currentId: string | undefined;
};
export default function SimilarCars({
  similarBrand,
  similarModel,
  currentId,
}: Props) {
  const [similarCars, setSimilarCars] = useState<Car[]>([]);

  const selectedCurrency = useAppSelector(
    (state) => state.currency.currencyTerm
  );

  const usdValue = useAppSelector((state) => state.currValue.usdValue);
  const eurValue = useAppSelector((state) => state.currValue.eurValue);

  // const fetchSimilarCars = async (
  //   brand: string | undefined,
  //   model: string | undefined
  // ) => {
  //   try {
  //     const carsRef = collection(db, "cars");
  //     let queryRef = query(carsRef);
  //     queryRef = query(queryRef, where("brand", "==", brand));
  //     const querySnapshot = await getDocs(queryRef);
  //     const cars = querySnapshot.docs.map(
  //       (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as Car
  //     );

  //     if (similarCars.length <= 2) {
  //       setSimilarCars(cars);
  //     } else {
  //       queryRef = query(
  //         carsRef,
  //         where("brand", "==", brand),
  //         where("model", "==", model)
  //       );
  //       const modelSnapshot = await getDocs(queryRef);
  //       const carsByModel = modelSnapshot.docs.map(
  //         (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as Car
  //       );

  //       if (carsByModel.length <= 2) {
  //         setSimilarCars(carsByModel);
  //       }
  //     }
  //     // first = query(first, where("model", "==", similarModel));
  //   } catch (error) {
  //     console.error("Error fetching first page: ", error);
  //   }
  // };

  const [previousSimilarCars, setPreviousSimilarCars] = useState<Car[]>([]);

  const fetchSimilarCars = async (
    brand: string | undefined,
    model: string | undefined,
    excludedCarId: string | undefined
  ) => {
    try {
      const carsRef = collection(db, "cars");
      let queryRef = query(carsRef);
      queryRef = query(queryRef, where("brand", "==", brand));
      const querySnapshot = await getDocs(queryRef);
      let cars = querySnapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as Car
      );

      // Исключаем машину по ID

      cars = cars.filter((car) => car.id !== excludedCarId);

      if (cars.length <= 2) {
        setSimilarCars(cars);
        setPreviousSimilarCars([]); // Сбрасываем предыдущие результаты
      } else {
        queryRef = query(
          carsRef,
          where("brand", "==", brand),
          where("model", "==", model)
        );
        const modelSnapshot = await getDocs(queryRef);
        let carsByModel = modelSnapshot.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as Car
        );

        // Исключаем машину по ID
        carsByModel = carsByModel.filter((car) => car.id !== excludedCarId);
        const randNum1 = Math.floor(Math.random() * cars.length);
        const randNum2 = Math.floor(Math.random() * cars.length);

        if (carsByModel.length == 1) {
          const firstCarId = carsByModel[0].id;
          for (let i = 0; carsByModel.length < 2; i++) {
            const secondCarId = cars[i].id;
            if (firstCarId !== secondCarId) {
              carsByModel.push(cars[i]);
            }
          }
          setSimilarCars(carsByModel);
          setPreviousSimilarCars([]); // Сбрасываем предыдущие результаты
        } else if (carsByModel.length == 0) {
          carsByModel.push(cars[randNum1]);
          carsByModel.push(cars[randNum2]);
          setSimilarCars(carsByModel);
          setPreviousSimilarCars([]); // Сбрасываем предыдущие результаты
        } else if (carsByModel.length <= 2) {
          setSimilarCars(carsByModel);
          setPreviousSimilarCars(cars); // Сохраняем предыдущие результаты
        } else {
          // Если есть больше 2 результатов по модели, сохраняем их
          setSimilarCars(carsByModel);
          setPreviousSimilarCars([]); // Сбрасываем предыдущие результаты
        }
      }
    } catch (error) {
      console.error("Error fetching similar cars: ", error);
    }
  };

  useEffect(() => {
    if (similarBrand && similarModel && currentId) {
      fetchSimilarCars(similarBrand, similarModel, currentId);
    }
  }, [similarBrand, similarModel, currentId]);

  return (
    <div className={style.similarCars}>
      {similarCars.map((car: any, i) => {
        return (
          <NavLink to={`/details/${car.id}`} key={`navlink_${i}`}>
            <MeduimCard
              key={`medium_${i}`}
              image={car.imageUrls[0]}
              brand={car.brand}
              model={car.model}
              mileage={car.mileage}
              fuel={car.fuel}
              price={car.price}
              year={car.year}
              id={car.id}
              selectedCurrency={selectedCurrency}
              usdValue={usdValue}
              eurValue={eurValue}
            />
          </NavLink>
        );
      })}
    </div>
  );
}
