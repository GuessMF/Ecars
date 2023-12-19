import React from "react";
import {useState, useEffect} from "react";
import {collection} from "firebase/firestore";
import {db} from "../../firebase";
import {useNavigate} from "react-router-dom";
import {useAuth} from "hooks/use-auth";
import {NavLink} from "react-router-dom";
import style from "./__userPage.module.scss";
// import BigCard from "components/smart/BigCard/BigCard";
import ArrowUp from "./arrowUp.webp";
import ArrowDown from "./arrowDown.webp";
import {useAppSelector} from "hooks/redux-hooks";
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
  OrderByDirection,
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
import MegaCard from "components/smart/MegaCard/MegaCard";
import LittleCard from "components/smart/LittleCard/LittleCard";
interface Props {
  userID: string;
}
interface DateObject {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
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
  year: string;
  owners: string;
  description: string;
  color: string;
  interior: string;
  mileage: number;
  imageUrl: string;
  transmission: string;
  wheels: string;
  seats: string;
  engineCapacity: string;
  previewImage: string;
  dateObj: DateObject;

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
  const [sortBy, setSortBy] = useState<string>("brand");

  const [sortSetting, setSortSetting] = useState<string | undefined>("asc");

  const [currentCar, setCurrentCar] = useState<number>(0);

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
  }, [userID, sortBy, sortSetting]);

  useEffect(() => {
    const fetchData = async () => {
      if (isAuth && displayName) {
        setUserName(displayName);
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuth, displayName, loading, currentCar]);

  const fetchSalingCars = async () => {
    try {
      const carsRef = collection(db, "cars");
      let first = query(carsRef);
      first = query(first, where("userId", "==", userID));
      first = query(first, orderBy(sortBy, sortSetting as OrderByDirection));
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

  useEffect(() => {
    if (carName.length > 0) {
      if (carName === password) {
        setCorrectPassword(true);
      } else {
        setCorrectPassword(false);
      }
    }
  }, [password]);

  // useEffect(() => {
  //   console.log(currentCar);
  //   fetchSalingCars();
  // }, [currentCar]);

  const onClickLittleCard = (index: number) => {
    setCurrentCar(index);

    window.scrollTo({
      top: 160,
      behavior: "smooth",
    });
  };
  // const handleSortBy = (value: string) => {
  //   setSortBy(value);
  // };
  const handleSortBy = (value: string) => {
    if (sortBy === value) {
      if (sortSetting === "asc") {
        setSortSetting("desc");
      } else {
        setSortSetting("asc");
      }
    } else {
      setSortBy(value);
    }
  };

  // useEffect(() => {
  //   console.log(sortBy);
  // }, [sortBy]);

  // console.log(cars);

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
        <h1>Personal page</h1>
        <p>
          {userName
            ? userName.charAt(0).toLocaleUpperCase() + userName.slice(1)
            : "no name"}
          , welcome to your personal page, here are all the cars that you have
          for sale
        </p>
        {cars.length > 0 ? (
          <div className={style.sorting}>
            <span>Sort by:</span>

            <button
              onClick={() => handleSortBy("dateAdded")}
              className={sortBy === "dateAdded" ? style.checked : ""}
            >
              Date
              {sortBy === "dateAdded" &&
                (sortSetting === "asc" ? (
                  <img src={ArrowUp} alt="arrowUp" className={style.icon} />
                ) : (
                  <img src={ArrowDown} alt="arrowDown" className={style.icon} />
                ))}
            </button>
            <button
              onClick={() => handleSortBy("price")}
              className={sortBy === "price" ? style.checked : ""}
            >
              Price
              {sortBy === "price" &&
                (sortSetting === "asc" ? (
                  <img src={ArrowUp} alt="arrowUp" className={style.icon} />
                ) : (
                  <img src={ArrowDown} alt="arrowDown" className={style.icon} />
                ))}
            </button>
            <button
              onClick={() => handleSortBy("brand")}
              className={sortBy === "brand" ? style.checked : ""}
            >
              Brand
              {sortBy === "brand" &&
                (sortSetting === "asc" ? (
                  <img src={ArrowUp} alt="arrowUp" className={style.icon} />
                ) : (
                  <img src={ArrowDown} alt="arrowDown" className={style.icon} />
                ))}
            </button>
          </div>
        ) : (
          <h5>No cars yet</h5>
        )}
      </div>
      <div className={style.wrapper}>
        {loaded && cars.length > 0 && (
          <MegaCard
            key={"1"}
            id={cars[currentCar]?.id}
            index={0}
            brand={cars[currentCar]?.brand}
            model={cars[currentCar]?.model}
            price={cars[currentCar]?.price}
            fuel={cars[currentCar]?.fuel}
            owners={cars[currentCar]?.owners}
            location={cars[currentCar]?.location}
            type={cars[currentCar]?.vehicleType}
            color={cars[currentCar]?.color}
            interior={cars[currentCar]?.interior}
            year={cars[currentCar]?.year}
            transmission={cars[currentCar]?.transmission}
            engineVolume={cars[currentCar]?.engineCapacity}
            wheels={cars[currentCar]?.wheels}
            seats={cars[currentCar]?.seats}
            mileage={cars[currentCar]?.mileage}
            description={cars[currentCar]?.description}
            previewIMG={cars[currentCar]?.previewImage[0]}
            dateObj={cars[currentCar]?.dateObj}
            onClickDelete={onDelClick}
            onClickCheck={onClickCheck}
          />
        )}
        {cars.length > 1 && <h5>Other cars you liked:</h5>}

        <div className={style.otherCars}>
          {loaded &&
            cars.map(
              (car: any, index: number) =>
                index !== currentCar && (
                  <div
                    className={style.littleCard}
                    onClick={() => onClickLittleCard(index)}
                  >
                    <LittleCard
                      brand={car.brand}
                      model={car.model}
                      price={car.price}
                      fuel={car.fuel}
                      mileage={car.mileage}
                      owners={car.owners}
                      special={false}
                      previewIMG={car.previewImage[0]}
                      location={car.location}
                    />
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
}
