import React, {useState, useEffect} from "react";
import GetAquote from "../../ui/GetAquote/GetAquote";
import {NavLink} from "react-router-dom";
import Liked from "../../ui/Liked/Liked";
import Profile from "../../ui/Profile/Profile";
import Search from "../../ui/Search/Search";
import style from "./__header.module.scss";
import {ReactComponent as MenuLines} from "../../../assets/icons/header/menu-line.svg";
import Sidebar from "../Sidebar/Sidebar";

import {useAuth} from "hooks/use-auth";
import {removeUser} from "store/slices/userSlice";
import {useAppDispatch} from "hooks/redux-hooks";
import {getAuth, signOut, onAuthStateChanged} from "firebase/auth";
// import {useAuth} from "utils/useAuth";

const version: string = "little";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const {isAuth, email, displayName} = useAuth();
  // console.log(email);
  // console.log(displayName);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useAppDispatch();
  // const {isAuth, email, displayName} = useAuth();
  // console.log(email);
  // console.log(displayName);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      user && setUserId(user?.uid);
    });
  }, []);

  const handleLogout = () => {
    const auth = getAuth(); // Получаем объект аутентификации Firebase
    signOut(auth) // Выход из учетной записи
      .then(() => {
        dispatch(removeUser()); // Удаляем данные пользователя из Redux store
      })
      .catch((error) => {
        console.error("Sign out error:", error);
        // Обработка ошибок выхода из учетной записи
      });
  };

  return (
    <div className={style.header}>
      <nav className={style.header__nav}>
        <div className={style.menu}>
          <MenuLines onClick={toggleSidebar} />
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <NavLink to="/">
          <svg
            width="85"
            height="22"
            viewBox="0 0 85 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29.7275 0C30.7574 0 31.9559 0.133173 33.3231 0.399517C34.7081 0.665861 35.7202 0.94996 36.3595 1.25182V6.92494H33.8292C32.462 4.35028 30.5798 3.06295 28.1827 3.06295C27.2061 3.06295 26.3094 3.37369 25.4926 3.99516C24.6759 4.61663 24.0277 5.46893 23.5483 6.55206C23.0867 7.63519 22.8558 8.85149 22.8558 10.201C22.8558 11.728 23.0867 13.1308 23.5483 14.4092C24.0277 15.6699 24.7469 16.682 25.7057 17.4455C26.6646 18.1913 27.8542 18.5642 29.2747 18.5642C30.8905 18.5642 33.19 17.6764 36.173 15.9007L37.2384 17.6053L32.3377 21.414C31.5564 21.6449 30.8018 21.7958 30.0738 21.8668C29.3635 21.9556 28.6 22 27.7832 22C25.7945 22 24.0278 21.5472 22.483 20.6416C20.9382 19.7361 19.7396 18.4931 18.8873 16.9128C18.035 15.3148 17.6089 13.5036 17.6089 11.4794C17.6089 9.40194 18.2481 7.48426 19.5265 5.72639C20.805 3.95077 22.3942 2.5569 24.2941 1.5448C26.194 0.514932 28.0051 0 29.7275 0Z"
              fill="#1A1A1A"
            />
            <path
              d="M54.8681 21.4673H48.7954V19.1501L45.7857 21.5206C45.4306 21.6626 44.9867 21.7337 44.454 21.7337C42.7494 21.7337 41.5154 21.3164 40.7519 20.4818C40.0061 19.6473 39.6332 18.6441 39.6332 17.4722C39.6332 16.7797 39.8463 16.1049 40.2724 15.4479C40.6986 14.7732 41.3112 14.1517 42.1102 13.5835H48.7954V13.1308C48.7954 12.1542 48.5291 11.435 47.9964 10.9734C47.4637 10.5117 46.7535 10.2809 45.8657 10.2809C44.6227 10.2809 42.998 10.7692 40.9916 11.7458L40.1925 10.2276L43.8947 7.24455C44.8003 6.97821 45.8568 6.84504 47.0642 6.84504C49.0529 6.84504 50.5888 7.29782 51.6719 8.20339C52.7728 9.10896 53.3233 10.4229 53.3233 12.1453V18.8039L55.7204 19.7361L54.8681 21.4673ZM45.8124 18.1646C46.718 18.1646 47.7123 17.7918 48.7954 17.046V15.3414H44.5073C44.3652 15.5545 44.2587 15.7587 44.1877 15.954C44.1344 16.1316 44.1078 16.3358 44.1078 16.5666C44.1078 17.0105 44.2587 17.3834 44.5606 17.6852C44.8802 17.9871 45.2975 18.138 45.8124 18.138V18.1646Z"
              fill="#1A1A1A"
            />
            <path
              d="M66.0289 10.6271C65.3897 10.6271 64.7505 10.9112 64.1112 11.4794V18.6707L68.1597 19.7361L67.3074 21.4673H57.2129V19.9758L59.5834 17.9782V11.9322L57.2129 10.4407V8.94915L62.7529 6.60533L63.765 9.56174L66.1887 7.05811C66.5616 6.91606 66.9966 6.84504 67.4938 6.84504C68.4171 6.84504 69.2073 7.05811 69.8643 7.48426C70.539 7.91041 71.0095 8.49637 71.2759 9.24213L68.719 12.4383H67.041C67.0233 11.799 66.9345 11.3462 66.7747 11.0799C66.6149 10.7958 66.3663 10.6538 66.0289 10.6538V10.6271Z"
              fill="#1A1A1A"
            />
            <path
              d="M80.1008 18.0847C80.1008 17.7474 79.87 17.41 79.4083 17.0726C78.9467 16.7175 78.2364 16.2736 77.2776 15.7409C76.3365 15.2082 75.5818 14.7554 75.0136 14.3826C74.4454 13.9919 73.9483 13.5569 73.5221 13.0775C73.1137 12.5803 72.9095 12.0476 72.9095 11.4794C72.9095 10.8402 73.2114 10.1566 73.8151 9.42857C74.4366 8.70057 75.1912 8.08797 76.079 7.5908C76.9668 7.09362 77.7836 6.84504 78.5294 6.84504C79.4349 6.84504 80.4915 6.95157 81.6989 7.16465C82.9241 7.35997 83.8119 7.58192 84.3623 7.83051V12.2785H82.6843C82.2049 11.3906 81.6279 10.6981 80.9531 10.201C80.2961 9.70379 79.6125 9.4552 78.9023 9.4552C78.5471 9.4552 78.263 9.56174 78.05 9.77482C77.8369 9.97014 77.7304 10.2098 77.7304 10.4939C77.7304 10.8668 77.9612 11.2308 78.4228 11.586C78.9023 11.9411 79.6569 12.4116 80.6868 12.9976C82.054 13.7433 83.1016 14.4181 83.8296 15.0218C84.5754 15.6255 84.9483 16.318 84.9483 17.0993C84.9483 17.7563 84.6287 18.4487 83.9894 19.1768C83.368 19.887 82.5956 20.4907 81.6722 20.9879C80.7667 21.4851 79.9321 21.7337 79.1686 21.7337C78.192 21.7337 77.029 21.636 75.6795 21.4407C74.3478 21.2276 73.3978 20.9968 72.8296 20.7482V16.1404H74.5076C75.0403 17.0815 75.6973 17.8184 76.4785 18.3511C77.2598 18.866 78.0322 19.1235 78.7957 19.1235C79.1864 19.1235 79.4971 19.0258 79.7279 18.8305C79.9765 18.6174 80.1008 18.3688 80.1008 18.0847Z"
              fill="#1A1A1A"
            />
            <path
              d="M8.68281 6.84504C10.5472 6.84504 11.9855 7.55529 12.9976 8.97579C14.0274 10.3963 14.5246 12.3672 14.4891 14.8886H4.90073C5.07829 15.9718 5.46005 16.8418 6.046 17.4988C6.63196 18.138 7.39548 18.4576 8.33656 18.4576C9.5795 18.4576 11.364 17.8362 13.6901 16.5932L14.4891 18.1114L10.4407 21.3341C9.39306 21.6005 8.17676 21.7337 6.79177 21.7337C5.49556 21.7337 4.32365 21.4318 3.27603 20.8281C2.24617 20.2066 1.43826 19.3632 0.8523 18.2978C0.2841 17.2324 0 16.0517 0 14.7555C0 13.3527 0.452784 12.0476 1.35835 10.8402C2.26392 9.61502 3.39144 8.6473 4.74092 7.93705C6.10815 7.20904 7.42211 6.84504 8.68281 6.84504ZM7.21792 9.93463C6.43664 9.93463 5.85069 10.201 5.46005 10.7337C5.06941 11.2486 4.85634 12.0476 4.82082 13.1308H9.90799C9.76594 12.0299 9.4996 11.222 9.10896 10.707C8.73608 10.1921 8.09685 9.93463 7.19128 9.93463H7.21792Z"
              fill="#3C7D46"
            />
          </svg>
        </NavLink>

        <div className={style.links}>
          {" "}
          <li>
            <NavLink to="/catalog" className={style.navLink}>
              All Cars
            </NavLink>
          </li>
          <li>
            <NavLink to="/aboutUs" className={style.navLink}>
              About Us
            </NavLink>
          </li>
          <li>Blog</li>
          <li>
            {" "}
            <NavLink to="/test" className={style.navLink}>
              Test
            </NavLink>
          </li>
        </div>
      </nav>
      <div className={style.header__formGroup}>
        {isAuth ? (
          <div className={style.user}>
            <p>{displayName}</p>

            <button onClick={handleLogout}>Выйти</button>
          </div>
        ) : (
          <div className={style.user}>
            <p>NoUser</p>

            <button onClick={handleLogout}>Выйти</button>
          </div>
        )}
        <div className={style.formGroup__icons}>
          <Search />
          <Liked />
          <NavLink to="/login">
            <Profile />
          </NavLink>
        </div>
        {userId ? (
          <NavLink to={`/per/${userId}`}>
            <GetAquote version={version} />
          </NavLink>
        ) : (
          <NavLink to={`/login`}>
            <GetAquote version={version} />
          </NavLink>
        )}
      </div>
    </div>
  );
}
