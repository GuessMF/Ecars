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
              <li>New cars</li>
              <li>Used cars</li>
              <li>Brands</li>
            </ul>
          </div>
          <div className={style.footer__fourth}>
            <ul>
              <li className={style.footer__title}>Contacts</li>
              <li>
                <Mobile color={black} />
              </li>
              <li>
                <Email color={black} />
              </li>
            </ul>
          </div>
        </div>
        <div className={style.footer__bottom}>
          <div className={style.footer__left}>
            <span>eCars © 2022. All rights reserved.</span>
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
