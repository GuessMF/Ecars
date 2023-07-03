//import toyota_camry from "../assets/images/BigCard/Toyota_camry.png";
//import toyota_high from "../assets/images/BigCard/Toyota_Land_Cruiser_300.webp";
// import Toyota_camry from "../assets/images/BigCard/Toyota/Toyota_Camry.webp";
// import Toyota_corolla from "../assets/images/BigCard/Toyota/Toyota_Corolla.webp";
// import Toyota_fjcruiser from "../assets/images/BigCard/Toyota/Toyota_FJcruiser.webp";
// import Toyota_hiace from "../assets/images/BigCard/Toyota/Toyota_Hiace.webp";
// import Toyota_highlander from "../assets/images/BigCard/Toyota/Toyota_Highlander.webp";
// import Toyota_hilux from "../assets/images/BigCard/Toyota/Toyota_Hilux.webp";
// import Toyota_landcruiser from "../assets/images/BigCard/Toyota/Toyota_Landcruiser.webp";
// import Toyota_prado_black from "../assets/images/BigCard/Toyota/Toyota_Prado_black.webp";
// import Toyota_prado_white from "../assets/images/BigCard/Toyota/Toyota_Prado_white.webp";
// import Toyota_tundra from "../assets/images/BigCard/Toyota/Toyota_Tundra.webp";

