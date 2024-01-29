import {useState, useEffect} from "react";
import style from "./__middleCTA.module.scss";
import GetAquote from "../../ui/GetAquote/GetAquote";
import {NavLink} from "react-router-dom";
import {getAuth} from "firebase/auth";
import {onAuthStateChanged} from "firebase/auth";

const version: string = "big";

export default function MiddleCTA() {
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      user && setUserId(user?.uid);
    });
  }, []);

  return (
    <div className={style.middleCTA}>
      <div className={style.middleCTA__content}>
        <div className={style.middleCTA__text}>
          <span className={style.middleCTA__title}>
            Send an inquiry now and get the best offers suitable for your
            requirements
          </span>
          <span className={style.middleCTA__subtitle}>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </span>
        </div>

        {userId ? (
          <NavLink to={`/sell/${userId}`}>
            <GetAquote version={version} />
          </NavLink>
        ) : (
          <NavLink to={`/login`}>
            <GetAquote version={version} />
          </NavLink>
        )}
      </div>
    </div>
  );
}
