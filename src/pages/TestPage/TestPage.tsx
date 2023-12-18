import React, {useRef, useEffect, useState} from "react";
// import style from "./__login.module.scss";
import style from "../Login/__login.module.scss";
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

export default function Login() {
  const [error, setError] = useState("");
  // const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Вход успешен, получите данные пользователя из result.user
      const {displayName, email, photoURL} = result.user || {};
      console.log("Успешный вход:", displayName, email, photoURL);
    } catch (error) {
      console.error("Ошибка входа через Google:", error);
    }
  };

  return (
    <div className={style.login}>
      <div className={style.wrapper}>
        <h1>Google test</h1>
        <div className={style.form}>
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
