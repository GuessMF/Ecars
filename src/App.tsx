import React from "react";

import style from "./styles/__app.module.scss";
import TopBar from "./components/simple/TopBar/TopBar";
import GetAquote from "./components/ui/GetAquote/GetAquote";
import Header from "./components/ordinary/Header/Header";
import Hero from "./components/simple/Hero/Hero";
import SpecialOffers from "./components/simple/SpecialOffers/SpecialOffers";
import BrowseByBrand from "./components/simple/BrowseByBrand/BrowseByBrand";

function App() {
  return (
    <div className={style.app}>
      <TopBar />
      <Header />
      <Hero />
      <SpecialOffers />
      <BrowseByBrand />
    </div>
  );
}

export default App;
