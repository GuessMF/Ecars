import React from "react";
import style from "./__forgotPassword.module.scss";
import {NavLink} from "react-router-dom";
import {ReactComponent as LeftArrow} from "../../assets/icons/arrow-left-line.svg";

export default function ForgotPassword() {
  return (
    <div className={style.forgotPassword}>
      <div className={style.wrapper}>
        <h1>Forgot password</h1>
        <span>No worries, we'll send you reset instruction</span>

        <div className={style.form}>
          <div className={style.email}>
            <span>Email address</span>
            <input type="email" placeholder="example@mail.com" />
          </div>

          <button className={style.resetBtn}>Reset Password</button>

          <NavLink to="/login" className={style.navLink}>
            <div className={style.backToLogin}>
              <LeftArrow />
              Back to login
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
