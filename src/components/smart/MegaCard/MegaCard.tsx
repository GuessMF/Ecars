import React from "react";
import {useState, useEffect, useRef} from "react";
import style from "./__megaCard.module.scss";
import SkeletonSmallImage from "./SkeletonSmallImage";
import SkeletonMegaImage from "./SkeletonMegaImage";
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";

import {doc, setDoc, getDoc} from "firebase/firestore";
import {ref, listAll, getDownloadURL, getStorage} from "firebase/storage";
import {db, storage} from "../../../firebase";

interface DateObject {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
}
interface Props {
  id: string;
  index: number;
  brand: string;
  model: string;
  type: string;
  color: string;
  interior: string;
  year: string;
  price: string;
  fuel: string;
  owners: string;
  location: string;
  mileage: number;
  description: string;
  previewIMG: string;
  transmission: string;
  engineVolume: string;

  wheels: string;
  seats: string;
  dateObj: DateObject;
  selectedCurrency: string;
  usdValue: number;
  eurValue: number;

  onClickDelete: (id: string, carName: string) => void;
  onClickCheck: (brand: string, id: string) => void;

  // sortBy: string;
}

export default function MegaCard({
  id,
  previewIMG,
  brand,
  model,
  price,
  mileage,
  owners,
  fuel,
  type,
  color,
  interior,
  year,
  transmission,
  engineVolume,
  wheels,
  seats,
  location,
  description,
  onClickDelete,
  onClickCheck,
  dateObj,
}: // sortBy,
Props) {
  const [photoURLs, setPhotoURLs] = useState<string[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
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

    const currentIndex = id; // Ваш текущий индекс
    loadPhotosFromFirebase(currentIndex);
  }, [id]);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImageLoaded(true);
    };
    image.src = photoURLs?.[selectedPhoto]; // Подставьте свой путь к изображению из carData
  }, [photoURLs]);

  const onClickLittleImage = (index: number) => {
    window.scrollTo({
      top: 220,
      behavior: "smooth",
    });

    setSelectedPhoto(index);
  };
  const onClickVisitPage = () => {
    navigate(`/details/${id}`);
  };

  const monthNames: {[key: number]: string} = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };
  return (
    <div className={style.megaCard}>
      <div className={style.previewBigImage}>
        {imageLoaded ? (
          <LazyLoadImage
            className={style.bigImg}
            effect="blur" // Добавляет эффект размытия
            src={photoURLs?.[selectedPhoto]}
            alt="Car Preview"
          />
        ) : (
          <SkeletonMegaImage />
        )}
      </div>
      <div className={style.littleImages}>
        {imageLoaded
          ? photoURLs.map((img, index, id) => (
              <LazyLoadImage
                className={style.littleImage}
                effect="blur" // Добавляет эффект размытия
                src={img}
                alt="Car little"
                onClick={() => onClickLittleImage(index)}
              />
            ))
          : [...new Array(8)].map((_, i) => (
              <SkeletonSmallImage key={`skeleton_${i}`} />
            ))}
      </div>
      <div className={style.information}>
        <div className={style.topInformation}>
          <h3>{brand.charAt(0).toLocaleUpperCase() + brand.slice(1)}</h3>
          <h3>{model.toLocaleUpperCase()}</h3>
          <h3>{year}</h3>
        </div>
        <div className={style.mainInformation}>
          <div className={style.left__information}>
            <div>
              <span>Brand</span>{" "}
              <span>
                {brand.charAt(0).toLocaleUpperCase() + brand.slice(1)}
              </span>
            </div>
            <div>
              <span>Model</span> <span>{model.toLocaleUpperCase()}</span>
            </div>

            <div>
              <span>Vehicle type</span>
              <span>{type}</span>
            </div>
            <div>
              <span>Color</span>
              <span>{color}</span>
            </div>
            <div>
              <span>Interior</span> <span>{interior}</span>
            </div>
            <div>
              <span>Owners</span> <span>{owners}</span>
            </div>

            <div>
              <span>Mileage</span> <span>{mileage} Km</span>
            </div>
          </div>
          <div className={style.right__information}>
            <div>
              <span>Year</span> <span>{year}</span>
            </div>
            <div>
              <span>Gearbox</span> <span>{transmission}</span>
            </div>
            <div>
              <span>Engine Volume</span> <span>{engineVolume} L</span>
            </div>

            <div>
              <span>Fuel</span> <span>{fuel}</span>
            </div>
            <div>
              <span>Wheels</span> <span>{wheels}</span>
            </div>

            <div>
              <span>Seats</span> <span>{seats}</span>
            </div>

            <div>
              <span>Location</span> <span>{location}</span>
            </div>
          </div>
        </div>
        <div className={style.description}>
          <h6>Description:</h6>
          <span> {description}</span>
        </div>
        <div className={style.added}>
          <h6>Added:</h6>
          <span>
            {dateObj?.day} {dateObj && monthNames[dateObj?.month]},{" "}
            {dateObj?.year}{" "}
          </span>
        </div>

        <span className={style.price}>$ {price}</span>
        <div className={style.buttons}>
          <button className={style.visit} onClick={onClickVisitPage}>
            Visit page
          </button>
          <button className={style.edit}>Edit</button>
          <button
            className={style.delete}
            onClick={() => onClickCheck(brand, id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
