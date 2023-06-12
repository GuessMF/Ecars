import React from "react";

import style from "./styles/__app.module.scss";
import TopBar from "./components/simple/TopBar/TopBar";
import GetAquote from "./components/ui/GetAquote/GetAquote";
import Header from "./components/ordinary/Header/Header";
import Hero from "./components/simple/Hero/Hero";
import SpecialOffers from "./components/simple/SpecialOffers/SpecialOffers";
function App() {
  return (
    <div className={style.app}>
      <TopBar />
      <Header />
      <Hero />
      <SpecialOffers />
    </div>
  );
}

export default App;
