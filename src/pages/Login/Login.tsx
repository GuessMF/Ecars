import React, {useRef, useEffect, useState} from "react";
import style from "./__login.module.scss";
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
} from "firebase/auth";
import {setUser} from "store/slices/userSlice";
import {useAppDispatch} from "hooks/redux-hooks";
import {onAuthStateChanged} from "firebase/auth";

export default function Login() {
  const dispatch = useAppDispatch();
  //const {push} = useHistory();
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState("");
  console.log(email);

  // useEffect(() => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     user && setUserId(user?.uid);
  //   });
  // }, []);

  console.log(password);
  const navigate = useNavigate();
  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password).then(
          ({user}) => {
            setUserId(user.uid);
            console.log(user.uid + " login");
            dispatch(
              setUser({
                displayName: user.displayName,
                email: user.email,
                id: user.uid,
                token: user.refreshToken,
              })
            );
          }
        );
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert("Auth failed");
      });
  };
  useEffect(() => {
    if (userId) {
      navigate(`/user-page/${userId}`);
    }
  }, [userId, navigate]);

  return (
    <div className={style.login}>
      <div className={style.wrapper}>
        <h1>Login</h1>
        <div className={style.form}>
          <div className={style.email}>
            <span>Email address</span>
            <input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={style.password}>
            <div>
              <span>Password</span>
              <NavLink to="/forgotPassword" className={style.navLink}>
                <span>Forgot password?</span>
              </NavLink>
            </div>

            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className={style.loginBtn}
            onClick={() => handleLogin(email, password)}
          >
            Login
          </button>
          <div className={style.signUp}>
            Don't have an account?
            <NavLink to="/signUp" className={style.navLink}>
              <span>Sign Up</span>
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
