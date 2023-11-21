import React from "react";
import {useEffect, useState} from "react";

import Hero from "../../components/simple/Hero/Hero";
import SpecialOffers from "../../components/simple/SpecialOffers/SpecialOffers";
import BrowseByBrand from "../../components/simple/BrowseByBrand/BrowseByBrand";
import MiddleCTA from "../../components/simple/MiddleCTA/MiddleCTA";
import HowItWorks from "../../components/simple/HowItWorks/HowItWorks";
import WhyChooseUs from "../../components/simple/WhyChooseUs/WhyChooseUs";
import Reviews from "../../components/simple/Reviews/Reviews";
import BottomCTA from "../../components/simple/BottomCTA/BottomCTA";

// import {db} from "../../firebase";
// import {doc, getDocs, collection} from "firebase/firestore";

interface Props {
  selectedCurrency: string;
  eurValue: number;
  usdValue: number;
}

export default function Homepage({
  selectedCurrency,
  eurValue,
  usdValue,
}: Props) {
  return (
    <div>
      <Hero />

      <SpecialOffers
        selectedCurrency={selectedCurrency}
        eurValue={eurValue}
        usdValue={usdValue}
      />
      <button>
        <h1>hello</h1>
      </button>

      <BrowseByBrand />
      <MiddleCTA />
      <HowItWorks />
      <WhyChooseUs />
      <Reviews />
      <BottomCTA />
    </div>
  );
}
