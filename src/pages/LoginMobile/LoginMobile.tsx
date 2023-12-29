import React, {useRef, useEffect, useState} from "react";
// import style from "./__login.module.scss";
import style from "./__loginMobile.module.scss";
import {ReactComponent as GoogleIcon} from "../../assets/icons/google_icon.svg";
import {NavLink} from "react-router-dom";
import {Rings} from "react-loader-spinner";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

//import { useHistory } from 'react-router-dom';

import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {setUser} from "store/slices/userSlice";
import {useAppDispatch} from "hooks/redux-hooks";
import {onAuthStateChanged} from "firebase/auth";
import {useAuth} from "hooks/use-auth";
import firebase from "firebase/app";
import {useAppSelector} from "hooks/redux-hooks";
import ErrorLoginMobile from "./ErrorLoginMobile";

export default function LoginMobile() {
  const dispatch = useAppDispatch();
  //const {push} = useHistory();
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState("");
  const {isAuth, displayName} = useAuth();

  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  const user = useAppSelector((state) => state.user);
  // useEffect(() => {
  //   if (user.id) {
  //     navigate(`/user-page/${user.id}`);
  //   }
  // }, [user]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          setUserId(user.uid);
          //  console.log(user.uid);
        } else {
          // Пользователь не подтвердил email
          // Здесь можно предпринять действия, например, отображение сообщения об ошибке или предложение повторно отправить письмо с подтверждением
          console.log(user.phoneNumber);
          if (user.phoneNumber) {
            setUserId(user.uid);
            navigate(`/user-page/${user.uid}`);
          }
          //  console.log("Email не подтвержден");
          //  console.log(userId);
        }
      }
    });
  }, []);

  const [phoneNumber, setPhoneNumber] = useState<string>("+7");
  const [verificationCode, setVerificationCode] = useState("");
  const [codeSended, setCodeSended] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);
  const [verificationId, setVerificationId] = useState("");
  const [error, setError] = useState("");
  const [invalidNumber, setInvalidNumber] = useState<boolean>(false);

  const navigate = useNavigate();
  const auth = getAuth();

  // useEffect(() => {
  //   console.log("ntghfdd");
  // }, [invalidNumber]);

  const handleSendCode = async () => {
    console.log("clicked");
    console.log(phoneNumber.length);
    if (phoneNumber.length !== 12) {
      setInvalidNumber(true);
      setError("Invalid number");
    } else {
      setClicked(true);

      const appVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        languageCode: "it",
      });

      try {
        const result = await signInWithPhoneNumber(
          auth,
          phoneNumber,
          appVerifier
        );
        setConfirmationResult(result); // Обновляем состояние после отправки кода
        setCodeSended(true);
      } catch (error) {
        console.error("Ошибка отправки кода:", error);
      }
    }
  };

  const handleVerifyCode = async () => {
    try {
      if (!confirmationResult) {
        console.error("Необходимо сначала отправить код подтверждения");
        return;
      }

      await confirmationResult.confirm(verificationCode);
      //  console.log("Пользователь успешно аутентифицирован");
      const userCredential = await confirmationResult?.confirm(
        verificationCode
      );
      // console.log(userCredential);
      // console.log(userCredential.user);
      // console.log(userCredential.user.uid);
      // navigate(`/user-page/${user.id}`);

      if (userCredential?.user) {
        const {phoneNumber} = userCredential.user;
        const {uid} = userCredential.user;
        // phoneNumber - номер телефона
        // displayName - имя пользователя (если задано)

        //  console.log("Номер телефона:", phoneNumber);
        // console.log("Имя пользователя:", displayName);
      }
    } catch (error) {
      console.error("Ошибка верификации кода подтверждения:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Вход успешен, получите данные пользователя из result.user
      const {displayName, email, photoURL, uid} = result.user || {};
      // console.log("Успешный вход:", displayName, email, photoURL);

      navigate(`/user-page/${uid}`);
    } catch (error) {
      console.error("Ошибка входа через Google:", error);
    }
  };

  const onChangeMobile = (event: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(phoneNumber);
    const value = event.target.value;
    // const formattedValue = formatPhoneNumber(event.target.value);
    setPhoneNumber(event.target.value);
  };

  // const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const inputValue = event.target.value;

  //   // Проверка на изменение только цифр (удаляем все нецифровые символы)
  //   const digitsOnly = inputValue.replace(/\D/g, "");

  //   // Проверяем, что введенные цифры соответствуют ожидаемому формату номера
  //   const phoneNumberRegex = /^7[0-9]{10}$/;
  //   if (digitsOnly.match(phoneNumberRegex)) {
  //     const formattedNumber = formatPhoneNumber(digitsOnly);
  //     setPhoneNumber(formattedNumber);
  //   }
  // };

  useEffect(() => {
    // console.log(phoneNumber);
    // console.log(phoneNumber.length);
    if (phoneNumber.length < 2) {
      setPhoneNumber("+7");
    }
  }, [phoneNumber]);
  const closeError = () => {
    setError("");
    setPhoneNumber("+7");
  };

  return (
    <div className={style.login}>
      {error && <ErrorLoginMobile error={error} closePopUp={closeError} />}
      <div className={style.wrapper}>
        <h1>Login mobile</h1>
        <div className={style.form}>
          {!codeSended && (
            <div className={style.email}>
              <span>Mobile</span>

              <input
                type="tel"
                // placeholder="Phone number"
                placeholder="+ddd"
                maxLength={18}
                value={phoneNumber}
                onChange={onChangeMobile}
                // onChange={handlePhoneChange}
              />
              <button onClick={handleSendCode} className={style.loginBtn}>
                {/* Send Code */}
                {clicked ? (
                  <Rings
                    height="24"
                    width="500"
                    color="#4fa94d"
                    // radius="6"
                    // wrapperStyle={{}}
                    wrapperClass={style.loader}
                    visible={true}
                    // ariaLabel="rings-loading"
                  />
                ) : (
                  "Send Code"
                )}
              </button>
            </div>
          )}

          {/* {codeSended && ( */}
          {codeSended && (
            <div className={style.password}>
              <div>
                <span>Code was sent to {phoneNumber}</span>
              </div>

              <input
                type="text"
                placeholder="Your SMS code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <button onClick={handleVerifyCode} className={style.loginBtn}>
                Confirm
              </button>
            </div>
          )}

          {/* )}*/}

          <span className={style.line}>
            <hr /> or <hr />
          </span>
          <button className={style.googleBtn} onClick={handleGoogleSignIn}>
            <GoogleIcon /> Authorize with Google
          </button>
        </div>
      </div>

      {/* Это ваш контейнер для reCAPTCHA */}
      <div id="recaptcha-container"></div>
    </div>

    // </div>
  );
}
