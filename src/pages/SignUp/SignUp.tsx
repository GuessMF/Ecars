import React from "react";
import style from "./__signUp.module.scss";
import {ReactComponent as GoogleIcon} from "../../assets/icons/google_icon.svg";
import {NavLink} from "react-router-dom";

export default function SignUp() {
  return (
    <div className={style.signUp}>
      <div className={style.wrapper}>
        <h1>Sing Up</h1>
        <div className={style.form}>
          <div className={style.name}>
            <span>Full name</span>
            <input type="name" placeholder="John Doe" />
          </div>

          <div className={style.email}>
            <span>Email address</span>
            <input type="email" placeholder="example@mail.com" />
          </div>

          <div className={style.password}>
            <div>
              <span>Password</span>
            </div>
            <input type="password" placeholder="Your password" />
            <span className={style.limit}>At least 8 characters</span>
          </div>

          <div className={style.password}>
            <div>
              <span>Confirm password</span>
            </div>
            <input type="password" placeholder="Re-type password" />
          </div>

          <div className={style.termsPolicy}>
            <input type="checkbox" name="" id="" />
            <div>
              I agree to the <span>Terms of Service</span> and{" "}
              <span>Privacy Policy</span>
            </div>
          </div>

          <button className={style.signUpBtn}>Sign Up</button>

          <div className={style.login}>
            Already have an account?
            <NavLink to="/login" className={style.navLink}>
              <span>Login</span>
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
