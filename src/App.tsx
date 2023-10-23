import React, {useRef, useEffect} from "react";
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
  // const headerRef = useRef<HTMLElement | null>(null);
  // useEffect(() => {
  //   if (headerRef.current) {
  //     const headerHeight = headerRef.current.getBoundingClientRect().height;
  //   }
  // }, []);

  return (
    <div className={style.app}>
      <ScrollToTop />
      <TopBar />
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/per" element={<PersonalPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
