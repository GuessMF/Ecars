import React, {ReactEventHandler, useState} from "react";
import style from "./__forgotPassword.module.scss";
import {NavLink} from "react-router-dom";
import {ReactComponent as LeftArrow} from "../../assets/icons/arrow-left-line.svg";
import {getAuth, sendPasswordResetEmail} from "firebase/auth";
import {Rings} from "react-loader-spinner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string>("");

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

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setError("");
  };

  return (
    <div className={style.forgotPassword}>
      {emailSent ? (
        <div className={style.sentedEmail}>
          <h4>Email successfully sent</h4>
          <p>
            Please check your email and follow the link to regain access to your
            account
          </p>
          <NavLink to="/login">Or use another way to log in</NavLink>
        </div>
      ) : (
        <div className={style.wrapper}>
          <h1>Forgot password</h1>
          <span>No worries, we'll send you reset instruction</span>

          <div className={style.form}>
            <div className={style.email}>
              <div className={style.topBox}>
                <span>Email address </span>{" "}
                {error && (
                  <div className={style.errorEmail}>Enter correct Email</div>
                )}
              </div>

              <input
                type="email"
                placeholder="example@mail.com"
                onChange={onChangeInput}
              />
            </div>

            <button className={style.resetBtn} onClick={handleResetPassword}>
              Reset Password
              {/* <Rings
              height="10"
              width="30"
              color="#4fa94d"
              // radius="6"
              // wrapperStyle={{}}
              wrapperClass={style.loader}
              visible={true}
              // ariaLabel="rings-loading"
            /> */}
            </button>

            <NavLink to="/login" className={style.navLink}>
              <div className={style.backToLogin}>
                <LeftArrow />
                Back to login
              </div>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
