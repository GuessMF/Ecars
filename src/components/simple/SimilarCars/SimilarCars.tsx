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
};
export default function SimilarCars({similarBrand}: Props) {
  const [similarCars, setSimilarCars] = useState<Car[]>([]);

  const fetchSimilarCars = async () => {
    try {
      const carsRef = collection(db, "cars");
      let first = query(carsRef);
      first = query(first, where("brand", "==", similarBrand));
      const querySnapshot = await getDocs(first);
      const cars = querySnapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as Car
      );

      setSimilarCars(cars);
    } catch (error) {
      console.error("Error fetching first page: ", error);
    }
  };
  useEffect(() => {
    fetchSimilarCars();
    console.log(similarCars);
  }, [similarBrand]);

  return (
    <div className={style.similarCars}>
      {similarCars.map((car: any, i) => {
        return (
          <MeduimCard
            image={car.imageUrls[0]}
            brand={car.brand}
            model={car.model}
            mileage={car.mileage}
            fuel={car.fuel}
            price={car.price}
          />
        );
      })}
    </div>
  );
}
