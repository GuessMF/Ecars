import React from "react";
import {useState, useEffect} from "react";
import Email from "../../ui/Email/Email";
import GetAquote from "../../ui/GetAquote/GetAquote";
import Mobile from "../../ui/Mobile/Mobile";
import style from "./__hero.module.scss";
import {NavLink} from "react-router-dom";
import {useAuth} from "hooks/use-auth";
import {getAuth} from "firebase/auth";
import {onAuthStateChanged} from "firebase/auth";

// interface Props {
//   color: string;
//   data: string;
// }
const black: string = "#1A1A1A";
const version: string = "little";

export default function Hero() {
  const [userId, setUserId] = useState<string>("");
  const {isAuth, email, displayName} = useAuth();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      user && setUserId(user?.uid);
    });
  }, []);

  return (
    <div className={style.hero}>
      <div className={style.hero__content}>
        <div className={style.content__title}>
          <h1>Car import services with delivery to your doorstep.</h1>
        </div>
        <div className={style.content__subtitle}>
          {userId ? (
            <NavLink to={`/sell/${userId}`}>
              <GetAquote version={version} />
            </NavLink>
          ) : (
            <NavLink to={`/login`}>
              <GetAquote version={version} />
            </NavLink>
          )}

          <div>
            <a href="https://wa.me/+79214003269">
              <Mobile color={black} number={"+79214003269"} />
            </a>
            <a href="mailto:segas95@yandex.ru">
              <Email color={black} email={"segas95@yandex.ru"} />
            </a>
          </div>
        </div>
      </div>
      <div className={style.hero__benefits}>
        <div className={style.benefits__first}>
          <div className={style.benefits__circut}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6667 5.00002H13.3333V3.33335C13.3333 2.89133 13.1577 2.4674 12.8452 2.15484C12.5326 1.84228 12.1087 1.66669 11.6667 1.66669H8.33334C7.40834 1.66669 6.66667 2.40835 6.66667 3.33335V5.00002H3.33334C2.40834 5.00002 1.66667 5.74169 1.66667 6.66669V15.8334C1.66667 16.2754 1.84227 16.6993 2.15483 17.0119C2.46739 17.3244 2.89131 17.5 3.33334 17.5H16.6667C17.1087 17.5 17.5326 17.3244 17.8452 17.0119C18.1577 16.6993 18.3333 16.2754 18.3333 15.8334V6.66669C18.3333 6.22466 18.1577 5.80074 17.8452 5.48818C17.5326 5.17561 17.1087 5.00002 16.6667 5.00002ZM8.33334 3.33335H11.6667V5.00002H8.33334V3.33335ZM10 7.50002C10.5525 7.50002 11.0824 7.71951 11.4731 8.11021C11.8638 8.50092 12.0833 9.03082 12.0833 9.58335C12.0833 10.1359 11.8638 10.6658 11.4731 11.0565C11.0824 11.4472 10.5525 11.6667 10 11.6667C9.44747 11.6667 8.91757 11.4472 8.52687 11.0565C8.13617 10.6658 7.91667 10.1359 7.91667 9.58335C7.91667 9.03082 8.13617 8.50092 8.52687 8.11021C8.91757 7.71951 9.44747 7.50002 10 7.50002ZM14.1667 15.8334H5.83334V14.7917C5.83334 13.6417 7.70001 12.7084 10 12.7084C12.3 12.7084 14.1667 13.6417 14.1667 14.7917V15.8334Z"
                fill="#1A1A1A"
              />
            </svg>
          </div>
          <div className={style.benefits__content}>
            <h6>Professional approach to clients</h6>
            <p>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint.
            </p>
          </div>
        </div>
        <div className={style.benefits__second}>
          <div className={style.benefits__circut}>
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.83329 1.66669L15.915 3.56669C16.0846 3.61964 16.2328 3.72542 16.3381 3.86859C16.4433 4.01177 16.5 4.18483 16.5 4.36252V5.83335H18.1666C18.3876 5.83335 18.5996 5.92115 18.7559 6.07743C18.9122 6.23371 19 6.44567 19 6.66669V8.33335H8.16663V6.66669C8.16663 6.44567 8.25442 6.23371 8.4107 6.07743C8.56698 5.92115 8.77895 5.83335 8.99996 5.83335H14.8333V4.97502L9.83329 3.41169L4.83329 4.97502V11.145C4.83317 11.6552 4.95017 12.1586 5.17526 12.6165C5.40036 13.0743 5.72755 13.4744 6.13163 13.7859L6.28913 13.8992L9.83329 16.3167L12.985 14.1667H8.99996C8.77895 14.1667 8.56698 14.0789 8.4107 13.9226C8.25442 13.7663 8.16663 13.5544 8.16663 13.3334V10H19V13.3334C19 13.5544 18.9122 13.7663 18.7559 13.9226C18.5996 14.0789 18.3876 14.1667 18.1666 14.1667L15.4833 14.1675C15.1608 14.5925 14.7691 14.9675 14.3166 15.2759L9.83329 18.3334L5.34996 15.2767C4.67706 14.8179 4.12642 14.2017 3.74591 13.4816C3.3654 12.7616 3.16654 11.9594 3.16663 11.145V4.36252C3.16673 4.18497 3.22353 4.0121 3.32876 3.86909C3.43399 3.72609 3.58214 3.62043 3.75163 3.56752L9.83329 1.66669Z"
                fill="#1A1A1A"
              />
            </svg>
          </div>
          <div className={style.benefits__content}>
            <h6>Protect all payments</h6>
            <p>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint.
            </p>
          </div>
        </div>
        <div className={style.benefits__third}>
          <div className={style.benefits__circut}>
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.3333 12.5L11.625 9.62502L14.5 8.33335L11.625 7.04169L10.3333 4.16669L9.04167 7.04169L6.16667 8.33335L9.04167 9.62502L10.3333 12.5ZM2 18.3334V3.33335C2 2.87502 2.16333 2.48252 2.49 2.15585C2.81611 1.82974 3.20833 1.66669 3.66667 1.66669H17C17.4583 1.66669 17.8508 1.82974 18.1775 2.15585C18.5036 2.48252 18.6667 2.87502 18.6667 3.33335V13.3334C18.6667 13.7917 18.5036 14.1842 18.1775 14.5109C17.8508 14.837 17.4583 15 17 15H5.33333L2 18.3334Z"
                fill="#1A1A1A"
              />
            </svg>
          </div>
          <div className={style.benefits__content}>
            <h6>Real reviews from clients</h6>
            <p>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
