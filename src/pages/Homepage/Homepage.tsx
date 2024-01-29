import Hero from "../../components/simple/Hero/Hero";
import SpecialOffers from "../../components/simple/SpecialOffers/SpecialOffers";
import BrowseByBrand from "../../components/simple/BrowseByBrand/BrowseByBrand";
import MiddleCTA from "../../components/simple/MiddleCTA/MiddleCTA";
import HowItWorks from "../../components/simple/HowItWorks/HowItWorks";
import WhyChooseUs from "../../components/simple/WhyChooseUs/WhyChooseUs";
import Reviews from "../../components/simple/Reviews/Reviews";
import BottomCTA from "../../components/simple/BottomCTA/BottomCTA";

export default function Homepage() {
  return (
    <div>
      <Hero />
      <SpecialOffers />
      <BrowseByBrand />
      <MiddleCTA />
      <HowItWorks />
      <WhyChooseUs />
      <Reviews />
      <BottomCTA />
    </div>
  );
}
