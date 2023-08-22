import React, {useRef, useEffect} from "react";
import style from "./__login.module.scss";
import {ReactComponent as GoogleIcon} from "../../assets/icons/google_icon.svg";

import {NavLink} from "react-router-dom";

export default function Login() {
  //   const headerRef = useRef<HTMLElement | null>(null);
  //   useEffect(() => {
  //     if (headerRef.current) {
  //       const headerHeight = headerRef.current.clientHeight;
  //     }
  //   }, []);

  return (
    <div className={style.login}>
      <div className={style.wrapper}>
        <h1>Login</h1>
        <div className={style.form}>
          <div className={style.email}>
            <span>Email address</span>
            <input type="email" placeholder="example@mail.com" />
          </div>
          <div className={style.password}>
            <div>
              <span>Password</span>
              <NavLink to="/forgotPassword" className={style.navLink}>
                <span>Forgot password?</span>
              </NavLink>
            </div>

            <input type="password" placeholder="Your password" />
          </div>
          <button className={style.loginBtn}>Login</button>
          <div className={style.signUp}>
            Don't have an account?
            <NavLink to="/signUp" className={style.navLink}>
              <span>Sign Up</span>
            </NavLink>
          </div>
          <span className={style.line}>
            <hr /> or <hr />
          </span>
          <button className={style.googleBtn}>
            <GoogleIcon /> Authorize with Google
          </button>
        </div>
      </div>
    </div>
  );
}
