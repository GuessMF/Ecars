import React from "react";
import {useState, useEffect} from "react";
import {collection} from "firebase/firestore";
import {db} from "../../firebase";
import {useAuth} from "hooks/use-auth";
import style from "./__userPage.module.scss";
import BigCard from "components/smart/BigCard/BigCard";
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
        console.log("USER NAME" + userName);
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

  return (
    <div className={style.userPage}>
      <h3>
        {loading ? (
          // Отображение скелетона (заглушки) во время ожидания данных о пользователе
          <h1>Заглушка</h1> // Здесь может быть ваш компонент скелетона
        ) : (
          // Отображение имени пользователя после его получения
          <p>Пользователь: {userName}</p>
        )}
      </h3>
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
              //onLoad={handleLoad}
            />
          ))}
      </div>
    </div>
  );
}
