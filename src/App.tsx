import {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import ScrollToTop from "./utils/scrollToTop";
import style from "./styles/__app.module.scss";
import TopBar from "./components/simple/TopBar/TopBar";
import Header from "./components/ordinary/Header/Header";
import Homepage from "./pages/Homepage/Homepage";
import Catalog from "./pages/Catalog/Catalog";
import Footer from "./components/simple/Footer/Footer";
import AboutUs from "./pages/AboutUs/AboutUs";
import Details from "./pages/Details/Details";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import PersonalPage from "./pages/PersonalPage/PersonalPage";
import Liked from "pages/Liked/Liked";

import {getAuth, onAuthStateChanged} from "firebase/auth";
import {setUser} from "store/slices/userSlice";
import {useAppDispatch} from "hooks/redux-hooks";
import UserPage from "pages/UserPage/UserPage";
import Cookies from "universal-cookie";
import {setCurrValue} from "./store/slices/currValueSlice";
import LoginMobile from "pages/LoginMobile/LoginMobile";
import FAQ from "pages/FAQ/FAQ";

function App() {
  const [userId, setUserId] = useState<string>("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    const cookies = new Cookies(null, {path: "/"});

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      user && setUserId(user?.uid);

      if (user) {
        dispatch(
          setUser({
            displayName: user.displayName,
            mobile: user.phoneNumber,
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        cookies.set("auth", "true");
      } else {
        cookies.set("auth", "false");
      }
    });

    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          "https://www.cbr-xml-daily.ru/daily_json.js"
        );
        const data = await response.json();
        dispatch(
          setCurrValue({
            eurValue: data.Valute.EUR.Value,
            usdValue: data.Valute.USD.Value,
          })
        );
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, [dispatch]);

  return (
    <div className={style.app}>
      <ScrollToTop />
      <TopBar />
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/details/:id" element={<Details />} />
        <Route
          path="/sell/:userId"
          element={<PersonalPage userID={userId} />}
        />

        <Route
          path="/user-page/:userId"
          element={<UserPage userID={userId} />}
        />

        <Route path="/liked/:userId" element={<Liked userID={userId} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-mobile" element={<LoginMobile />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
