import React from "react";
import style from "./__bottomCTA.module.scss";

import {useState, useEffect} from "react";
import {ReactComponent as Mail} from "../../../assets/icons/bottomCTA/mail.svg";
import {ReactComponent as Question} from "../../../assets/icons/bottomCTA/question.svg";
import GetAquote from "../../ui/GetAquote/GetAquote";
import ContactUs from "../../ui/ContactUs/ContactUs";
import {NavLink} from "react-router-dom";

import {useAuth} from "hooks/use-auth";
import {getAuth} from "firebase/auth";
import {onAuthStateChanged} from "firebase/auth";

const version: string = "big";
export default function BottomCTA() {
  const [userId, setUserId] = useState<string>("");
  // const {isAuth, email, displayName} = useAuth();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      user && setUserId(user?.uid);
    });
  }, []);

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

          <div>
            {userId ? (
              <NavLink to={`/user-page/${userId}`}>
                <GetAquote version={version} />
              </NavLink>
            ) : (
              <NavLink to={`/login`}>
                <GetAquote version={version} />
              </NavLink>
            )}
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

          <div>
            <a href="https://t.me/+79214003269">
              <ContactUs />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
