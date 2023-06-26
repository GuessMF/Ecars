//import toyota_camry from "../assets/images/BigCard/Toyota_camry.png";
//import toyota_high from "../assets/images/BigCard/Toyota_Land_Cruiser_300.webp";
import Toyota_camry from "../assets/images/BigCard/Toyota/Toyota_Camry.webp";
import Toyota_corolla from "../assets/images/BigCard/Toyota/Toyota_Corolla.webp";
import Toyota_fjcruiser from "../assets/images/BigCard/Toyota/Toyota_FJcruiser.webp";
import Toyota_hiace from "../assets/images/BigCard/Toyota/Toyota_Hiace.webp";
import Toyota_highlander from "../assets/images/BigCard/Toyota/Toyota_Highlander.webp";
import Toyota_hilux from "../assets/images/BigCard/Toyota/Toyota_Hilux.webp";
import Toyota_landcruiser from "../assets/images/BigCard/Toyota/Toyota_Landcruiser.webp";
import Toyota_prado_black from "../assets/images/BigCard/Toyota/Toyota_Prado_black.webp";
import Toyota_prado_white from "../assets/images/BigCard/Toyota/Toyota_Prado_white.webp";
import Toyota_tundra from "../assets/images/BigCard/Toyota/Toyota_Tundra.webp";

interface Car {
  brand: string;
  model: string;
  price: string;
  special: boolean;
  imageURL: string;
}
const cars: Car[] = [
  {
    brand: "Toyota",
    model: "Land Cruiser",
    price: "47,831",
    special: true,
    imageURL: Toyota_landcruiser,
  },
  {
    brand: "Toyota",
    model: "Prado",
    price: "45,995",
    special: false,
    imageURL: Toyota_prado_white,
  },
  {
    brand: "Toyota",
    model: "FJ Cruiser",
    price: "45,995",
    special: false,
    imageURL: Toyota_fjcruiser,
  },
  {
    brand: "Toyota",
    model: "Corolla",
    price: "45,995",
    special: true,
    imageURL: Toyota_corolla,
  },
  {
    brand: "Toyota",
    model: "Camry sport",
    price: "45,995",
    special: true,
    imageURL: Toyota_camry,
  },
  {
    brand: "Toyota",
    model: "Highlander",
    price: "45,995",
    special: false,
    imageURL: Toyota_highlander,
  },
  {
    brand: "Toyota",
    model: "Hiace",
    price: "45,995",
    special: true,
    imageURL: Toyota_hiace,
  },
  {
    brand: "Toyota",
    model: "Tundra",
    price: "45,995",
    special: false,
    imageURL: Toyota_tundra,
  },
  {
    brand: "Toyota",
    model: "Hilux",
    price: "45,995",
    special: false,
    imageURL: Toyota_hilux,
  },
  {
    brand: "Toyota",
    model: "Land Cruiser",
    price: "45,995",
    special: false,
    imageURL: Toyota_landcruiser,
  },
  {
    brand: "Toyota",
    model: "Prado black",
    price: "45,995",
    special: false,
    imageURL: Toyota_prado_black,
  },
];

export {cars};
