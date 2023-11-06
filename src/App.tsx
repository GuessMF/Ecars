import React, {useState, useEffect} from "react";
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

function App() {
  const [currentExchange, setCurrentExchange] = useState<any>(null);

  const [selectedCurr, setSelectedCurr] = useState<string>("RUB");
  console.log(selectedCurr);

  const [usdValue, setUsdValue] = useState<number>(0);
  const [eurValue, setEurValue] = useState<number>(0);
  useEffect(() => {
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
        console.log(usdValue + " USD");
        console.log(eurValue + " EUR");
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  const handleCurrencyChange = (currencyCode: string) => {
    setSelectedCurr(currencyCode);
  };

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
        <Route path="/" element={<Homepage />} />
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
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/per" element={<PersonalPage />} />
      </Routes>
      <Footer />
      <div></div>
    </div>
  );
}

export default App;
