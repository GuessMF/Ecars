import React, {useRef, useEffect, useState} from "react";
import style from "./__signUp.module.scss";
import {ReactComponent as GoogleIcon} from "../../assets/icons/google_icon.svg";
import {NavLink, useNavigate} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import {Navigate} from "react-router-dom";

import {useDispatch} from "react-redux";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {setUser} from "store/slices/userSlice";
import {useAppDispatch} from "../../hooks/redux-hooks";

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  checkBox?: string;
}

export default function SignUp() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [checkBox, setCheckBox] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<Errors>({});

  const errors: Errors = {};

  // useEffect(() => {
  //   console.log("Name: " + name);
  //   console.log("Email: " + email);
  //   console.log("Password: " + password);
  //   console.log("ConfirmPassword: " + confirmPassword);
  //   console.log("Checkbox: " + checkBox);
  // });

  const generateNewId = (): string => {
    return uuidv4();
  };
  // const submit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!name) {
  //     errors.name = "Поле Имя обязательно для заполнения";
  //   }

  //   if (!email) {
  //     errors.email = "Поле Емэйл обязательно для заполнения";
  //   }
  //   if (!password) {
  //     errors.password = "Поле Пароль обязательно для заполнения";
  //   }
  //   if (password !== confirmPassword) {
  //     errors.confirmPassword = "Пароли не совпадают";
  //   }
  //   if (!checkBox) {
  //     errors.checkBox = "Нет чекбокса";
  //   }
  //   console.log(errors);
  //   if (Object.keys(errors).length > 0) {
  //     setFormErrors(errors);
  //     alert("Заполните поля");
  //   } else {
  //     const newId = generateNewId();
  //     const currentDate: Date = new Date();

  //     const user = {
  //       id: newId,
  //       dateAdded: currentDate,
  //       name: name,
  //       email: email,
  //       password: password,
  //     };

  //     const requestOptions = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(user),
  //     };

  //     fetch("https://65378b85bb226bb85dd365a6.mockapi.io/users", requestOptions)
  //       .then((res) => {
  //         if (res.ok) {
  //           return res.json();
  //         }
  //         throw new Error("Network response was not ok.");
  //       })
  //       .then((json) => {
  //         console.log("Объект успешно отправлен на сервер:", json);
  //         // setSent(true);
  //         // setLoading(false);
  //         // setTimeout(() => {
  //         //   setSent(false);
  //         // }, 2000);
  //       })
  //       .catch((error) => {
  //         console.error("Ошибка при отправке объекта на сервер:", error);
  //       });

  //     setName("");
  //     setEmail("");
  //     setPassword("");
  //     setConfirmPassword("");
  //     setCheckBox(false);

  //     console.log("SUBMITTED");
  //   }
  // };
  //<div className={formErrors.name ? `${style.name} error` : style.name}>
  //
  //
  //
  //
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const handleRegister = (email: string, password: string, name: string) => {
  //   const auth = getAuth();
  //   console.log("clicked");

  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then(({user}) => {
  //       console.log(user);

  //       dispatch(
  //         setUser({
  //           displayName: name,
  //           email: user.email,
  //           id: user.uid,
  //           token: user.refreshToken,
  //         })
  //       );
  //       // push('/')
  //       navigate("/");

  //       console.log("отправилось");
  //     })
  //     .catch(console.error);
  // };

  const handleRegister = (email: string, password: string, name: string) => {
    const auth = getAuth();
    console.log("clicked");

    createUserWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
        console.log(user);

        // Обновление профиля пользователя с добавлением имени
        updateProfile(user, {
          displayName: name,
        })
          .then(() => {
            console.log("Profile updated successfully");
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
          });

        dispatch(
          setUser({
            displayName: name,
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );

        // push('/')
        navigate("/");

        console.log("отправилось");
      })
      .catch(console.error);
  };

  //
  //
  //
  //

  return (
    <div className={style.signUp}>
      <div className={style.wrapper}>
        <h1>Sing Up</h1>

        <form
          className={style.form}
          onSubmit={() => handleRegister(email, password, name)}
        >
          <div className={style.name}>
            <span>Full name</span>
            <input
              type="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${formErrors.name ? style.error : ""}`}
            />
          </div>

          <div className={style.email}>
            <span>Email address</span>
            <input
              type="email"
              value={email}
              placeholder="example@mail.com"
              onChange={(e) => setEmail(e.target.value)}
              className={`${formErrors.email ? style.error : ""}`}
            />
          </div>

          <div className={style.password}>
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

          <div className={style.password}>
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
            className={formErrors.checkBox ? style.error : style.termsPolicy}
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
          <button className={style.googleBtn}>
            <GoogleIcon /> Authorize with Google
          </button>
        </form>
      </div>
    </div>
  );
}
