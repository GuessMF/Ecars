import {useEffect, useState} from "react";
import style from "./__login.module.scss";
import {ReactComponent as GoogleIcon} from "../../assets/icons/google_icon.svg";
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";

import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {setUser} from "store/slices/userSlice";
import {useAppDispatch} from "hooks/redux-hooks";
import {onAuthStateChanged} from "firebase/auth";
import {useAuth} from "hooks/use-auth";
import ErrorLogin from "./ErrorLogin";

export default function Login() {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState("");
  const {isAuth} = useAuth();
  const [noSubmitedUser, setNoSubmitedUser] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const auth = getAuth();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);

      const {displayName, email, photoURL, uid} = result.user || {};
      console.log("Успешный вход:", displayName, email, photoURL);

      navigate(`/user-page/${uid}`);
    } catch (error) {
      console.error("Ошибка входа через Google:", error);
    }
  };

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
        setError(errorCode);
      });
  };
  useEffect(() => {
    if (userId && isAuth) {
      navigate(`/user-page/${userId}`);
    }
  }, [userId, isAuth, navigate]);

  useEffect(() => {
    const auth = getAuth();
    if (isAuth) {
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.email && setEmail(user.email);
        setNoSubmitedUser(true);
        if (user.emailVerified) {
          setUserId(user.uid);
        } else {
        }
      }
    });
  }, [isAuth]);

  const removeCharacters = (email: string) => {
    const atIndex = email.indexOf("@");

    if (atIndex !== -1) {
      const domain = email.split("@")[1];
      return domain;
    }

    return email;
  };

  const formatedMail = removeCharacters(email);
  const closeError = () => {
    setError("");
  };

  return (
    <div className={style.login}>
      {error && <ErrorLogin error={error} closePopUp={closeError} />}
      {noSubmitedUser ? (
        <div className={style.needConfirmEmail}>
          <h3>Please check your mailbox</h3>
          <p>Mail was sent to {email}</p>
          <div>
            To complete your registration please visit your email and follow the
            link in the{" "}
            <span
              onClick={() => window.open(`https:${formatedMail}`, "_blank")}
            >
              email
            </span>
            <p>
              If no email
              <NavLink to="/login-mobile">
                <button className={style.googleBtn}>
                  Login with mobile number
                </button>
              </NavLink>
              <button className={style.googleBtn} onClick={handleGoogleSignIn}>
                <GoogleIcon /> Authorize with Google
              </button>
            </p>
          </div>
        </div>
      ) : (
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
            <NavLink to="/login-mobile">
              <button className={style.googleBtn}>
                Login with mobile number
              </button>
            </NavLink>

            <button className={style.googleBtn} onClick={handleGoogleSignIn}>
              <GoogleIcon /> Authorize with Google
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
