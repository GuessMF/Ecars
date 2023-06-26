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
    brand: "Acura",
    model: "RDX white",
    price: "45,995",
    special: false,
    imageURL:
      "https://lh3.googleusercontent.com/pw/AJFCJaWi-4f7izW532zCvDrVZwtzooTMJ56DECD-S3gizLGdPjipl68oqssLkF_KQwtRO1TcoW2eAoqop1grhr7zoK893vTK0zmeJYzpXnHnD73-sSLTpP-Cacsg1rWhKjkCooOwoVe3V90M5J0rzXJW1g7G2HIv8EHJfVXY9xkIPb02u4DcdPr4y7dW1F5t_B9AB0gMI73d4N9z0mS6bp5Z_rSGGLwzcwSbCvQSaM1NPTFMj1nxMg_oG733R56ozEAUKEkQQwKHadJySbORs8Nx-MlTAdNfp9Qx5lHefGz5h4vDMEAHE_cqVANxnA-jx0BcIZmx431qRihcUA_jqvem7EYl5dSHmC7iejfnKGmE2xch6EGFQNGYvwun4JvZcIkPzZnNnIF7EnB1wWkpIF5GsaJg-AOh-M2kjCuqMg99y_9kX_UmdX3vj66fTcKy6r31iZ02X1-tCN15kQMhOMRsTSvDRbtoJ9G4BLRFmo-FqTgnDAFRZ3HasqG1cecjJ9VtU1SqD8hMiXUFzABCVmfMr2-jnO6C6Yi3I0jb89jzEc9Mo6sgnUrdF9dg9qscw2Sed_V6GCUD72R46g5bvZThZynH5zXHGLliBa9Hx3lcY5P50EhGTr5GlOqSkQN-BFqunwGEg4c87_3VQco9er7oJxCVbRJd9_dykElq7GQo4kpfFMIBxHPSF404OcqFnWHWNzIsIETL8FSBkn5ZStZBs0OqY_7AZWhMUq2ZaDNaoLm0CCRGWRaYGFA4ncAmAn1o5dsrpd_ySueGZn8mBn0rVX7zEgnZ24tXLNcyDX53hxzhLPxqYeMjXVzommnesMKZrz9PYmdCDcgLiLFCpZukvDsUjE06k2CAAmkuj-dZ6cq2Pw5HFh26_lvND1N3Iy2t0wIRcLTX3J9zN2CxV-88RSdQ=w300-h225-s-no?authuser=0",
  },
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
