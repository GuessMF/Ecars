import {useState, useEffect} from "react";
import style from "./__details.module.scss";
import {Link, useNavigate, useParams} from "react-router-dom";
import {ReactComponent as RightArrow} from "../../assets/icons/specialOffers/rightArrow.svg";
import ContactUsBlock from "../../components/simple/ContactUsBlock/ContactUsBlock";

import DetailsCTA from "../../components/simple/DetailsCTA/DetailsCTA";
import {useSelector} from "react-redux";
import {RootState} from "store";

import {doc, setDoc, getDoc} from "firebase/firestore";
import {ref, listAll, getDownloadURL} from "firebase/storage";
import {db, storage} from "../../firebase";
import {collection, query, getDocs} from "firebase/firestore";
import FullWidthImg from "./FullWidthImg";
import SimilarCars from "components/simple/SimilarCars/SimilarCars";
import Cookies from "universal-cookie";
import {LazyLoadImage} from "react-lazy-load-image-component";
import SkeletonBigImage from "./SkeletonBigImage";
import SkeletonLittleImage from "./SkeletonLittleImage";
import {useAppSelector} from "hooks/redux-hooks";
import NoCar from "./NoCar";
import {useLocation} from "react-router-dom";
import SkeletonBigImageMobile from "./SkeletonBigImageMobile";

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
  color: string;
  userName: string;
  userEmail: string;
  userMobile: string;
  interior: string;
}

