import React, {useRef, useEffect, useState} from "react";
// import style from "./__login.module.scss";
import style from "./__loginMobile.module.scss";
import {ReactComponent as GoogleIcon} from "../../assets/icons/google_icon.svg";
import {NavLink} from "react-router-dom";
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
  useEffect(() => {
    if (user.id) {
      navigate(`/user-page/${user.id}`);
    }
  }, [user]);
  console.log(user.id);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [codeSended, setCodeSended] = useState<boolean>(false);
  const [verificationId, setVerificationId] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();

  const handleSendCode = async () => {
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
  };

  const handleVerifyCode = async () => {
    try {
      if (!confirmationResult) {
        console.error("Необходимо сначала отправить код подтверждения");
        return;
      }

      await confirmationResult.confirm(verificationCode);
      console.log("Пользователь успешно аутентифицирован");
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

        console.log("Номер телефона:", phoneNumber);
        console.log("Имя пользователя:", displayName);
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
      console.log("Успешный вход:", displayName, email, photoURL);

      navigate(`/user-page/${uid}`);
    } catch (error) {
      console.error("Ошибка входа через Google:", error);
    }
  };

  return (
    <div className={style.login}>
      <div className={style.wrapper}>
        <h1>Login mobile</h1>
        <div className={style.form}>
          <div className={style.email}>
            <span>Mobile</span>

            <input
              type="tel"
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button onClick={handleSendCode} className={style.loginBtn}>
              Send Code
            </button>
          </div>

          {/* {codeSended && ( */}
          <div className={style.password}>
            <div>
              <span>Code</span>
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
          {/* )}*/}

          <span className={style.line}>
            <hr /> or <hr />
          </span>
          <button className={style.googleBtn} onClick={handleGoogleSignIn}>
            <GoogleIcon /> Authorize with Google
          </button>
        </div>
        {error && <p>{error}</p>}
      </div>

      {/* Это ваш контейнер для reCAPTCHA */}
      <div id="recaptcha-container"></div>
    </div>

    // </div>
  );
}
