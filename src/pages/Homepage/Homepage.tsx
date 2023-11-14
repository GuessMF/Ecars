import React from "react";

import Hero from "../../components/simple/Hero/Hero";
import SpecialOffers from "../../components/simple/SpecialOffers/SpecialOffers";
import BrowseByBrand from "../../components/simple/BrowseByBrand/BrowseByBrand";
import MiddleCTA from "../../components/simple/MiddleCTA/MiddleCTA";
import HowItWorks from "../../components/simple/HowItWorks/HowItWorks";
import WhyChooseUs from "../../components/simple/WhyChooseUs/WhyChooseUs";
import Reviews from "../../components/simple/Reviews/Reviews";
import BottomCTA from "../../components/simple/BottomCTA/BottomCTA";
import {redirect} from "react-router-dom";
import {useAuth} from "hooks/use-auth";
import {removeUser} from "store/slices/userSlice";
import {useAppDispatch} from "hooks/redux-hooks";

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
  const dispatch = useAppDispatch();
  const {isAuth, email} = useAuth();

  return (
    <div>
      <Hero />
      <SpecialOffers
        selectedCurrency={selectedCurrency}
        eurValue={eurValue}
        usdValue={usdValue}
      />
      <BrowseByBrand />
      <MiddleCTA />
      <HowItWorks />
      <WhyChooseUs />
      <Reviews />
      <BottomCTA />
    </div>
  );
}
