import React, {useEffect, useState} from "react";
import style from "./__loginMobile.module.scss";
import {ReactComponent as GoogleIcon} from "../../assets/icons/google_icon.svg";
import {Rings} from "react-loader-spinner";
import {useNavigate} from "react-router-dom";

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {onAuthStateChanged} from "firebase/auth";
import ErrorLoginMobile from "./ErrorLoginMobile";

export default function LoginMobile() {
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
        } else {
          if (user.phoneNumber) {
            navigate(`/user-page/${user.uid}`);
          }
        }
      }
    });
  }, [navigate]);

  const [phoneNumber, setPhoneNumber] = useState<string>("+7");
  const [verificationCode, setVerificationCode] = useState("");
  const [codeSended, setCodeSended] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);
  const [error, setError] = useState("");

  const auth = getAuth();

  const handleSendCode = async () => {
    console.log("clicked");
    console.log(phoneNumber.length);
    if (phoneNumber.length !== 12) {
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
        setConfirmationResult(result);
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
      const userCredential = await confirmationResult?.confirm(
        verificationCode
      );

      if (userCredential?.user) {
      }
    } catch (error) {
      console.error("Ошибка верификации кода подтверждения:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const {uid} = result.user || {};
      navigate(`/user-page/${uid}`);
    } catch (error) {
      console.error("Ошибка входа через Google:", error);
    }
  };

  const onChangeMobile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  useEffect(() => {
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
                placeholder="+ddd"
                maxLength={18}
                value={phoneNumber}
                onChange={onChangeMobile}
              />
              <button onClick={handleSendCode} className={style.loginBtn}>
                {clicked ? (
                  <Rings
                    height="24"
                    width="500"
                    color="#4fa94d"
                    visible={true}
                  />
                ) : (
                  "Send Code"
                )}
              </button>
            </div>
          )}

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

          <span className={style.line}>
            <hr /> or <hr />
          </span>
          <button className={style.googleBtn} onClick={handleGoogleSignIn}>
            <GoogleIcon /> Authorize with Google
          </button>
        </div>
      </div>

      <div id="recaptcha-container"></div>
    </div>
  );
}
