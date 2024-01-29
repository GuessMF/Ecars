import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import style from "./__bigCard.module.scss";
import Details from "../../ui/Details/Details";
import {NavLink} from "react-router-dom";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {getStorage} from "firebase/storage";
import {LazyLoadImage} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import {useAppSelector} from "hooks/redux-hooks";

interface Props {
  id: string;
  index: number;
  brand: string;
  model: string;
  price: string;
  fuel: string;
  owners: string;
  location: string;
  mileage: number;
  description: string;
  previewIMG: string;
  onClickDelete: (id: string, carName: string) => void;
  onClickCheck: (brand: string, id: string) => void;
}

export default function BigCard({
  id,
  index,
  brand,
  model,
  price,
  fuel,
  owners,
  location,
  mileage,
  description,
  previewIMG,
  onClickDelete,
  onClickCheck,
}: Props) {
  const selectedCurrency = useAppSelector(
    (state) => state.currency.currencyTerm
  );

  const usdValue = useAppSelector((state) => state.currValue.usdValue);
  const eurValue = useAppSelector((state) => state.currValue.eurValue);

  let multiplier: number =
    selectedCurrency === "RUB"
      ? usdValue
      : selectedCurrency === "EUR"
      ? usdValue / eurValue
      : 1;

  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          setUserId(user.uid);
        } else {
          if (user.phoneNumber) {
            setUserId(user.uid);
          }
        }
      }
    });
  }, []);

  const [userPage, setUserPage] = useState<boolean>(false);
  const newPrice = Number(price) * multiplier;
  const currentPrice = parseInt(newPrice.toFixed(0));

  const formattedPrice: string = currentPrice
    .toLocaleString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  const owner = Number(owners);

  useEffect(() => {
    const image = new Image();
    image.src = previewIMG;
  }, [previewIMG]);

  const locationn = useLocation();
  const pathname = locationn.pathname;
  const userPageIndex = pathname.indexOf("/user-page/");

  useEffect(() => {
    if (userPageIndex !== -1) {
      setUserPage(true);
    }
  }, []);

  const capitalizeWords = (brand: string) => {
    const words = brand.toLowerCase().split(" ");
    const capitalizeWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizeWords.join(" ");
  };

  const formatedBrand = capitalizeWords(brand);
  const formattedMileage: string = mileage
    .toLocaleString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  return (
    <div className={style.wrapper}>
      <NavLink to={`${userId ? `/details/${id}` : `/login`}`}>
        <div className={style.bigCard}>
          <div className={style.bigCard__image}>
            <LazyLoadImage
              className={style.bigCard__img}
              effect="blur"
              src={previewIMG}
              alt="Car Preview"
            />
          </div>
          <div className={style.bigCard__information}>
            <div className={style.information__top}>
              <div className={style.information__name}>
                <span>{formatedBrand}</span>
                <span>{model.toLocaleUpperCase()}</span>
              </div>

              <div className={style.information__state}>
                {location === "SaintPetersburg"
                  ? "Saint-Petersburg"
                  : location === "AbuDhabi"
                  ? "Abu Dhabi"
                  : location}{" "}
                • {mileage < 20 ? "Brand NEW" : "Used"} • {formattedMileage} km
                {owners === "None"
                  ? " "
                  : owners === "One"
                  ? " • One owner"
                  : " • " + owners + " Owners"}
              </div>
              <div className={style.information__description}>
                {description}
              </div>
            </div>

            <div className={style.information__bottom}>
              <span>
                {selectedCurrency === "RUB"
                  ? `₽ `
                  : selectedCurrency === "USD"
                  ? "$ "
                  : selectedCurrency === "EUR"
                  ? "€ "
                  : ""}
                {formattedPrice}
              </span>
              <Details />
            </div>
          </div>
        </div>
      </NavLink>
      {userPage && (
        <button
          onClick={() => onClickCheck(brand, id)}
          className={style.delBtn}
        >
          delete
        </button>
      )}
    </div>
  );
}
