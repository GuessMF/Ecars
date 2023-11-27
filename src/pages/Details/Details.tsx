import React from "react";
import {useState, useEffect, useRef} from "react";
import style from "./__details.module.scss";
import {Link, useNavigate, useParams} from "react-router-dom";
import {NavLink} from "react-router-dom";

// import {cars} from '../../helpers/cars.json'
// import {cars} from "../../helpers/carList";
// import jsonData from "../../helpers/cars.json";

// import {ReactComponent as RightArrow} from "../../../assets/icons/specialOffers/rightArrow.svg";
import {ReactComponent as RightArrow} from "../../assets/icons/specialOffers/rightArrow.svg";
import ContactUsBlock from "../../components/simple/ContactUsBlock/ContactUsBlock";
// import Email from "../../components/ui/Email/Email";
// import Mobile from "../../components/ui/Mobile/Mobile";
// import {ReactComponent as CheckMarkDetails} from "../../assets/icons/checkMarkDetails.svg";
// import {ReactComponent as DownloadIcon} from "../../assets/icons/downloadIcon.svg";
// import {ReactComponent as LikeIcon} from "../../assets/icons/likeIcon.svg";
// import {ReactComponent as ShareIcon} from "../../assets/icons/shareIcon.svg";
import DetailsCTA from "../../components/simple/DetailsCTA/DetailsCTA";
import {useSelector} from "react-redux";
import {RootState} from "store";
import Skeleton from "../../components/ui/Skeleton/Skeleton";
import {doc, setDoc, getDoc} from "firebase/firestore";
import {ref, listAll, getDownloadURL, getStorage} from "firebase/storage";
// import {log} from "console";
// import { listAll, getDownloadURL } from 'firebase/storage';
// import {getDocs} from "firebase/firestore/lite";
// import {initializeApp} from "firebase/app";
// import {getFirestore} from "firebase/firestore";
// import SelectedFilter from "../../components/ui/SelectedFilter/SelectedFilter";
import {db, storage} from "../../firebase";
// import {Swiper, SwiperSlide} from "swiper/react";
import {Swiper as SwiperCore} from "swiper/types";
// import {Autoplay, Pagination, Navigation} from "swiper/modules";
// import {Virtual} from "swiper/modules";
import {collection, query, getDocs} from "firebase/firestore";
// interface LikedCar {
//   carId: string;
//   carIndex: string;
// }
// interface RouteParams {
//   id: string;
//   [key: string]: string | undefined;
// }
// interface Car {
//   id: string;
//   brand: string;
//   model: string;
//   price?: string;
//   year?: string;
// }
// interface DataItem {
//   id: string;
//   brand: string;
//   model: string;
//   year: number;
//   price: number;

//   // Добавьте другие свойства объекта данных, если необходимо
// }
// interface DateObject {
//   year: number;
//   month: number;
//   day: number;
//   hours: number;
//   minutes: number;
// }
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
  year: number;
  owners: string;
  seats: string;
  description: string;
  mileage: number;
  transmission: string;
  engineCapacity: string;
  wheels: string;
  imageUrl: string;
  exportStatus: string;
  dateObj: DateObject;
}

