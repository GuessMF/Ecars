import React from "react";
import style from "./__footer.module.scss";
import {ReactComponent as Logo} from "../../../assets/icons/footer/Logo.svg";
import {ReactComponent as FaceBookIcon} from "../../../assets/icons/social/facebook.svg";
import {ReactComponent as TwitterIcon} from "../../../assets/icons/social/twitter.svg";
import {ReactComponent as YouTubeIcon} from "../../../assets/icons/social/youtube.svg";
import {ReactComponent as InstagramIcon} from "../../../assets/icons/social/instagram.svg";

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
              <FaceBookIcon />
              <TwitterIcon />
              <YouTubeIcon />
              <InstagramIcon />
            </div>
          </div>
          <div className={style.footer__second}></div>
          <div className={style.footer__third}></div>
          <div className={style.footer__fourth}></div>
        </div>
        <div className={style.footer__bottom}></div>
      </div>
    </div>
  );
}
