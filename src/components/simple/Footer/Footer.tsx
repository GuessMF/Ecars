import React, {useEffect} from "react";
import style from "./__footer.module.scss";
import {ReactComponent as Logo} from "../../../assets/icons/footer/Logo.svg";
// import {ReactComponent as FaceBookIcon} from "../../../assets/icons/social/facebook.svg";
// import {ReactComponent as TwitterIcon} from "../../../assets/icons/social/twitter.svg";
// import {ReactComponent as YouTubeIcon} from "../../../assets/icons/social/youtube.svg";
// import {ReactComponent as InstagramIcon} from "../../../assets/icons/social/instagram.svg";
import {useNavigate, useLocation} from "react-router-dom";
import Mobile from "../../ui/Mobile/Mobile";
import Email from "../../ui/Email/Email";
import SocialIcons from "../../ui/SocialIcons/SocialIcons";
import {NavLink} from "react-router-dom";
import Select from "react-select";

const white: string = "#FFFFFFB2";
const black: string = "#1A1A1A";
const color: string = "#767676";
const opacity: string = "0.7";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;

  const options = [
    {value: "RUB", label: "RUB"},
    {value: "USD", label: "USD"},
    {value: "EUR", label: "EUR"},
  ];

  const scrollToAnchor = (anchorID: string) => {
    if (pathName == "/") {
      const anchorElement = document.getElementById(anchorID);
      if (anchorElement) {
        anchorElement.scrollIntoView({behavior: "smooth", block: "start"});
      }
    } else {
      navigate("/");
      const scrollAnchor = () => {
        const anchorElement = document.getElementById(anchorID);
        if (anchorElement) {
          anchorElement.scrollIntoView({behavior: "smooth", block: "start"});
        }
      };
      setTimeout(scrollAnchor, 100);
    }
  };

  const onClickUsedCars = () => {
    if (pathName === "/catalog") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  const onClickNewCars = () => {
    if (pathName === "/catalog") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={style.footer}>
      <div className={style.footer__content}>
        <div className={style.footer__top}>
          <div className={style.footer__first}>
            <Logo />
            <p>
              Nullam non nisi est sit amet. Arcu vitae elementum curabitur vitae
              nunc. Ut tellus elementum sagittis vitae et leo duis.
            </p>

            <div>
              {/* <FaceBookIcon /> */}
              {/* <TwitterIcon /> */}
              {/* <YouTubeIcon />
              <InstagramIcon /> */}
              <SocialIcons color={color} opacity={opacity} />
            </div>
          </div>
          <div className={style.footer__second}>
            <ul>
              <li className={style.footer__title}>Company</li>
              <li>
                <NavLink to="/aboutUs">About Us</NavLink>
              </li>
              <li>Blog</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div className={style.footer__third}>
            <ul>
              <li className={style.footer__title}>Cars</li>
              <li
                className={style.cursor__pointer}
                onClick={() => {
                  scrollToAnchor("specialOffers");
                }}
              >
                Special offers
              </li>
              <NavLink to="/catalog?mileage=New" onClick={onClickNewCars}>
                <li>New cars</li>
              </NavLink>
              <NavLink to="/catalog?mileage=Used" onClick={onClickUsedCars}>
                <li>Used cars</li>
              </NavLink>

              <li
                className={style.cursor__pointer}
                onClick={() => {
                  scrollToAnchor("brands");
                }}
              >
                Brands
              </li>
            </ul>
          </div>
          <div className={style.footer__fourth}>
            <ul>
              <li className={style.footer__title}>Contacts</li>
              <li>
                <a href="https://wa.me/+79214003269">
                  <Mobile color={black} number={"+79214003269"} />
                </a>
              </li>
              <li>
                <a href="mailto:segas95@yandex.ru">
                  <Email color={black} email={"segas95@yandex.ru"} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={style.footer__bottom}>
          <div className={style.footer__left}>
            <span>eCars © 2023. All rights reserved.</span>
          </div>
          <div className={style.footer__right}>
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
