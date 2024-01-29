import React, {useRef, useEffect, useState, useMemo, useCallback} from "react";
import style from "./__signUp.module.scss";
import {ReactComponent as GoogleIcon} from "../../assets/icons/google_icon.svg";
import {NavLink, useNavigate} from "react-router-dom";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  mismatch?: string;
  checkBox?: string;
}

interface Refs {
  [key: string]: React.RefObject<HTMLDivElement>;
}

export default function SignUp() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [checkBox, setCheckBox] = useState<boolean>(false);
  const [firstClick, setFirstClick] = useState<boolean>(false);

  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<Errors>({});
  const auth = getAuth();
  // const errors: Errors = {};
  const errors: Errors = useMemo(
    () => {
      return {};
    },
    [
      /* зависимости, при изменении которых нужно пересоздавать объект errors */
    ]
  );

  const nameRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const passwordRef = useRef<HTMLDivElement>(null);
  const confirmPasswordRef = useRef<HTMLDivElement>(null);
  const checkBoxRef = useRef<HTMLDivElement>(null);

  const refs: Refs = {
    name: nameRef,
    email: emailRef,
    password: passwordRef,
    confirmPassword: confirmPasswordRef,
    checkBox: checkBoxRef,
  };

  const navigate = useNavigate();

  const checkErrors = useCallback(() => {
    if (!name) {
      errors.name = "Поле имя обязательно для заполнения";
    }
    if (!email) {
      errors.email = " Введите Email";
    }
    if (!password) {
      errors.password = "Введите пароль";
    }
    if (password.length < 8) {
      errors.password = "Пароль должен содержать не менее 8 символов";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Введите пароль повторно";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Введенные пароли не совпадают";
    }
    if (!checkBox) {
      errors.checkBox = "Необходимо согласиться";
    }
  }, [name, email, password, confirmPassword, checkBox, errors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFirstClick(true);
    console.log("Submit Clicked");

    checkErrors();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      console.log(errors);
      handleAgreeClick();
    } else {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
          return updateProfile(user, {
            displayName: name,
          });
        })
        .then(() => {
          const user = auth.currentUser;
          if (user) {
            return sendEmailVerification(user)
              .then(() => {
                setEmailSent(true);
                console.log("Письмо для подтверждения отправлено.");
              })
              .catch((error) => {
                console.error(
                  "Ошибка отправки письма для подтверждения:",
                  error
                );
              });
          }
        })
        .catch((error) => {
          console.error("Ошибка при регистрации:", error);
        });
    }
  };

  useEffect(() => {
    if (firstClick) {
      checkErrors();
      setFormErrors(errors);
    }
  }, [
    name,
    email,
    password,
    confirmPassword,
    checkBox,
    checkErrors,
    errors,
    firstClick,
  ]);

  const hasErrors = Object.keys(formErrors);
  const handleAgreeClick = () => {
    const scrollTopOffset = 100;
    const fieldName = hasErrors[0];
    const fieldRef = refs[fieldName];

    if (fieldRef && fieldRef.current !== null) {
      const topOffset =
        fieldRef.current.getBoundingClientRect().top +
        window.scrollY -
        scrollTopOffset;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    } else {
      console.log("popuperrors  true");
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

  const removeCharacters = (email: string) => {
    const atIndex = email.indexOf("@");

    if (atIndex !== -1) {
      const domain = email.split("@")[1];
      return domain;
    }

    return email;
  };

  const formatedMail = removeCharacters(email);

  return (
    <div className={style.signUp}>
      {emailSent ? (
        <div className={style.needConfirmEmail}>
          <h3>Successful registration</h3>
          <p>Mail was sent to {email}</p>
          <p>
            To complete your registration please visit your email and follow the
            link in the{" "}
            <span
              onClick={() => window.open(`https:${formatedMail}`, "_blank")}
            >
              email
            </span>
          </p>
        </div>
      ) : (
        <div className={style.wrapper}>
          <h1>Sing Up</h1>

          <form className={style.form} onSubmit={handleSubmit}>
            <div className={style.name} ref={nameRef}>
              <span>Full name</span>
              <input
                type="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${formErrors.name ? style.error : ""}`}
              />
            </div>

            <div className={style.email} ref={emailRef}>
              <span>Email address</span>
              <input
                type="email"
                value={email}
                placeholder="example@mail.com"
                onChange={(e) => setEmail(e.target.value)}
                className={`${formErrors.email ? style.error : ""}`}
              />
            </div>

            <div className={style.password} ref={passwordRef}>
              <div>
                <span>Password</span>
              </div>
              <input
                type="password"
                value={password}
                placeholder="Your password"
                onChange={(e) => setPassword(e.target.value)}
                className={`${formErrors.password ? style.error : ""}`}
              />
              <span className={style.limit}>At least 8 characters</span>
            </div>

            <div className={style.password} ref={confirmPasswordRef}>
              <div>
                <span>Confirm password</span>
              </div>
              <input
                type="password"
                value={confirmPassword}
                placeholder="Re-type password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`${formErrors.confirmPassword ? style.error : ""}`}
              />
            </div>

            <div
              className={
                formErrors.checkBox ? style.errorCheckBox : style.termsPolicy
              }
              ref={checkBoxRef}
            >
              <input
                type="checkbox"
                name=""
                id=""
                checked={checkBox}
                onChange={() => setCheckBox(!checkBox)}
              />
              <div>
                I agree to the <span>Terms of Service</span> and{" "}
                <span>Privacy Policy</span>
              </div>
            </div>

            <button type="submit" className={style.signUpBtn}>
              Sign Up
            </button>

            <div className={style.login}>
              Already have an account?
              <NavLink to="/login" className={style.navLink}>
                <span>Login</span>
              </NavLink>
            </div>

            <span className={style.line}>
              <hr /> or <hr />
            </span>
            <button className={style.googleBtn} onClick={handleGoogleSignIn}>
              <GoogleIcon /> Authorize with Google
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
