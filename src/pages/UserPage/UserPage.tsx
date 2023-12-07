import React from "react";
import {useState, useEffect} from "react";
import {collection} from "firebase/firestore";
import {db} from "../../firebase";
import {useNavigate} from "react-router-dom";
import {useAuth} from "hooks/use-auth";
import style from "./__userPage.module.scss";
import BigCard from "components/smart/BigCard/BigCard";
import Cookies from "universal-cookie";
import {
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
import {doc, setDoc, getDoc, deleteDoc} from "firebase/firestore";
import {
  ref,
  listAll,
  getDownloadURL,
  getStorage,
  deleteObject,
  getMetadata,
} from "firebase/storage";
import PopUpDel from "./PopUpDel";
interface Props {
  userID: string;
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
export default function UserPage({userID}: Props) {
  const [cars, setCars] = useState<Car[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>("");
  const {isAuth, email, displayName} = useAuth();
  const [popUpDel, setPopUpDel] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [carName, setCarName] = useState<string>("");

  const [deletedItems, setDeletedItems] = useState([]);

  const cookies = new Cookies(null, {path: "/"});
  useEffect(() => {
    if (!cookies.get("auth")) {
      navigate("/login");
    }
  }, []);
  const storage = getStorage();
  const navigate = useNavigate();

  useEffect(() => {
    if (userID) {
      fetchSalingCars();
    }
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

  const fetchSalingCars = async () => {
    try {
      const carsRef = collection(db, "cars");
      let first = query(carsRef);
      first = query(first, where("userId", "==", userID));
      first = query(first, orderBy("dateAdded", "asc"));
      const querySnapshot = await getDocs(first);
      const cars = querySnapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as Car
      );
      setCars(cars);
      setLoaded(true);
    } catch (error) {
      console.error("Error fetching first page: ", error);
    }
  };
  const onDelClick = async (carId: string, carName: string) => {
    console.log(carName);
    if (password === carName) {
      console.log("Можно удалять");
    } else {
      console.log(password);
      console.log(carName);

      console.log("Неверный пароль");
    }
    // try {
    //   const carsRef = collection(db, "cars");
    //   const docRef = doc(carsRef, carId);
    //   await deleteDoc(docRef);
    //   const folderRef = ref(storage, `cars/${carId}`);
    //   const res = await listAll(folderRef);
    //   const deletePromises = res.items.map((itemRef) => {
    //     return deleteObject(itemRef);
    //   });
    //   await Promise.all(deletePromises);
    //   setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
    // } catch (error) {
    //   console.error("Ошибка удаления:", error);
    // }
  };

  // const handleDelete = (password: string) => {
  //   // ваша логика удаления с паролем
  //   console.log("Пароль для удаления:", password);
  //   setPassword(password);
  // };
  // console.log(password);

  const onClickCheck = (brand: string) => {
    setCarName(brand);
    setPopUpDel(true);
    console.log(carName);
  };
  console.log(password);

  return (
    <div className={style.userPage}>
      {popUpDel && <PopUpDel carName={carName} onConfirmDelete={onDelClick} />}

      <div className={style.header}>
        {loading ? (
          // Отображение скелетона (заглушки) во время ожидания данных о пользователе
          <h1>Заглушка</h1> // Здесь может быть ваш компонент скелетона
        ) : (
          // Отображение имени пользователя после его получения
          <p>Пользователь: {userName}</p>
        )}
      </div>
      <h4>Your cars are on sale:</h4>
      <div className={style.wrapper}>
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
              onClickDelete={onDelClick}
              onClickCheck={onClickCheck}
              //onLoad={handleLoad}
            />
          ))}
      </div>
    </div>
  );
}
