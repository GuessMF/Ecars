import React from "react";
import {useEffect} from "react";

import Hero from "../../components/simple/Hero/Hero";
import SpecialOffers from "../../components/simple/SpecialOffers/SpecialOffers";
import BrowseByBrand from "../../components/simple/BrowseByBrand/BrowseByBrand";
import MiddleCTA from "../../components/simple/MiddleCTA/MiddleCTA";
import HowItWorks from "../../components/simple/HowItWorks/HowItWorks";
import WhyChooseUs from "../../components/simple/WhyChooseUs/WhyChooseUs";
import Reviews from "../../components/simple/Reviews/Reviews";
import BottomCTA from "../../components/simple/BottomCTA/BottomCTA";

import {db} from "../../firebase";
import {doc, getDocs, collection} from "firebase/firestore";

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
  // console.log(db);

  // useEffect(() => {
  //   const docRef = doc(db, "cities");

  //   const fetchData = async () => {
  //     try {
  //       const docSnapshot = await getDoc(docRef);

  //       if (docSnapshot.exists()) {
  //         console.log("Document data:", docSnapshot.data());
  //       } else {
  //         console.log("Document does not exist!");
  //       }

  //       console.log("Document successfully downloaded!");
  //     } catch (error) {
  //       console.error("Error fetching document: ", error);
  //     }
  //   };

  //   // Вызываем функцию получения документа
  //   fetchData();
  // }, []);

  useEffect(() => {
    const citiesRef = collection(db, "2222");

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(citiesRef);

        querySnapshot.forEach((doc) => {
          console.log("Document data:", doc.data());
        });

        console.log("Documents successfully downloaded!");
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    // Вызываем функцию получения документов
    fetchData();
  }, []);

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