interface Car {
  index: number;
  brand: string;
  model: string;
  price: string;
  special: boolean;
  imageURL: string;
}
const cars: Car[] = [
  {
    // id: "1",
    index: 0,
    brand: "Acura",
    model: "RDX white",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1J0uzIzF3RnSsI1ThP1uS3CHeBu5vg-zB",
  },
  {
    // id: "2",
    index: 1,
    brand: "Acura",
    model: "TLX BLue",
    price: "47,831",
    special: true,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1scexrpd4inlsgirsRTdztWRkEbZIF765",
  },
  {
    // id: "3",
    index: 2,
    brand: "Alfa Romeo",
    model: "Giulietta",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1-sl4I08SvNDy4leVJyDGVj4c-ud975eW",
  },
  {
    // id: "4",
    index: 3,
    brand: "Alfa Romeo",
    model: "Giullia",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=11RvcxC3xb1wKvxbIkfIvbvweqBePlB-7",
  },
  {
    // id: "5",
    index: 4,
    brand: "Aston Martin",
    model: "DBX",
    price: "45,995",
    special: true,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1rSyB6xdr2b7GybVTNBxmY9dCZw1aPJvL",
  },
  {
    // id: "6",
    index: 5,
    brand: "Aston Martin",
    model: "V8 Vantage",
    price: "45,995",
    special: true,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1QnVkjEGpDNfYL1mqPRvYtaPz5PFYaPMP",
  },
  {
    // id: "7",
    index: 6,
    brand: "Audi",
    model: "A8",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1YdIkp6z3mKctdBgnryY2vfYVWAG5XD8V",
  },
  {
    // id: "7",
    index: 7,
    brand: "Audi",
    model: "RS 6",
    price: "45,995",
    special: true,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1c3lIzadkMEqtVyg17mCStR0bkMCOxfiQ",
  },
  {
    // id: "9",
    index: 8,
    brand: "Audi",
    model: "RS 7",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1EKyFHHjRA0Ou8SZFiIV3J7oIV58_Lmd7",
  },
  {
    //  id: "10",
    index: 9,
    brand: "Audi",
    model: "RS Q8",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1KM9jJAGnDx2_PaCSzrBXTBh3m7UniMA1",
  },
  {
    //  id: "11",
    index: 10,
    brand: "Bentley",
    model: "Continental GT",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1xLef1jnXWWBnDgT-dIumohe3OQCMt4Lq",
  },
  {
    // id: "12",
    index: 11,
    brand: "Bentley",
    model: "Continental GT",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1dJl9_kD4kNpfKE5Js30sbJUNVD1qjQtr",
  },
  {
    //  id: "13",
    index: 12,
    brand: "BMW",
    model: "M5",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1qmyXNe2nuj2KXGbAaPpu6h4xiWasN1HK",
  },
  {
    //  id: "14",
    index: 13,
    brand: "BMW",
    model: "M8",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1fciaONDocXBk1SoU0RJqgk6vp00Bw5AS",
  },
  {
    // id: "15",
    index: 14,
    brand: "BMW",
    model: "X5M",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1K_CFgXMgidDUU7_lz4_Mvcf4hewXcIB0",
  },
  {
    // id: "16",
    index: 15,
    brand: "BMW",
    model: "X7",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1HgKjfO9lT-8Ij5_aYjyV4IZROU0H63fG",
  },
  {
    // id: "17",
    index: 16,
    brand: "Ferrari",
    model: "296 GTB",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1ThvKUTPFHD3pIo6uoPKjJRXGl4R6H7n1",
  },
  {
    //id: "18",
    index: 17,
    brand: "Ferrari",
    model: "F8 Spider",
    price: "45,995",
    special: true,
    imageURL:
      "https://drive.google.com/uc?export=view&id=15Cs1DzkRp4fhQgXv7MrCMZ36YKH_qMQp",
  },
  {
    // id: "19",
    index: 18,
    brand: "Ferrari",
    model: "Rome",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=14qx3K0A7N6n1avws64k7PLVEHtkelnqt",
  },
  {
    //   id: "20",
    index: 19,
    brand: "Ford",
    model: "Mustang",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1-_9L8pYNWalEHuxJQZQMW5DF6jZfGTt2",
  },
  {
    // id: "21",
    index: 20,
    brand: "Ford",
    model: "Mustang Mach-E",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=109CJZqykg69n-QMuLmZnqmMAqGRSEX2b",
  },

  {
    // id: "22",
    index: 21,
    brand: "Infiniti",
    model: "Q60",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=17wd1cEiG7ZhAKe4rGmcjsSr7PvWFI4tB",
  },
  {
    // id: "23",
    index: 22,
    brand: "Infiniti",
    model: "QX 80",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1770lEPqjR7CEw2R3hI8OWx62tlsgq_Lj",
  },
  {
    // id: "24",
    index: 23,
    brand: "Jaguar",
    model: "F-Pace",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1MgK2Y7y_ZfRgUFwZ-dIEHdw5lMgqPAsk",
  },
  {
    // id: "25",
    index: 24,
    brand: "Jaguar",
    model: "I-Pace",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1PXKJTuapjzTTMQ8rCNJfM94kenb75mX7",
  },
  {
    // id: "26",
    index: 25,
    brand: "Jaguar",
    model: "F-Type",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1NuZv6b6moLMKRykXibVVgpq4xLTuaIHd",
  },
  {
    // id: "27",
    index: 26,
    brand: "Land Rover",
    model: "Defender 90",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1IjxNFmjv0-pV051IdG2mdRbVdzDQVmGR",
  },
  {
    // id: "28",
    index: 27,
    brand: "Land Rover",
    model: "Defender 110",
    price: "45,995",
    special: true,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1HoE607viEVUgNpp8JuD0A1dvUAfWK9r_",
  },
  {
    // id: "28",
    index: 28,
    brand: "Land Rover",
    model: "Range Rover P-360",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1LszDFNvRuO4kINfRRZ1a6uGOR9Sh14vr",
  },
  {
    // id: "30",
    index: 29,
    brand: "Land Rover",
    model: "Range Rover D-350",
    price: "45,995",
    special: true,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1Jlz8ZqEYlYnWMY-mM2E5oJz-y9itos1_",
  },
  {
    // id: "30",
    index: 30,
    brand: "Land Rover",
    model: "Range Rover P-530",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1KrKwIofyDVMw8n0mY4dTIkVfSck--Vdm",
  },
  {
    // id: "31",
    index: 31,
    brand: "Lexus",
    model: "LX 600",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1GB5SJJ4qMaRzDvuOrk1b2Ub3eQMowelp",
  },
  {
    // id: "32",
    index: 32,
    brand: "Lexus",
    model: "LX 600",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1Gz7Zhio3Pc_72cStlR0sZHYa7T1n208x",
  },
  {
    index: 33,
    // id: "33",
    brand: "Maserati",
    model: "Levante",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1RpAFTd13-_FczkTDIvN8-hgVBAbIqrnP",
  },
  {
    // id: "34",
    index: 34,
    brand: "Maserati",
    model: "MC20",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1SheYb6Q-gRus8MBYmqN3IIYrjaJfIXb4",
  },
  {
    // id: "35",
    index: 35,
    brand: "Maserati",
    model: "Quattroporte VI",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1TG54cmsTzJ4GArHhADZlDcMTJQGWHn_x",
  },
  {
    // id: "36",
    index: 36,
    brand: "Maybach",
    model: "62",
    price: "45,995",
    special: true,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1Po_m1y-9jxtdpRaYAtAXWQaxKXQ-nqfC",
  },
  {
    // id: "37",
    index: 37,
    brand: "Maybach",
    model: "S-Klasse 680",
    price: "45,995",
    special: true,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1QchIq3VAnPLOQULTQQtrO_l6G1oIwtQU",
  },
  {
    // id: "38",
    index: 38,
    brand: "Mercedes-Benz",
    model: "G63 AMG",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1VS0nCOMV6T32A3kTPUAV7Bi7XrMcdE5P",
  },
  {
    // id: "39",
    index: 39,
    brand: "Mercedes-Benz",
    model: "G63 AMG 4x4",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1X9WfUH9IxHlxXkzmTTShm2D9uT1dZ6J9",
  },
  {
    // id: "40",
    index: 40,
    brand: "Mercedes-Benz",
    model: "S-Klasse",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1WAoMnwmPpfedw8Dc_sa2tSVdNiYtPJGk",
  },
  {
    // id: "41",
    index: 41,
    brand: "Lexus",
    model: "LX 600",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1Gz7Zhio3Pc_72cStlR0sZHYa7T1n208x",
  },
  {
    // id: "42",
    index: 42,
    brand: "Nissan",
    model: "GT-R",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1V9oZQ_32Ld1hDNJIk-ndjkk2heJGZVp5",
  },
  {
    // id: "43",
    index: 43,
    brand: "Lexus",
    model: "LX 600",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1Gz7Zhio3Pc_72cStlR0sZHYa7T1n208x",
  },
  {
    // id: "44",
    index: 44,
    brand: "Porsche",
    model: "911 Turbo S",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=11gmRaUOgtQZpyXbm1sg8byXAfxfbSvzI",
  },
  {
    // id: "45",
    index: 45,
    brand: "Porsche",
    model: "Cayenne GTS",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=12qm1f7VIBq2yq8j6eFSgROGyPgkL1Qmd",
  },
  {
    // id: "46",
    index: 46,
    brand: "Rolls Royce",
    model: "Cullinan",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1LHbSJBzf3yv8li2fVpoQLzybtnUWMh0w",
  },

  {
    // id: "47",
    index: 47,
    brand: "Rolls Royce",
    model: "Phantom",
    price: "45,995",
    special: true,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1MHx-k_bW-TKuZ-oZYSYEW7IevRpg8SG8",
  },
  {
    // id: "48",
    index: 48,
    brand: "Tesla",
    model: "Model S Plaid",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1BHtUTfyx6Y8je0mbxgovL22SmX5hSWmT",
  },
  {
    // id: "49",
    index: 49,
    brand: "Tesla",
    model: "Model X",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1C8z0kDw8pnyZyuQGw8uUvlXxT2Hnnz4s",
  },
  {
    // id: "50",
    index: 50,
    brand: "Toyota",
    model: "Hilux Arctic",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1DgNYvQCn02NE4qGLjSseyHqnAakQBuqj",
  },
  {
    // id: "51",
    index: 51,
    brand: "Toyota",
    model: "Land Cruiser 300",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1D9eVIX2b49Oo-KcLVGPH7WWeAm1iK_oY",
  },
  {
    // id: "52",
    index: 52,
    brand: "Volkswagen",
    model: "Multivan",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1EC3Pt9Xfp45MpKSKQh8yV98pOG3fjAIu",
  },
  {
    // id: "53",
    index: 53,
    brand: "Volkswagen",
    model: "Touareg",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1DsTE0FMRpv1g6D1tPlQWGvxiYAMiu7aN",
  },
  {
    // id: "54",
    index: 54,
    brand: "Toyota",
    model: "Land Cruiser 300",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=1D9eVIX2b49Oo-KcLVGPH7WWeAm1iK_oY",
  },
  {
    // id: "55",
    index: 55,
    brand: "Volvo",
    model: "XC90",
    price: "45,995",
    special: false,
    imageURL:
      "https://drive.google.com/uc?export=view&id=16FG4iLmdq4LsfS505JDSObC0PI-8cJv6",
  },
];

export {cars};
