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
      "https://drive.google.com/uc?export=view&id=1J0uzIzF3RnSsI1ThP1uS3CHeBu5vg-zB",
  },
  {
    brand: "Acura",
    model: "TLX BLue",
    price: "47,831",
    special: true,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1scexrpd4inlsgirsRTdztWRkEbZIF765",
  },
  {
    brand: "Alfa Romeo",
    model: "Giulietta",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1-sl4I08SvNDy4leVJyDGVj4c-ud975eW",
  },
  {
    brand: "Alfa Romeo",
    model: "Giullia",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=11RvcxC3xb1wKvxbIkfIvbvweqBePlB-7",
  },
  {
    brand: "Aston Martin",
    model: "DBX",
    price: "45,995",
    special: true,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1rSyB6xdr2b7GybVTNBxmY9dCZw1aPJvL",
  },
  {
    brand: "Aston Martin",
    model: "V8 Vantage",
    price: "45,995",
    special: true,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1QnVkjEGpDNfYL1mqPRvYtaPz5PFYaPMP",
  },
  {
    brand: "Audi",
    model: "A8",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1YdIkp6z3mKctdBgnryY2vfYVWAG5XD8V",
  },
  {
    brand: "Audi",
    model: "RS 6",
    price: "45,995",
    special: true,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1c3lIzadkMEqtVyg17mCStR0bkMCOxfiQ",
  },
  {
    brand: "Audi",
    model: "RS 7",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1EKyFHHjRA0Ou8SZFiIV3J7oIV58_Lmd7",
  },
  {
    brand: "Audi",
    model: "RS Q8",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1KM9jJAGnDx2_PaCSzrBXTBh3m7UniMA1",
  },
  {
    brand: "Bentley",
    model: "Continental GT",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1xLef1jnXWWBnDgT-dIumohe3OQCMt4Lq",
  },
  {
    brand: "Bentley",
    model: "Continental GT",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1dJl9_kD4kNpfKE5Js30sbJUNVD1qjQtr",
  },
  {
    brand: "BMW",
    model: "M5",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1qmyXNe2nuj2KXGbAaPpu6h4xiWasN1HK",
  },
  {
    brand: "BMW",
    model: "M8",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1fciaONDocXBk1SoU0RJqgk6vp00Bw5AS",
  },
  {
    brand: "BMW",
    model: "X5M",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1K_CFgXMgidDUU7_lz4_Mvcf4hewXcIB0",
  },
  {
    brand: "BMW",
    model: "X7",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1HgKjfO9lT-8Ij5_aYjyV4IZROU0H63fG",
  },
  {
    brand: "Ferrari",
    model: "296 GTB",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1ThvKUTPFHD3pIo6uoPKjJRXGl4R6H7n1",
  },
  {
    brand: "Ferrari",
    model: "F8 Spider",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=15Cs1DzkRp4fhQgXv7MrCMZ36YKH_qMQp",
  },
  {
    brand: "Ferrari",
    model: "Rome",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=14qx3K0A7N6n1avws64k7PLVEHtkelnqt",
  },
  {
    brand: "Ford",
    model: "Mustang",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1-_9L8pYNWalEHuxJQZQMW5DF6jZfGTt2",
  },
  {
    brand: "Ford",
    model: "Mustang Mach-E",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=109CJZqykg69n-QMuLmZnqmMAqGRSEX2b",
  },

  {
    brand: "Infiniti",
    model: "Q60",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=17wd1cEiG7ZhAKe4rGmcjsSr7PvWFI4tB",
  },
  {
    brand: "Infiniti",
    model: "QX 80",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1770lEPqjR7CEw2R3hI8OWx62tlsgq_Lj",
  },
  {
    brand: "Jaguar",
    model: "F-Pace",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1MgK2Y7y_ZfRgUFwZ-dIEHdw5lMgqPAsk",
  },
  {
    brand: "Jaguar",
    model: "I-Pace",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1PXKJTuapjzTTMQ8rCNJfM94kenb75mX7",
  },
  {
    brand: "Jaguar",
    model: "F-Type",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1NuZv6b6moLMKRykXibVVgpq4xLTuaIHd",
  },
  {
    brand: "Land Rover",
    model: "Defender 90",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1IjxNFmjv0-pV051IdG2mdRbVdzDQVmGR",
  },
  {
    brand: "Land Rover",
    model: "Defender 110",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1HoE607viEVUgNpp8JuD0A1dvUAfWK9r_",
  },
  {
    brand: "Land Rover",
    model: "Range Rover P-360",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1LszDFNvRuO4kINfRRZ1a6uGOR9Sh14vr",
  },
  {
    brand: "Land Rover",
    model: "Range Rover D-350",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1Jlz8ZqEYlYnWMY-mM2E5oJz-y9itos1_",
  },
  {
    brand: "Land Rover",
    model: "Range Rover P-530",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1KrKwIofyDVMw8n0mY4dTIkVfSck--Vdm",
  },
  {
    brand: "Lexus",
    model: "LX 600",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1GB5SJJ4qMaRzDvuOrk1b2Ub3eQMowelp",
  },
  {
    brand: "Lexus",
    model: "LX 600",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1Gz7Zhio3Pc_72cStlR0sZHYa7T1n208x",
  },
  {
    brand: "Maserati",
    model: "Levante",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1RpAFTd13-_FczkTDIvN8-hgVBAbIqrnP",
  },
  {
    brand: "Maserati",
    model: "MC20",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1SheYb6Q-gRus8MBYmqN3IIYrjaJfIXb4",
  },
  {
    brand: "Maserati",
    model: "Quattroporte VI",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1TG54cmsTzJ4GArHhADZlDcMTJQGWHn_x",
  },
  {
    brand: "Maybach",
    model: "62",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1Po_m1y-9jxtdpRaYAtAXWQaxKXQ-nqfC",
  },
  {
    brand: "Maybach",
    model: "S-Klasse 680",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1QchIq3VAnPLOQULTQQtrO_l6G1oIwtQU",
  },
  {
    brand: "Mercedes-Benz",
    model: "G63 AMG",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1VS0nCOMV6T32A3kTPUAV7Bi7XrMcdE5P",
  },
  {
    brand: "Mercedes-Benz",
    model: "G63 AMG 4x4",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1X9WfUH9IxHlxXkzmTTShm2D9uT1dZ6J9",
  },
  {
    brand: "Mercedes-Benz",
    model: "S-Klasse",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1WAoMnwmPpfedw8Dc_sa2tSVdNiYtPJGk",
  },
  {
    brand: "Lexus",
    model: "LX 600",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1Gz7Zhio3Pc_72cStlR0sZHYa7T1n208x",
  },
  {
    brand: "Nissan",
    model: "GT-R",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1V9oZQ_32Ld1hDNJIk-ndjkk2heJGZVp5",
  },
  {
    brand: "Lexus",
    model: "LX 600",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1Gz7Zhio3Pc_72cStlR0sZHYa7T1n208x",
  },
  {
    brand: "Porsche",
    model: "911 Turbo S",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=11gmRaUOgtQZpyXbm1sg8byXAfxfbSvzI",
  },
  {
    brand: "Porsche",
    model: "Cayenne GTS",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=12qm1f7VIBq2yq8j6eFSgROGyPgkL1Qmd",
  },
  {
    brand: "Rolls Royce",
    model: "Cullinan",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1LHbSJBzf3yv8li2fVpoQLzybtnUWMh0w",
  },

  {
    brand: "Rolls Royce",
    model: "Phantom",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1MHx-k_bW-TKuZ-oZYSYEW7IevRpg8SG8",
  },
  {
    brand: "Tesla",
    model: "Model S Plaid",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1BHtUTfyx6Y8je0mbxgovL22SmX5hSWmT",
  },
  {
    brand: "Tesla",
    model: "Model X",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1C8z0kDw8pnyZyuQGw8uUvlXxT2Hnnz4s",
  },
  {
    brand: "Toyota",
    model: "Hilux Arctic",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1DgNYvQCn02NE4qGLjSseyHqnAakQBuqj",
  },
  {
    brand: "Toyota",
    model: "Land Cruiser 300",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1D9eVIX2b49Oo-KcLVGPH7WWeAm1iK_oY",
  },
  {
    brand: "Volkswagen",
    model: "Multivan",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1EC3Pt9Xfp45MpKSKQh8yV98pOG3fjAIu",
  },
  {
    brand: "Volkswagen",
    model: "Touareg",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1DsTE0FMRpv1g6D1tPlQWGvxiYAMiu7aN",
  },
  {
    brand: "Toyota",
    model: "Land Cruiser 300",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1D9eVIX2b49Oo-KcLVGPH7WWeAm1iK_oY",
  },
  {
    brand: "Volvo",
    model: "XC90",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=16FG4iLmdq4LsfS505JDSObC0PI-8cJv6",
  },
];

export {cars};
