import React from "react";
import {useState, useEffect, useRef} from "react";
import style from "./__testpage.module.scss";

import {db} from "../../firebase";
import {
  doc,
  getDocs,
  collection,
  query,
  limit,
  startAfter,
  orderBy,
  DocumentData,
  DocumentSnapshot,
} from "firebase/firestore";

export default function TestPage() {
  const [cars, setCars] = useState<
    {
      id: string;
      index: string;
      brand: string;
      model: string;
    }[]
  >([]);

  const [loaded, setLoaded] = useState<boolean>(false);
  const [lasDoc, setLastDoc] = useState(null);
  const lastVisibleDoc = useRef<DocumentSnapshot<DocumentData> | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Количество элементов на странице
  const arr: any = [];
  // useEffect(() => {
  //   const docRef = doc(db, "cities");
  //const arr: any = [];
  //   const fetchData = async () => {
  //     try {
  //       const docSnapshot = await getDoc(docRef);

  //       if (docSnapshot.exists()) {
  //         console.log("Document data:", docSnapshot.data());
  //       } else {
  //         console.log("Document does not exist!");
  //       }

  //       console.log("Document successfully downloaded!");
  //     } catch (error) {
  //       console.error("Error fetching document: ", error);
  //     }
  //   };

  //   // Вызываем функцию получения документа
  //   fetchData();
  // }, []);

  //
  //
  // Рабочий
  // useEffect(() => {
  //   const citiesRef = collection(db, "cars");

  //   const fetchData = async () => {
  //     try {
  //       const querySnapshot = await getDocs(citiesRef);
  //       const arr: any = [];
  //       querySnapshot.forEach((doc) => {
  //         console.log("Test " + doc.id);
  //         arr.push(doc.data());
  //         console.log("Document data:", doc.data());
  //       });
  //       console.log(arr.length);
  //       setLoaded(true);
  //       console.log("Documents successfully downloaded!");
  //       setCars(arr);
  //     } catch (error) {
  //       console.error("Error fetching documents: ", error);
  //     }
  //   };

  //   // Вызываем функцию получения документов
  //   fetchData();
  // }, []);

  // cars.map((car: any, index: any) => console.log(car));

  // Переменная, где хранится последний документ на текущей странице
  // let lastVisibleDoc: any;
  const [desc, setDesc] = useState<boolean>(false);

  // Функция для загрузки первой страницы (первые 8 элементов)
  const fetchFirstPage = async () => {
    try {
      const carsRef = collection(db, "cars");
      const first = query(
        carsRef,
        orderBy("brand", "asc"),
        limit(itemsPerPage)
      );
      const documentSnapshots = await getDocs(first);

      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastDoc(lastVisible);

      const carsData = documentSnapshots.docs.map((doc) => doc.data());
      setCars(carsData);
    } catch (error) {
      console.error("Error fetching first page: ", error);
    }
  };

  const fetchNextPage = async () => {
    try {
      const carsRef = collection(db, "cars");
      const next = query(
        carsRef,
        orderBy("brand", "asc"),
        startAfter(lastVisibleDoc),
        limit(itemsPerPage)
      );

      const querySnapshot = await getDocs(next);
      const carsData = querySnapshot.docs.map((doc) => doc.data());

      if (querySnapshot.docs.length > 0) {
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        setLastDoc(lastVisible);

        setCurrentPage((prevPage) => prevPage + 1);
        setCars(cars.concat(carsData));
      } else {
        console.log("No more pages");
      }
    } catch (error) {
      console.error("Error fetching next page: ", error);
    }
  };

  useEffect(() => {
    fetchFirstPage();
  }, []);

  // При клике на кнопку для загрузки следующей страницы вызываем функцию для загрузки следующей страницы
  // fetchNextPage();

  return (
    <div className={style.test}>
      <button onClick={fetchNextPage}>Next Page</button>
      <p>Current Page: {currentPage}</p>
      {loaded &&
        cars.map((car: any, index: any) => (
          <div className={style.car_wrapper}>
            <div className={style.left}>
              <p>Brand: {car.brand}</p>
              <p> Model: {car.model}</p>
              <p> Price: {car.price}</p>
              <p> Year: {car.year}</p>
            </div>
            <div className={style.right}>
              <img src={car.imageUrls[0]} width={250} loading="lazy" />
            </div>
          </div>
        ))}
    </div>
  );
}