interface DetailsProps {
  selectedCurrency: string;
  eurValue: number;
  usdValue: number;
}
export default function Details({
  selectedCurrency,
  eurValue,
  usdValue,
}: DetailsProps) {
  const swiperRef = useRef<SwiperCore>();
  const navigate = useNavigate();
  const black: string = "#1A1A1A";
  // const [carData, setCarData] = useState(null);

  // const [cars, setCars] = useState<Car[]>([]);

  const [photoURLs, setPhotoURLs] = useState<string[]>([]);
  const {id} = useParams<{id?: string}>();

  const [selectedPhoto, setSelectedPhoto] = useState(0);

  useEffect(() => {
    const loadPhotosFromFirebase = async (currentIndex?: string) => {
      const folderRef = ref(storage, `cars/${currentIndex}`);
      try {
        const photoList = await listAll(folderRef);
        const urls = await Promise.all(
          photoList.items.map(async (photo) => {
            return await getDownloadURL(photo);
          })
        );
        setPhotoURLs(urls);
        // console.log(photoURLs);
      } catch (error) {
        console.error("Error loading photos from Firebase:", error);
      }
    };

    const currentIndex = id; // Ваш текущий индекс
    loadPhotosFromFirebase(currentIndex);
  }, [id]);

  // const [currentCar, setCurrentCar] = useState<{
  //   brand: string;
  //   model: string;
  //   price: number;
  //   year: number;
  //   mileage: number;
  //   transmission: string;
  //   fuel: string;
  //   wheels: number;
  //   vehicleType: string;
  //   engineCapacity: number;
  //   owners: string;
  //   seats: number;
  //   color: string;
  //   interior: string;
  //   location: string;
  //   exportStatus: string;
  //   description: string;
  //   dateObj: DateObject;
  // } | null>(null);
  const [currentCar, setCurrentCar] = useState<Car>();
  const [liked, setLiked] = useState<boolean>(false);

  // useEffect(() => {
  //   fetch("https://65378b85bb226bb85dd365a6.mockapi.io/cars")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((json) => {
  //       const foundObject = json.find((item: {id: string}) => item.id === id);
  //       if (foundObject) {
  //         // console.log("Найденный объект:", foundObject);
  //         setCurrentCar({
  //           brand: foundObject.brand,
  //           model: foundObject.model,
  //           price: foundObject.price,
  //           year: foundObject.year,
  //           transmission: foundObject.transmission,
  //           owners: foundObject.owners,
  //           fuel: foundObject.fuel,
  //           wheels: foundObject.wheels,
  //           color: foundObject.color,
  //           vehicleType: foundObject.vehicleType,
  //           engineCapacity: foundObject.engineCapacity,
  //           seats: foundObject.seats,
  //           interior: foundObject.interior,
  //           location: foundObject.location,
  //           exportStatus: foundObject.exportStatus,
  //           mileage: foundObject.mileage,
  //           description: foundObject.description,
  //           dateObj: foundObject.dateObj,
  //         });
  //       } else {
  //         console.log("Объект с id", id, "не найден.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Произошла ошибка при получении данных:", error);
  //     });
  // }, []);

  useEffect(() => {
    fetchFirstPage();
  }, []);

  const fetchFirstPage = async () => {
    try {
      const carsRef = collection(db, "cars");
      let first = query(carsRef);
      const querySnapshot = await getDocs(first);
      const cars = querySnapshot.docs.map((doc) => doc.data() as Car);
      const foundCar = cars.find((car) => car.id === id);
      if (foundCar !== undefined) {
        setCurrentCar(foundCar);
      }
    } catch (error) {
      console.error("Error fetching first page: ", error);
    }
  };

  let mileage: string | undefined = currentCar?.mileage
    .toLocaleString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  const userId = useSelector(
    (state: RootState) => (state.user as {id: string})?.id
  );
  const userIdValue = userId; // userId уже содержит id, поэтому дополнительный ? и .id не нужны

  useEffect(() => {
    if (!userIdValue) {
      navigate("/login");
    }
  }, [userIdValue]);

  const addLiked = async () => {
    const likedRef = collection(db, "likedCars");
    const likedDocRef = doc(likedRef, userIdValue);

    try {
      const likedDocSnap = await getDoc(likedDocRef);

      if (likedDocSnap.exists()) {
        const likedData = likedDocSnap.data();
        const currentLikedCars = likedData?.likedCars || [];

        const existingCarIndex = currentLikedCars.findIndex(
          (carId: string) => carId === id
        );

        if (existingCarIndex !== -1) {
          // Если автомобиль уже лайкнут, удаляем его из массива
          currentLikedCars.splice(existingCarIndex, 1);
          await setDoc(likedDocRef, {
            likedCars: currentLikedCars,
          });

          console.log("Автомобиль удален из массива likedCars!");
        } else {
          const updatedLikedCars = [...currentLikedCars, id].filter(Boolean);
          await setDoc(likedDocRef, {
            likedCars: updatedLikedCars,
          });

          console.log(
            "Новый лайкнутый автомобиль добавлен в массив likedCars!"
          );
        }
      } else {
        // Если документ не существует, создаем новый с массивом likedCars
        await setDoc(likedDocRef, {
          likedCars: [id],
        });

        console.log("Документ с лайкнутыми автомобилями создан!");
      }
    } catch (error) {
      console.error("Ошибка при обновлении документа: ", error);
    }
  };

  const fetchLiked = async () => {
    const likedRef = collection(db, "likedCars");
    const likedDocRef = doc(likedRef, userIdValue);
    try {
      const likedDocSnap = await getDoc(likedDocRef);
      if (likedDocSnap.exists()) {
        const likedData = likedDocSnap.data();
        const currentLikedCars = likedData?.likedCars || [];
        console.log(currentLikedCars);
        const hasMatch = currentLikedCars.some((el: string) => el === id);
        setLiked(hasMatch);
        console.log(hasMatch + " hasMatch");
      }
    } catch (error) {
      console.error("Ошибка при скачивании документа: ", error);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    addLiked();
  };

  useEffect(() => {
    if (userIdValue) {
      fetchLiked();
    }
  }, [userIdValue]);

  // const brandParam =
  //   currentCar && currentCar.brand ? encodeURIComponent(currentCar.brand) : ""; // Проверяем существование и определяем значение brandParam

  // const searchQuery1 = `?brand=${brandParam}`;

  // const params: { [key: string]: string | number | boolean } = {};

  // if (currentCar && currentCar.brand) {
  //   params.brand = encodeURIComponent(currentCar.brand);
  // }

  // if (currentCar && currentCar.year) {
  //   params.color = encodeURIComponent(currentCar.year);
  // }

  // // Создаем новый экземпляр URLSearchParams и добавляем параметры
  // const searchParams = new URLSearchParams(params);

  // const searchQuery = searchParams.toString(); // Получаем строку запроса
  const searchParams1 = new URLSearchParams();
  const searchParams2 = new URLSearchParams();
  const searchParams3 = new URLSearchParams();
  const searchParams4 = new URLSearchParams();
  const searchParams5 = new URLSearchParams();
  const searchParams6 = new URLSearchParams();
  const searchParams7 = new URLSearchParams();

  if (currentCar && currentCar.brand) {
    searchParams1.append("brand", currentCar.brand);
    searchParams2.append("brand", currentCar.brand);
    searchParams3.append("brand", currentCar.brand);
    searchParams6.append("brand", currentCar.brand);
    searchParams7.append("brand", currentCar.brand);
  }
  if (currentCar && currentCar.year) {
    searchParams1.append("year", currentCar.year.toString());
  }
  if (currentCar && currentCar.model) {
    searchParams1.append("model", currentCar.model);
    searchParams2.append("model", currentCar.model);
    searchParams7.append("model", currentCar.model);
  }
  if (currentCar && currentCar.location) {
    const formattedLocation = currentCar.location?.replace(/\s/g, ""); // Заменяем пробелы на символ "_"
    searchParams2.append("location", formattedLocation);
    searchParams3.append("location", formattedLocation);
    searchParams4.append("location", formattedLocation);
    searchParams5.append("location", formattedLocation);
  }
  if (currentCar && currentCar.mileage) {
    currentCar.mileage < 100
      ? searchParams5.append("mileage", "New")
      : searchParams5.append("mileage", "Used");
  }

  const searchQuery1 = searchParams1.toString();
  const searchQuery2 = searchParams2.toString();
  const searchQuery3 = searchParams3.toString();
  const searchQuery4 = searchParams4.toString();
  const searchQuery5 = searchParams5.toString();
  const searchQuery6 = searchParams6.toString();
  const searchQuery7 = searchParams7.toString();

  return (
    <div className={style.details}>
      <div className={style.topNavigation}>
        <Link
          to={{
            pathname: "/catalog",
          }}
        >
          <span>Home</span>
        </Link>
        <i>
          <RightArrow />
        </i>

        <Link
          to={{
            pathname: "/catalog",
            search: searchQuery5,
          }}
        >
          <span>
            {currentCar?.mileage && currentCar?.mileage < 100 ? "New" : "Used"}{" "}
            cars for sale in {currentCar?.location}
          </span>
        </Link>

        <i>
          <RightArrow />
        </i>

        <Link
          to={{
            pathname: "/catalog",
            search: searchQuery6,
          }}
        >
          <span>{currentCar?.brand}</span>
        </Link>

        <i>
          <RightArrow />
        </i>

        <Link
          to={{
            pathname: "/catalog",
            search: searchQuery7,
          }}
        >
          <span>
            {currentCar?.brand} {currentCar?.model}
          </span>
        </Link>
      </div>
      {currentCar !== null ? (
        <div className={style.details__main}>
          <div className={style.content}>
            <div className={style.content__pictures}>
              <div className={style.bigPicture}>
                <img src={photoURLs?.[selectedPhoto]} alt="pic" />
              </div>
              <div className={style.littlePictures}>
                {photoURLs.map((img, index) => (
                  <img
                    className={style.little_preview}
                    src={img}
                    onClick={() => setSelectedPhoto(index)}
                  />
                ))}
              </div>
            </div>

            {window.innerWidth <= 768 && (
              <DetailsCTA
                brand={currentCar?.brand}
                model={currentCar?.model}
                price={currentCar?.price}
                location={currentCar?.location}
                exportStatus={currentCar?.exportStatus}
                year={currentCar?.year}
                mileage={mileage}
                dateObj={currentCar?.dateObj}
                selectedCurrency={selectedCurrency}
                usdValue={usdValue}
                eurValue={eurValue}
                addLiked={() => addLiked()}
                liked={liked}
                handleLike={handleLike}
              />
            )}

            <div className={style.content__mainInformation}>
              <div className={style.left__information}>
                <div>
                  <span>Make</span> <span>{currentCar?.brand}</span>
                </div>
                <div>
                  <span>Model</span> <span>{currentCar?.model}</span>
                </div>

                <div>
                  <span>Vehicle type</span>
                  <span>{currentCar?.vehicleType}</span>
                </div>
                <div>
                  <span>Color</span>
                  <span>{currentCar?.model}</span>
                </div>
                <div>
                  <span>Interior</span> <span>{currentCar?.brand}</span>
                </div>
                <div>
                  <span>Owners</span>{" "}
                  <span>
                    {currentCar?.owners === "0"
                      ? "None"
                      : currentCar?.owners
                      ? "4"
                      : "3+"}
                  </span>
                </div>

                <div>
                  <span>Mileage</span> <span>{mileage + " km"}</span>
                </div>
              </div>
              <div className={style.right__information}>
                <div>
                  <span>Year</span> <span>{currentCar?.year}</span>
                </div>
                <div>
                  <span>Gearbox</span> <span>{currentCar?.transmission}</span>
                </div>
                <div>
                  <span>Engine Volume</span>{" "}
                  <span>{currentCar?.engineCapacity}</span>
                </div>

                <div>
                  <span>Fuel</span> <span>{currentCar?.fuel}</span>
                </div>
                <div>
                  <span>Wheels</span> <span>{"R " + currentCar?.wheels}</span>
                </div>

                <div>
                  <span>Seats</span> <span>{currentCar?.seats}</span>
                </div>

                <div>
                  <span>Location</span> <span>{currentCar?.location}</span>
                </div>
              </div>
            </div>
            <div className={style.content__description}>
              <h5>Description</h5>
              <div className={style.description}>{currentCar?.description}</div>
              <div>MORE</div>
            </div>
            <div className={style.content__features}>
              <h5>Features</h5>
              <div className={style.features}>
                {" "}
                <div className={style.features_left}>
                  {" "}
                  <span>Interior</span>
                  <ul>
                    <li>Air conditioning</li>
                    <li>Bluetooth system</li>
                    <li>Climate control</li>
                    <li>Cooled front seats</li>
                    <li>Cruise control</li>
                    <li>Heated seats</li>
                    <li>Leather seats</li>
                    <li>Sunroof</li>
                    <li>Navigation system</li>
                    <li>Power locks</li>
                    <li>Power seats</li>
                    <li>Power windows</li>
                    <li>Premium sound system</li>
                    <li>Tuner/radio</li>
                    <li>Rear camera</li>
                  </ul>
                </div>
                <div className={style.features_right}>
                  <span>Exterior</span>
                  <ul>
                    <li>Rear camera</li>
                    <li>Keyless go</li>
                    <li>Performance tyres</li>
                    <li>Premium paint</li>
                  </ul>
                  <span>Security & Environment</span>
                  <ul>
                    <li>4WD</li>
                    <li>ABS</li>
                    <li>Adaptive lighting</li>
                    <li>Airbags (front and side)</li>
                    <li>Tinted windows</li>
                    <li>All wheel drive</li>
                    <li>Adaptive cruise control</li>
                    <li>Traction control</li>
                    <li>Differential lock</li>
                  </ul>
                </div>
              </div>
            </div>
            <ContactUsBlock />
            <div className={style.content__quick_links}>
              <h5>Quick links</h5>
              <div className={style.links}>
                <Link
                  to={{
                    pathname: "/catalog",
                    search: searchQuery1,
                  }}
                >
                  {currentCar?.brand} {currentCar?.model} {currentCar?.year}
                </Link>

                <Link
                  to={{
                    pathname: "/catalog",
                    search: searchQuery2,
                  }}
                >
                  {currentCar?.brand} {currentCar?.model} for sale in{" "}
                  {currentCar?.location}
                </Link>

                <Link
                  to={{
                    pathname: "/catalog",
                    search: searchQuery3,
                  }}
                >
                  {currentCar?.brand} for sale in {currentCar?.location}
                </Link>

                <Link
                  to={{
                    pathname: "/catalog",
                    search: searchQuery4,
                  }}
                >
                  All cars for sale in {currentCar?.location}
                </Link>
              </div>
            </div>
            <div className={style.content__similar_cars}>
              <h5>Similar Cars</h5>
            </div>
          </div>

          {window.innerWidth > 768 && (
            <DetailsCTA
              brand={currentCar?.brand}
              model={currentCar?.model}
              price={currentCar?.price}
              location={currentCar?.location}
              exportStatus={currentCar?.exportStatus}
              year={currentCar?.year}
              mileage={mileage}
              dateObj={currentCar?.dateObj}
              selectedCurrency={selectedCurrency}
              usdValue={usdValue}
              eurValue={eurValue}
              addLiked={() => addLiked()}
              liked={liked}
              handleLike={handleLike}
            />
          )}
        </div>
      ) : (
        <p>Данные не загружены</p>
      )}

      {/* <div className={style.testGAPI}>
        <Skeleton />
      </div> */}
    </div>
  );
}