export default function Details() {
  const selectedCurrency = useAppSelector(
    (state) => state.currency.currencyTerm
  );

  const usdValue = useAppSelector((state) => state.currValue.usdValue);
  const eurValue = useAppSelector((state) => state.currValue.eurValue);
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigate = useNavigate();

  const [auto, setAuto] = useState<boolean>(false);
  const [photoURLs, setPhotoURLs] = useState<string[]>([]);
  const {id} = useParams<{id?: string}>();

  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const loadPhotosFromFirebase = async (currentIndex?: string) => {
      setImageLoaded(false);
      const previewRef = ref(storage, `cars/${currentIndex}/preview/`);
      const folderRef = ref(storage, `cars/${currentIndex}`);

      try {
        const photoList = await listAll(folderRef);
        const previewImage = await listAll(previewRef);
        const urls = await Promise.all(
          photoList.items.map(async (photo) => {
            return await getDownloadURL(photo);
          })
        );

        const previewUrl = await Promise.all(
          previewImage.items.map(async (photo) => {
            return await getDownloadURL(photo);
          })
        );

        setPhotoURLs([...previewUrl]);
        setPhotoURLs((prev) => [...prev, ...urls]);
        setImageLoaded(true);
      } catch (error) {
        console.error("Error loading photos from Firebase:", error);
      }
    };

    const currentIndex = id;
    loadPhotosFromFirebase(currentIndex);
  }, [id]);

  const [currentCar, setCurrentCar] = useState<Car>();
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    fetchFirstPage();
  }, [id]);

  const fetchFirstPage = async () => {
    try {
      const carsRef = collection(db, "cars");
      let first = query(carsRef);
      const querySnapshot = await getDocs(first);
      const cars = querySnapshot.docs.map((doc) => doc.data() as Car);
      const foundCar = cars.find((car) => car.id === id);
      if (foundCar !== undefined) {
        setAuto(true);

        setCurrentCar(foundCar);
        setLoading(false);
      } else {
        setAuto(false);
      }
    } catch (error) {
      console.error("Error fetching first page: ", error);
    }
  };

  let mileage: string | undefined = currentCar?.mileage
    .toLocaleString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  let formatedBrand;
  let formatedModel;

  const capitalizeWords = (brand: string) => {
    const words = brand.toLowerCase().split(" ");
    const capitalizeWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizeWords.join(" ");
  };

  if (currentCar?.brand) {
    formatedBrand = capitalizeWords(currentCar.brand);
  }

  if (currentCar?.model) {
    formatedModel = currentCar.model.toLocaleUpperCase();
  }

  const userId = useSelector(
    (state: RootState) => (state.user as {id: string})?.id
  );
  const userIdValue = userId;

  const cookies = new Cookies(null, {path: "/"});
  useEffect(() => {
    if (!cookies.get("auth")) {
      navigate("/login");
    }
  }, []);

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
          currentLikedCars.splice(existingCarIndex, 1);
          await setDoc(likedDocRef, {
            likedCars: currentLikedCars,
          });
        } else {
          const updatedLikedCars = [...currentLikedCars, id].filter(Boolean);
          await setDoc(likedDocRef, {
            likedCars: updatedLikedCars,
          });
        }
      } else {
        await setDoc(likedDocRef, {
          likedCars: [id],
        });
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

        const hasMatch = currentLikedCars.some((el: string) => el === id);
        setLiked(hasMatch);
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
    const formattedLocation = currentCar.location?.replace(/\s/g, "");
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

  const [fullWidth, setFullWidth] = useState<boolean>(false);
  const openFullWidthImg = () => {
    setFullWidth(true);
  };

  const closeFullWidthImg = () => {
    setFullWidth(false);
  };

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImageLoaded(true);
    };
    image.src = photoURLs?.[selectedPhoto];
  }, [photoURLs]);

  const changeLittlePhoto = (index: number) => {
    const topPage: number = window.innerWidth <= 450 ? 0 : 40;
    window.scrollTo({
      top: topPage,
      behavior: "smooth",
    });
    setSelectedPhoto(index);
  };
  useEffect(() => {
    if (photoURLs.length < 1) {
      setAuto(false);
    } else {
      setAuto(true);
    }
  }, [photoURLs]);
  const location = useLocation();

  return (
    <div className={style.details}>
      {fullWidth && (
        <FullWidthImg
          imgSrc={photoURLs?.[selectedPhoto]}
          handleClose={closeFullWidthImg}
        />
      )}
      {auto && (
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
              {currentCar?.mileage && currentCar?.mileage < 100
                ? "New"
                : "Used"}{" "}
              cars for sale in{" "}
              {currentCar?.location === "AbuDhabi"
                ? "Abu Dhabi"
                : currentCar?.location === "SaintPetersburg"
                ? "Saint-Petersburg"
                : currentCar?.location}
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
            <span>{formatedBrand}</span>
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
              {formatedBrand} {formatedModel}
            </span>
          </Link>
        </div>
      )}
      {auto ? (
        <div className={style.details__main}>
          <div className={style.content}>
            <div className={style.content__pictures}>
              <div className={style.bigPicture}>
                {imageLoaded ? (
                  <LazyLoadImage
                    effect="blur"
                    src={photoURLs?.[selectedPhoto]}
                    alt="Car Preview"
                  />
                ) : screenWidth <= 450 ? (
                  <SkeletonBigImageMobile />
                ) : (
                  <SkeletonBigImage />
                )}
                <button className={style.fullWidth} onClick={openFullWidthImg}>
                  Full width
                </button>
              </div>
              <div className={style.littlePictures}>
                {imageLoaded
                  ? photoURLs.map((img, index, id) => (
                      <LazyLoadImage
                        key={`load img${index}`}
                        className={style.little_preview}
                        effect="blur"
                        src={img}
                        alt="Car little"
                        onClick={() => changeLittlePhoto(index)}
                      />
                    ))
                  : [...new Array(screenWidth <= 450 ? 4 : 8)].map((_, i) => (
                      <SkeletonLittleImage key={`skeleton_${i}`} />
                    ))}
              </div>
            </div>
            {screenWidth <= 1200 && (
              <DetailsCTA
                brand={currentCar?.brand}
                model={currentCar?.model}
                price={currentCar?.price}
                location={currentCar?.location}
                exportStatus={currentCar?.exportStatus}
                year={currentCar?.year}
                mileage={mileage}
                owners={currentCar?.owners}
                dateObj={currentCar?.dateObj}
                selectedCurrency={selectedCurrency}
                usdValue={usdValue}
                eurValue={eurValue}
                addLiked={() => addLiked()}
                liked={liked}
                handleLike={handleLike}
                sellerEmail={currentCar?.userEmail}
                sellerName={currentCar?.userName}
                sellerMobile={currentCar?.userMobile}
              />
            )}
            <div className={style.content__mainInformation}>
              <div className={style.left__information}>
                <div>
                  <span>Brand</span> <span>{formatedBrand}</span>
                </div>
                <div>
                  <span>Model</span> <span>{formatedModel}</span>
                </div>

                <div>
                  <span>Vehicle type</span>
                  <span>
                    {currentCar?.vehicleType === "StationWagon"
                      ? "Station Wagon"
                      : currentCar?.vehicleType === "PickUp"
                      ? "Pick Up"
                      : currentCar?.vehicleType}
                  </span>
                </div>
                <div>
                  <span>Color</span>
                  <span>{currentCar?.color}</span>
                </div>
                <div>
                  <span>Interior</span> <span>{currentCar?.interior}</span>
                </div>
                <div>
                  <span>Owners</span> <span>{currentCar?.owners}</span>
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
                  <span>Location</span>{" "}
                  <span>
                    {currentCar?.location === "AbuDhabi"
                      ? "Abu Dhabi"
                      : currentCar?.location === "SaintPetersburg"
                      ? "Saint-Petersburg"
                      : currentCar?.location}
                  </span>
                </div>
              </div>
            </div>
            <div className={style.content__description}>
              <h5>Description</h5>
              <div className={style.description}>{currentCar?.description}</div>
              {currentCar && currentCar.description.length > 500 ? (
                <div>MORE</div>
              ) : null}
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
                  {formatedBrand} {formatedModel} {currentCar?.year}
                </Link>

                <Link
                  to={{
                    pathname: "/catalog",
                    search: searchQuery2,
                  }}
                >
                  {formatedBrand} {formatedModel} for sale in{" "}
                  {currentCar?.location === "AbuDhabi"
                    ? "Abu Dhabi"
                    : currentCar?.location === "SaintPetersburg"
                    ? "Saint-Petersburg"
                    : currentCar?.location}
                </Link>

                <Link
                  to={{
                    pathname: "/catalog",
                    search: searchQuery3,
                  }}
                >
                  {formatedBrand} for sale in{" "}
                  {currentCar?.location === "AbuDhabi"
                    ? "Abu Dhabi"
                    : currentCar?.location === "SaintPetersburg"
                    ? "Saint-Petersburg"
                    : currentCar?.location}
                </Link>

                <Link
                  to={{
                    pathname: "/catalog",
                    search: searchQuery4,
                  }}
                >
                  All cars for sale in{" "}
                  {currentCar?.location === "AbuDhabi"
                    ? "Abu Dhabi"
                    : currentCar?.location === "SaintPetersburg"
                    ? "Saint-Petersburg"
                    : currentCar?.location}
                </Link>
              </div>
            </div>
            <div className={style.content__similar_cars}>
              <h5>Similar cars</h5>
              <SimilarCars
                similarBrand={currentCar?.brand}
                similarModel={currentCar?.model}
                currentId={id}
              />
            </div>
          </div>

          {screenWidth >= 1200 && (
            <DetailsCTA
              brand={currentCar?.brand}
              model={currentCar?.model}
              price={currentCar?.price}
              location={currentCar?.location}
              exportStatus={currentCar?.exportStatus}
              year={currentCar?.year}
              mileage={mileage}
              owners={currentCar?.owners}
              dateObj={currentCar?.dateObj}
              selectedCurrency={selectedCurrency}
              usdValue={usdValue}
              eurValue={eurValue}
              addLiked={() => addLiked()}
              liked={liked}
              handleLike={handleLike}
              sellerEmail={currentCar?.userEmail}
              sellerName={currentCar?.userName}
              sellerMobile={currentCar?.userMobile}
            />
          )}
        </div>
      ) : (
        <NoCar founted={auto} loading={loading} />
      )}
    </div>
  );
}
