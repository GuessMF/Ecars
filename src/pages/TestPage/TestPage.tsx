import React from "react";
import {useState, useEffect, useRef} from "react";
import style from "./__testpage.module.scss";

import {db} from "../../firebase";
import BigCard from "../../components/smart/BigCard/BigCard";
import Skeleton from "components/ui/Skeleton/Skeleton";

// import {
//   doc,
//   getDocs,
//   collection,
//   query,
//   limit,
//   startAfter,
//   orderBy,
// } from "firebase/firestore";

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
} from "firebase/firestore";

interface Car {
  // Замените на реальные поля вашего объекта Car
  brand: string;
  model: string;
  year: number;
  // Другие поля...
}

export default function TestPage() {
  const [totalCars, setTotalCars] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);
  const itemsPerPage: number = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cars, setCars] = useState<Car[]>([]);
  const [lastVisibleRefs, setLastVisibleRefs] = useState<
    DocumentSnapshot<Car>[]
  >([]);

  useEffect(() => {
    const getNumberOfCars = async () => {
      try {
        const carsRef = collection(db, "cars");
        const snapshot = await getDocs(carsRef);
        const numberOfCars = snapshot.size;
        setTotalCars(numberOfCars);
        return numberOfCars;
      } catch (error) {
        console.error("Error getting number of cars: ", error);
      }
    };
    getNumberOfCars();
  }, []);

  const getNumberOfCars = async () => {
    try {
      const carsRef = collection(db, "cars");
      const snapshot = await getDocs(carsRef);
      const numberOfCars = snapshot.size;

      return numberOfCars;
    } catch (error) {
      console.error("Error getting number of cars: ", error);
    }
  };

  const fetchFirstPage = async () => {
    try {
      const carsRef = collection(db, "cars");
      const first = query(
        carsRef,
        orderBy("brand", "asc"),
        limit(itemsPerPage)
      );
      const documentSnapshots = await getDocs(first);

      const arr: Car[] = [];
      documentSnapshots.forEach((doc) => {
        arr.push(doc.data() as Car);
      });
      if (documentSnapshots.docs.length > 0) {
        setLastVisibleRefs([
          documentSnapshots.docs[
            documentSnapshots.docs.length - 1
          ] as DocumentSnapshot<Car>,
        ]);
      }
      setCars(arr);
      setLoaded(true);
    } catch (error) {
      console.error("Error fetching first page: ", error);
    }
  };

  const fetchNextPage = async () => {
    try {
      const carsRef = collection(db, "cars");
      const lastVisible = lastVisibleRefs[currentPage - 1];
      if (lastVisible) {
        const next = query(
          carsRef,
          orderBy("brand", "asc"),
          startAfter(lastVisible),
          limit(itemsPerPage)
        );
        // console.log(lastVisible);

        const documentSnapshots = await getDocs(next);
        const arr: Car[] = [];
        documentSnapshots.forEach((doc) => {
          arr.push(doc.data() as Car);
        });
        if (documentSnapshots.docs.length > 0) {
          setLastVisibleRefs([
            ...lastVisibleRefs,
            documentSnapshots.docs[
              documentSnapshots.docs.length - 1
            ] as DocumentSnapshot<Car>,
          ]);
        }
        setCars(arr);
        setCurrentPage(currentPage + 1);
      }
    } catch (error) {
      console.error("Error fetching next page: ", error);
    }
  };

  const fetchPreviousPage = async () => {
    try {
      const carsRef = collection(db, "cars");
      // console.log(lastVisibleRefs);
      const lastVisible = lastVisibleRefs[currentPage - 3];
      if (lastVisible) {
        const next = query(
          carsRef,
          orderBy("brand", "asc"),
          startAfter(lastVisible),
          limit(itemsPerPage)
        );

        const documentSnapshots = await getDocs(next);
        const arr: Car[] = [];
        documentSnapshots.forEach((doc) => {
          arr.push(doc.data() as Car);
        });
        if (documentSnapshots.docs.length > 0) {
          setLastVisibleRefs([
            ...lastVisibleRefs,
            documentSnapshots.docs[
              documentSnapshots.docs.length - 1
            ] as DocumentSnapshot<Car>,
          ]);
        }
        setCars(arr);
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error("Error fetching next page: ", error);
    }
  };

  const checkPreviousPage = () => {
    if (currentPage == 2) {
      fetchFirstPage();
      setCurrentPage(currentPage - 1);
    } else {
      fetchPreviousPage();
    }
  };

  useEffect(() => {
    getNumberOfCars();
    fetchFirstPage();
  }, []);

  return (
    <div className={style.test}>
      <p>{totalCars}</p>
      <p>Current Page: {currentPage}</p>

      {loaded
        ? cars.map((car: any, index: any) => (
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
          ))
        : [...new Array(5)].map(() => <Skeleton />)}

      <button onClick={checkPreviousPage} disabled={currentPage === 1}>
        назад
      </button>
      <button onClick={fetchNextPage}>вперед</button>
    </div>
  );
}
