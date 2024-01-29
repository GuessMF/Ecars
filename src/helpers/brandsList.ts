import Audi_logo from "../assets/images/Brands/audi_logo.png";
import Acura_logo from "../assets/images/Brands/acura_logo.png";
import Alfa_romeo_logo from "../assets/images/Brands/alfa_romeo_logo.png";
import Aston_martin_logo from "../assets/images/Brands/aston_martin_logo.png";
import Bentley_logo from "../assets/images/Brands/bentley_logo.png";
import Bwm_logo from "../assets/images/Brands/bmw_logo.png";
import Ferrari_logo from "../assets/images/Brands/ferrari_logo.png";
import Ford_logo from "../assets/images/Brands/ford_logo.png";
import Infiniti_logo from "../assets/images/Brands/infiniti_logo.png";
import Jaguar_logo from "../assets/images/Brands/jaguar_logo.png";
import Land_rover_logo from "../assets/images/Brands/land_rover_logo.png";
import Lexus_logo from "../assets/images/Brands/lexus_logo.png";
import Maserati_logo from "../assets/images/Brands/maserati_logo.png";
import Maybach_logo from "../assets/images/Brands/maybach_logo.png";
import Mercedes_benz_logo from "../assets/images/Brands/mercedes_benz_logo.png";
import Nissan_logo from "../assets/images/Brands/nissan_logo.png";
import Porsche_logo from "../assets/images/Brands/porsche_logo.png";
import Rolls_royce_logo from "../assets/images/Brands/rolls_royce_logo.png";
import Tesla_logo from "../assets/images/Brands/tesla_logo.png";
import Toyota_logo from "../assets/images/Brands/toyota_logo.png";
import Volkswagen_logo from "../assets/images/Brands/volkswagen_logo.png";
import Volvo_logo from "../assets/images/Brands/volvo_logo.png";

interface Brand {
  name: string;
  brandIMG: string;
}

const brands: Brand[] = [
  {
    name: "Acura",
    brandIMG: Acura_logo,
  },
  {
    name: "Alfa Romeo",
    brandIMG: Alfa_romeo_logo,
  },
  {
    name: "Aston Martin",
    brandIMG: Aston_martin_logo,
  },
  {
    name: "Audi",
    brandIMG: Audi_logo,
  },
  {
    name: "Bentley",
    brandIMG: Bentley_logo,
  },
  {
    name: "BMW",
    brandIMG: Bwm_logo,
  },

  {
    name: "Ferrari",
    brandIMG: Ferrari_logo,
  },

  {
    name: "Ford",
    brandIMG: Ford_logo,
  },

  {
    name: "Infiniti",
    brandIMG: Infiniti_logo,
  },
  {
    name: "Jaguar",
    brandIMG: Jaguar_logo,
  },
  {
    name: "Land Rover",
    brandIMG: Land_rover_logo,
  },
  {
    name: "Lexus",
    brandIMG: Lexus_logo,
  },
  {
    name: "Maserati",
    brandIMG: Maserati_logo,
  },
  {
    name: "Maybach",
    brandIMG: Maybach_logo,
  },

  {
    name: "Mercedes Benz",
    brandIMG: Mercedes_benz_logo,
  },

  {
    name: "Nissan",
    brandIMG: Nissan_logo,
  },

  {
    name: "Porsche",
    brandIMG: Porsche_logo,
  },

  {
    name: "Rolls Royce",
    brandIMG: Rolls_royce_logo,
  },

  {
    name: "Tesla",
    brandIMG: Tesla_logo,
  },
  {
    name: "Toyota",
    brandIMG: Toyota_logo,
  },
  {
    name: "Volkswagen",
    brandIMG: Volkswagen_logo,
  },
  {
    name: "Volvo",
    brandIMG: Volvo_logo,
  },
];
export default brands;
