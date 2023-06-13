import React from "react";

import style from "./styles/__app.module.scss";
import TopBar from "./components/simple/TopBar/TopBar";
import GetAquote from "./components/ui/GetAquote/GetAquote";
import Header from "./components/ordinary/Header/Header";
import Hero from "./components/simple/Hero/Hero";
import SpecialOffers from "./components/simple/SpecialOffers/SpecialOffers";
import BrowseByBrand from "./components/simple/BrowseByBrand/BrowseByBrand";
import MiddleCTA from "./components/simple/MiddleCTA/MiddleCTA";
import HowItWorks from "./components/simple/HowItWorks/HowItWorks";
import WhyChooseUs from "./components/simple/WhyChooseUs/WhyChooseUs";
import Reviews from "./components/simple/Reviews/Reviews";

function App() {
  return (
    <div className={style.app}>
      <TopBar />
      <Header />
      <Hero />
      <SpecialOffers />
      <BrowseByBrand />
      <MiddleCTA />
      <HowItWorks />
      <WhyChooseUs />
      <Reviews />
    </div>
  );
}

export default App;
