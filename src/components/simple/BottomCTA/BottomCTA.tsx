import React from "react";
import style from "./__bottomCTA.module.scss";
import {ReactComponent as Mail} from "../../../assets/icons/bottomCTA/mail.svg";
import {ReactComponent as Question} from "../../../assets/icons/bottomCTA/question.svg";
import GetAquote from "../../ui/GetAquote/GetAquote";
import ContactUs from "../../ui/ContactUs/ContactUs";
import {NavLink} from "react-router-dom";

const version: string = "big";
export default function BottomCTA() {
  return (
    <div className={style.bottomCTA}>
      <div className={style.bottomCTA__content}>
        <div className={style.bottomCTA__left}>
          <div className={style.bottomCTA__header}>
            <Mail />
            <h5>
              Send an inquiry and our managers will offer you the best deals.
            </h5>
          </div>
          <p>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit.
          </p>

          <div
          //    className={style.bottomCTA__footer}
          >
            <NavLink to="/per">
              <GetAquote version={version} />
            </NavLink>
          </div>
        </div>
        <div className={style.vl}></div>
        <div className={style.bottomCTA__right}>
          <div className={style.bottomCTA__header}>
            <Question />
            <h5>Do you still have questions? Contact us for answers.</h5>
          </div>
          <p>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit.
          </p>

          <div
          //    className={style.bottomCTA__footer}
          >
            <a href="https://t.me/+79214003269">
              <ContactUs />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
