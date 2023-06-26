import React from "react";
import {Routes, Route} from "react-router-dom";

import style from "./styles/__app.module.scss";
import TopBar from "./components/simple/TopBar/TopBar";
import Header from "./components/ordinary/Header/Header";
import Homepage from "./pages/Homepage/Homepage";
import Catalog from "./pages/Catalog/Catalog";
import Footer from "./components/simple/Footer/Footer";
import AboutUs from "./pages/AboutUs/AboutUs";

function App() {
  return (
    <div className={style.app}>
      <TopBar />
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/aboutUs" element={<AboutUs />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
