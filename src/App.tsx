import React, {useState, useEffect} from "react";
import {Routes, Route, Navigate} from "react-router-dom";

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
import TestPage from "./pages/TestPage/TestPage";
import Liked from "pages/Liked/Liked";

import {getAuth, onAuthStateChanged} from "firebase/auth";
import {setUser} from "store/slices/userSlice";
import {useAppDispatch} from "hooks/redux-hooks";
import {useSelector} from "react-redux";
import {RootState} from "./store";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import UserPage from "pages/UserPage/UserPage";

function App() {
  const [currentExchange, setCurrentExchange] = useState<any>(null);
  const dispatch = useAppDispatch();
  const [userId, setUserId] = useState<string>("");
  // console.log(userId);
  // const userId = useSelector((state: RootState) => state.user.id);

  const navigate = useNavigate();

  const [selectedCurr, setSelectedCurr] = useState<string>("RUB");

  const [usdValue, setUsdValue] = useState<number>(0);
  const [eurValue, setEurValue] = useState<number>(0);

  // const userIdCatch= async()=>{
  // try {

  // } catch (error) {

  // }

  // }

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      user && setUserId(user?.uid);

      if (user) {
        dispatch(
          setUser({
            displayName: user.displayName,
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        //push
      } else {
        console.log("no user");
      }
    });

    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          "https://www.cbr-xml-daily.ru/daily_json.js"
        );
        const data = await response.json();

        Object.keys(data.Valute).map((currencyCode: string) =>
          data.Valute[currencyCode].CharCode === "USD"
            ? setUsdValue(data.Valute[currencyCode].Value)
            : data.Valute[currencyCode].CharCode === "EUR"
            ? setEurValue(data.Valute[currencyCode].Value)
            : 0
        );

        setCurrentExchange(data.Valute);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  const handleCurrencyChange = (currencyCode: string) => {
    setSelectedCurr(currencyCode);
  };

  const redirectToUserPage = () => {
    if (userId) {
      navigate(`/per/${userId}`);
    } else {
      navigate(`/login`);
    }
  };

  // <Route path="/per/:userID" element={<PersonalPage userID={userId} />} />

  //<Route path="per/:userID" element={<UserRoute />} />

  //   <Route path="/per/:userId" element={<PersonalPage userID={userId} />} />

  return (
    <div className={style.app}>
      <ScrollToTop />
      <TopBar
        eurValue={eurValue}
        usdValue={usdValue}
        selectedCurrency={selectedCurr}
        onCurrencyChange={(selectedCurrency) =>
          setSelectedCurr(selectedCurrency.value)
        }
      />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              selectedCurrency={selectedCurr}
              eurValue={eurValue}
              usdValue={usdValue}
            />
          }
        />
        <Route
          path="/catalog"
          element={
            <Catalog
              selectedCurrency={selectedCurr}
              eurValue={eurValue}
              usdValue={usdValue}
            />
          }
        />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route
          path="/details/:id"
          element={
            <Details
              selectedCurrency={selectedCurr}
              eurValue={eurValue}
              usdValue={usdValue}
            />
          }
        />
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
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />

        <Route path="/test" element={<TestPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
