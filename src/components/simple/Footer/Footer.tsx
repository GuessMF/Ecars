import React from "react";
import style from "./__footer.module.scss";
import {ReactComponent as Logo} from "../../../assets/icons/footer/Logo.svg";
import {ReactComponent as FaceBookIcon} from "../../../assets/icons/social/facebook.svg";
import {ReactComponent as TwitterIcon} from "../../../assets/icons/social/twitter.svg";
import {ReactComponent as YouTubeIcon} from "../../../assets/icons/social/youtube.svg";
import {ReactComponent as InstagramIcon} from "../../../assets/icons/social/instagram.svg";
import Mobile from "../../ui/Mobile/Mobile";
import Email from "../../ui/Email/Email";
import SocialIcons from "../../ui/SocialIcons/SocialIcons";
import {NavLink} from "react-router-dom";

const white: string = "#FFFFFFB2";
const black: string = "#1A1A1A";
const color: string = "#767676";
const opacity: string = "0.7";

export default function Footer() {
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
              <li>About us</li>
              <li>Blog</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div className={style.footer__third}>
            <ul>
              <li className={style.footer__title}>Cars</li>
              <li>Special offers</li>
              <NavLink to="/catalog?owners=new">
                <li>New cars</li>
              </NavLink>
              <NavLink to="/catalog?owners=used">
                <li>Used cars</li>
              </NavLink>

              <li>Brands</li>
            </ul>
          </div>
          <div className={style.footer__fourth}>
            <ul>
              <li className={style.footer__title}>Contacts</li>
              <li>
                <a href="https://wa.me/+79214003269">
                  <Mobile color={black} />
                </a>
              </li>
              <li>
                <a href="mailto:segas95@yandex.ru">
                  <Email color={black} />
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
