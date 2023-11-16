import React from "react";
import {useState, useEffect, useRef} from "react";
import style from "./__testpage.module.scss";

import {db} from "../../firebase";
import BigCard from "../../components/smart/BigCard/BigCard";

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
  // const [cars, setCars] = useState<
  //   {
  //     id: string;
  //     index: string;
  //     brand: string;
  //     model: string;
  //   }[]
  // >([]);

  const [loaded, setLoaded] = useState<boolean>(false);
  // const [lasDoc, setLastDoc] = useState(null);

  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 5; // Количество элементов на странице
  const arr: any = [];

  useEffect(() => {
    // getNumberOfCars();
    const getNumberOfCars = async () => {
      try {
        const carsRef = collection(db, "cars");
        const snapshot = await getDocs(carsRef);

        const numberOfCars = snapshot.size;
        console.log("Total number of cars:", numberOfCars);

        return numberOfCars;
        setTotalCars(numberOfCars);
      } catch (error) {
        console.error("Error getting number of cars: ", error);
      }
    };
    getNumberOfCars();
  }, []);

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
  // const [desc, setDesc] = useState<boolean>(false);

  // const [lastVisible, setLastVisible] = useState(null);

  // Функция для загрузки первой страницы (первые 5 элементов)
  // const fetchFirstPage = async () => {
  //   try {
  //     const carsRef = collection(db, "cars");
  //     const first = query(
  //       carsRef,
  //       orderBy("brand", "asc"),
  //       limit(itemsPerPage)
  //     );
  //     const documentSnapshots = await getDocs(first);
  //     documentSnapshots.forEach((doc) => {
  //       arr.push(doc.data());
  //     });
  //     setLoaded(true);
  //     setCars(arr);
  //   } catch (error) {
  //     console.error("Error fetching first page: ", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchFirstPage();
  // }, []);

  // При клике на кнопку для загрузки следующей страницы вызываем функцию для загрузки следующей страницы
  // fetchNextPage();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cars, setCars] = useState<Car[]>([]);
  const itemsPerPage: number = 1500;
  const lastVisibleRef = useRef<any>(null);

  const [lastVisibleRefs, setLastVisibleRefs] = useState<
    DocumentSnapshot<Car>[]
  >([]);

  const getNumberOfCars = async () => {
    try {
      const carsRef = collection(db, "cars");
      const snapshot = await getDocs(carsRef);

      const numberOfCars = snapshot.size;
      console.log("Total number of cars:", numberOfCars);

      return numberOfCars;
    } catch (error) {
      console.error("Error getting number of cars: ", error);
    }
  };
  // Изменения в функции для загрузки первой страницы:
  const fetchFirstPage = async () => {
    try {
      const carsRef = collection(db, "cars");
      console.log(carsRef);

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
      //  console.log(cars.length);
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

  // Изменения в функции для загрузки следующей страницы:
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
        console.log(lastVisible);

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
      const lastVisible = lastVisibleRefs[currentPage + 1];
      if (lastVisible) {
        const next = query(
          carsRef,
          orderBy("brand", "asc"),
          endBefore(lastVisible)
          // limit(itemsPerPage)
        );
        console.log(lastVisible);

        const documentSnapshots = await getDocs(next);
        const arr: Car[] = [];
        documentSnapshots.forEach((doc) => {
          arr.push(doc.data() as Car);
        });
        if (documentSnapshots.docs.length > 0) {
          setLastVisibleRefs([
            ...lastVisibleRefs,
            documentSnapshots.docs[
              documentSnapshots.docs.length + 1
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

  // Изменения в функции для загрузки предыдущей страницы:
  // const fetchPreviousPage = async () => {
  //   try {
  //     if (currentPage > 1) {
  //       const carsRef = collection(db, "cars");
  //       const prev = query(
  //         carsRef,
  //         orderBy("brand", "asc"),
  //         limit(itemsPerPage),
  //         endBefore(lastVisibleRefs[currentPage - 1])
  //       );
  //       const documentSnapshots = await getDocs(prev);
  //       const arr: Car[] = [];
  //       documentSnapshots.forEach((doc) => {
  //         arr.push(doc.data() as Car);
  //       });
  //       setCars(arr);
  //       setCurrentPage(currentPage - 1);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching previous page: ", error);
  //   }
  // };
  // const fetchPreviousPage = async () => {
  //   try {
  //     if (currentPage > 1) {
  //       const carsRef = collection(db, "cars");
  //       const lastVisible = lastVisibleRefs[currentPage - 2]; // Используем последний элемент текущей страницы для запроса предыдущей
  //       if (lastVisible) {
  //         const prev = query(
  //           carsRef,
  //           orderBy("brand", "asc"),
  //           endBefore(lastVisible),
  //           limit(itemsPerPage)
  //         );
  //         const documentSnapshots = await getDocs(prev);

  //         const arr: Car[] = [];
  //         documentSnapshots.forEach((doc) => {
  //           arr.push(doc.data() as Car);
  //         });

  //         setCars(arr);
  //         setCurrentPage((prevPage) => prevPage - 1);
  //         setLastVisibleRefs(lastVisibleRefs.slice(0, -1)); // Удаляем последний элемент из массива lastVisibleRefs
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Ошибка при загрузке предыдущей страницы: ", error);
  //   }
  // };

  useEffect(() => {
    getNumberOfCars();
    fetchFirstPage();
  }, []);

  // const fetchFirstPage = async () => {
  //   try {
  //     // Ваша инициализация Firebase и db

  //     const carsRef = collection(db, "cars");
  //     const first = query(
  //       carsRef,
  //       orderBy("brand", "asc"),
  //       limit(itemsPerPage)
  //     );
  //     const documentSnapshots = await getDocs(first);
  //     const arr: Car[] = [];
  //     documentSnapshots.forEach((doc) => {
  //       arr.push(doc.data() as Car);
  //     });
  //     if (documentSnapshots.docs.length > 0) {
  //       lastVisibleRef.current =
  //         documentSnapshots.docs[documentSnapshots.docs.length - 1];
  //     }
  //     setCars(arr);
  //     setLoaded(true); // Не уверен, что это нужно, если реализовано в вашем коде
  //   } catch (error) {
  //     console.error("Error fetching first page: ", error);
  //   }
  // };

  // const fetchNextPage = async () => {
  //   console.log("next page");
  //   setCurrentPage(currentPage + 1);
  //   try {
  //     const carsRef = collection(db, "cars");
  //     if (lastVisibleRef.current) {
  //       const next = query(
  //         carsRef,
  //         orderBy("brand", "asc"),
  //         startAfter(lastVisibleRef.current),
  //         limit(itemsPerPage)
  //       );
  //       const documentSnapshots = await getDocs(next);
  //       const arr: Car[] = [];
  //       documentSnapshots.forEach((doc) => {
  //         arr.push(doc.data() as Car);
  //       });
  //       if (documentSnapshots.docs.length > 0) {
  //         lastVisibleRef.current =
  //           documentSnapshots.docs[documentSnapshots.docs.length - 1];
  //       }
  //       setCars(arr);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching next page: ", error);
  //   }
  // };

  // const fetchPreviousPage = async () => {
  //   console.log("prev page");
  //   setCurrentPage(currentPage - 1);
  //   try {
  //     const carsRef = collection(db, "cars");
  //     if (lastVisibleRef.current) {
  //       const prev = query(
  //         carsRef,
  //         orderBy("brand", "asc"),
  //         endBefore(lastVisibleRef.current),
  //         limit(itemsPerPage)
  //       );
  //       const documentSnapshots = await getDocs(prev);
  //       const arr: Car[] = [];
  //       documentSnapshots.forEach((doc) => {
  //         arr.push(doc.data() as Car);
  //       });
  //       if (documentSnapshots.docs.length > 0) {
  //         lastVisibleRef.current = documentSnapshots.docs[0];
  //       }
  //       setCars(arr);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching previous page: ", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchFirstPage();
  //   console.log(cars);
  // }, []);

  return (
    <div className={style.test}>
      <p>{totalCars}</p>
      <p>Current Page: {currentPage}</p>
      <button onClick={fetchPreviousPage} disabled={currentPage === 1}>
        назад
      </button>
      <button onClick={fetchNextPage}>вперед</button>
      {loaded &&
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
            onLoad={() => setLoaded(false)}
          />
        ))}
    </div>
  );
}
