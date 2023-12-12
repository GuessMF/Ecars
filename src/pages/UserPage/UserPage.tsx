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
  // testImg: string;
}
export default function UserPage({userID}: Props) {
  const [cars, setCars] = useState<Car[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>("");
  const {isAuth, email, displayName} = useAuth();
  const [popUpDel, setPopUpDel] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [correctPassword, setCorrectPassword] = useState<boolean>(false);
  const [carName, setCarName] = useState<string>("");
  const [carId, setCarId] = useState<string>("");

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
  const onDelClick = async () => {
    try {
      const carsRef = collection(db, "cars");
      const docRef = doc(carsRef, carId);
      await deleteDoc(docRef);
      const folderRef = ref(storage, `cars/${carId}`);
      const previewRef = ref(storage, `cars/${carId}/preview/`);
      const previewRes = await listAll(previewRef);
      const res = await listAll(folderRef);

      const deletePreview = previewRes.items.map((itemRef) => {
        return deleteObject(itemRef);
      });

      const deletePromises = res.items.map((itemRef) => {
        return deleteObject(itemRef);
      });
      await Promise.all(deletePreview);
      await Promise.all(deletePromises);

      setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
      console.log("Deleted" + carId);
      // setTimeout(() => {
      setPopUpDel(false);
      setPassword("");

      // }, 2000);
    } catch (error) {
      console.error("Ошибка удаления:", error);
    }
  };

  const onClickCheck = (brand: string, id: string) => {
    setPopUpDel(true);
    setCarName(brand);
    setCarId(id);
  };

  const closePopUp = () => {
    setPopUpDel(false);
  };
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  // console.log("Password: " + password);
  // console.log("CarName: " + carName);

  useEffect(() => {
    //if (carName) {
    //console.log(carName.length);
    //  }
    if (carName.length > 0) {
      if (carName === password) {
        setCorrectPassword(true);
      } else {
        setCorrectPassword(false);
      }
    }
  }, [password]);

  return (
    <div className={style.userPage}>
      {popUpDel && (
        <PopUpDel
          carName={carName}
          password={password}
          correctPassword={correctPassword}
          onConfirmDelete={onDelClick}
          onPasswordChange={onPasswordChange}
          deleteCar={onDelClick}
          closePopUp={closePopUp}
        />
      )}

      <div className={style.header}>
        {loading ? <h1>Заглушка</h1> : <p>Пользователь: {userName}</p>}
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
              previewIMG={car.previewImage[0]}
              //   testImg={car.previewImage[0]}
              onClickDelete={onDelClick}
              onClickCheck={onClickCheck}
              //onLoad={handleLoad}
            />
          ))}
      </div>
    </div>
  );
}
