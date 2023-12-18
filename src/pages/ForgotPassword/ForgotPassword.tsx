import React, {useState} from "react";
import style from "./__forgotPassword.module.scss";
import {NavLink} from "react-router-dom";
import {ReactComponent as LeftArrow} from "../../assets/icons/arrow-left-line.svg";
import {getAuth, sendPasswordResetEmail} from "firebase/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
    } catch (error) {
      setError("Ошибка при отправке письма с инструкциями по сбросу пароля");
      console.error("Ошибка сброса пароля:", error);
    }
  };

  return (
    <div className={style.forgotPassword}>
      <div className={style.wrapper}>
        <h1>Forgot password</h1>
        <span>No worries, we'll send you reset instruction</span>

        <div className={style.form}>
          <div className={style.email}>
            <span>Email address</span>
            <input
              type="email"
              placeholder="example@mail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className={style.resetBtn} onClick={handleResetPassword}>
            Reset Password
          </button>

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
