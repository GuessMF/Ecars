import React, {useRef, useEffect, useState} from "react";
import style from "./__signUp.module.scss";
import {ReactComponent as GoogleIcon} from "../../assets/icons/google_icon.svg";
import {NavLink, useNavigate} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import {Navigate} from "react-router-dom";
import {useAuth} from "hooks/use-auth";
import {useDispatch} from "react-redux";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import {setUser} from "store/slices/userSlice";
import {useAppDispatch} from "../../hooks/redux-hooks";
import {error} from "console";

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
  const [formErrors, setFormErrors] = useState<Errors>({});
  const auth = getAuth();
  const errors: Errors = {};

  const nameRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const passwordRef = useRef<HTMLDivElement>(null);
  const confirmPasswordRef = useRef<HTMLDivElement>(null);
  const checkBoxRef = useRef<HTMLDivElement>(null);
  // const engineCapacityRef = useRef<HTMLDivElement>(null);

  const refs: Refs = {
    name: nameRef,
    email: emailRef,
    password: passwordRef,
    confirmPassword: confirmPasswordRef,
    checkBox: checkBoxRef,
  };

  // const [userId, setUserId] = useState<string>("");
  // const {isAuth, displayName} = useAuth();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit Clicked");

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
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      //  setPopUpErrors(true);
      console.log(errors);
      handleAgreeClick();
    } else {
      // const auth = getAuth();
      // createUserWithEmailAndPassword(auth, email, password)
      //   .then(({user}) => {
      //     updateProfile(user, {
      //       displayName: name,
      //     })
      //       .then(() => {
      //         console.log("Profile updated successfully");
      //       })
      //       .catch((error) => {
      //         console.error("Error updating profile:", error);
      //       });
      //     dispatch(
      //       setUser({
      //         displayName: name,
      //         email: user.email,
      //         id: user.uid,
      //         token: user.refreshToken,
      //       })
      //     );
      //     navigate(`/user-page/${user.uid}`);
      //     console.log("отправилось");
      //   })
      //   .catch(console.error);
      // console.log(password.length);

      // console.log("registration");

      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
          // Обновление профиля пользователя
          return updateProfile(user, {
            displayName: name,
          });
        })
        .then(() => {
          const user = auth.currentUser;
          if (user) {
            // Отправка письма для подтверждения адреса электронной почты
            return sendEmailVerification(user)
              .then(() => {
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

  const hasErrors = Object.keys(formErrors);
  const handleAgreeClick = () => {
    const scrollTopOffset = 100;
    // setPopUpErrors(false);
    console.log("popuperrors  false");
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
      //  setPopUpErrors(true);
      console.log("popuperrors  true");
    }
  };

  //
  //
  //
  //
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
    <div className={style.signUp}>
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
    </div>
  );
}
