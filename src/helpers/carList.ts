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
  previewIMG: string;
  images: Array<string>;
}
const cars: Car[] = [
  {
    // id: "1",
    index: 0,
    brand: "Acura",
    model: "RDX white",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1J0uzIzF3RnSsI1ThP1uS3CHeBu5vg-zB",

    images: [
      "https://drive.google.com/uc?export=view&id=1vTzKi-oekLTWDU4tqWe2t9Yc3x23aR-m",
      "https://drive.google.com/uc?export=view&id=1MDVosGE6P9jFCnPQeOvnqyU9Hu6aVCcF",
      "https://drive.google.com/uc?export=view&id=16MUkJ99SqHi30-vKXStSzfTOkW8_Fkz_",
      "https://drive.google.com/uc?export=view&id=1lisX2D3fKqj93ct72KdVWZAaf_Dn2e7J",
      "https://drive.google.com/uc?export=view&id=1q7Ev_pkeM2hDrcKNfnP113HqqrPG-hCW",
    ],
  },
  {
    // id: "2",
    index: 1,
    brand: "Acura",
    model: "TLX BLue",
    price: "47,831",
    special: true,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1scexrpd4inlsgirsRTdztWRkEbZIF765",
    images: [
      "https://drive.google.com/uc?export=view&id=19QToxZgjYI3qXpEygnebrEVCPEBwjuDh",
      "https://drive.google.com/uc?export=view&id=1awKvvbNba_6uu2Mg47vi-T5Pi9pGJCWy",
      "https://drive.google.com/uc?export=view&id=1z6Z9CLgkU_ohKDaYD4kzZa4qPJLGsmV9",
      "https://drive.google.com/uc?export=view&id=1yKvyBkaGIFL75psbinBfxhOT3NJmjxk8",
      "https://drive.google.com/uc?export=view&id=15YYSGaaGwuCo5Wy8amOAERot8LqllKxg",
    ],
  },
  {
    // id: "3",
    index: 2,
    brand: "Alfa Romeo",
    model: "Giulietta",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1-sl4I08SvNDy4leVJyDGVj4c-ud975eW",
    images: [
      "https://drive.google.com/uc?export=view&id=1nEzhYe2XID4_RZ7Gunmi6n5jxMVNN6IO",
      "https://drive.google.com/uc?export=view&id=1oDAzQPD9oEWFtgzqbfB3iKU8ahjaSRdv",
      "https://drive.google.com/uc?export=view&id=15Iob5u1v7KWygFEuqJpTq6pGOpeFkQZh",
      "https://drive.google.com/uc?export=view&id=1Qd_WV_Ja8ZP2fgaD-lYxy4tmM7DrD4W9",
      "https://drive.google.com/uc?export=view&id=1Q8qV974EcLzkkRAUIzuKfHfSFLg7N24Z",
      "https://drive.google.com/uc?export=view&id=1r291JoLvqHR8oWjBVm8Cle0PB4Dx5RZ2",
    ],
  },
  {
    // id: "4",
    index: 3,
    brand: "Alfa Romeo",
    model: "Giullia",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=11RvcxC3xb1wKvxbIkfIvbvweqBePlB-7",
    images: [
      "https://drive.google.com/uc?export=view&id=1zsFSGKP7ZAmRntFndhy-0FVvZjqYqz8b",
      "https://drive.google.com/uc?export=view&id=1FseQAZYF85XIzood0B9BODQMeOVq6FC4",
      "https://drive.google.com/uc?export=view&id=100hnP0jckOzR9BTXuWEllnZLxkMjz6Pv",
      "https://drive.google.com/uc?export=view&id=1HJI9UWwVY3cCuc1qAebC3ogCXb-Ax1qq",
      "https://drive.google.com/uc?export=view&id=1eRkhU_2FXLOCC39Fr6S7v_Hkk6ARXTVI",
    ],
  },
  {
    // id: "5",
    index: 4,
    brand: "Aston Martin",
    model: "DBX",
    price: "45,995",
    special: true,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1rSyB6xdr2b7GybVTNBxmY9dCZw1aPJvL",
    images: [
      "https://drive.google.com/uc?export=view&id=1A1m1vKxfr-KuQ25WiqLKE_NMzDObuQPP",
      "https://drive.google.com/uc?export=view&id=1H--ajWtb3XkugLxZ1m0uG8tlFfIHQTV9",
      "https://drive.google.com/uc?export=view&id=1XBSxUlRWEo37A4MV5XmhhkaPkGVMIHRE",
      "https://drive.google.com/uc?export=view&id=1ztczoeNV6LnWxJd1klISL-C3Qy8gCh8N",
      "https://drive.google.com/uc?export=view&id=1iOsjYsvkOml5RcfGmZzSbDAv3lOB7lLr",
    ],
  },
  {
    // id: "6",
    index: 5,
    brand: "Aston Martin",
    model: "V8 Vantage",
    price: "45,995",
    special: true,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1QnVkjEGpDNfYL1mqPRvYtaPz5PFYaPMP",
    images: [
      "https://drive.google.com/uc?export=view&id=1AuJPIkyDN5K6s3eKDiY9npDLXvaZZdqi",
      "https://drive.google.com/uc?export=view&id=1HGmJJcXsMOIqz-Ki4OxgwlfJaXwJxZWq",
      "https://drive.google.com/uc?export=view&id=1PUNBy-bvTpZ_NvP5_zhRHkavrYuOT62r",
      "https://drive.google.com/uc?export=view&id=1SyppPiS5CyqThxbyoTahlCKMjDvKDYFn",
      "https://drive.google.com/uc?export=view&id=1yzzx-sKDxdGHbPXLV5VGh8Ttiq-OTK2q",
      "https://drive.google.com/uc?export=view&id=1A_WGEeaoBPCmqeMOBKNGYw4lYmmObwry",
    ],
  },
  {
    // id: "7",
    index: 6,
    brand: "Audi",
    model: "A8",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1YdIkp6z3mKctdBgnryY2vfYVWAG5XD8V",
    images: [
      "https://drive.google.com/uc?export=view&id=15I0TFK17fDYTgftLKgfcnU97CQLIXiyx",
      "https://drive.google.com/uc?export=view&id=1t86E1xVb0o5X6LMdTSVHYXHONK8LSTUz",
      "https://drive.google.com/uc?export=view&id=1K0mWEaD7Rfl1n977Pn25LsIUKSE1WMnN",
      "https://drive.google.com/uc?export=view&id=1w4EcZoeuzuxzjMUj6lrIs4qfykC9ujAI",
      "https://drive.google.com/uc?export=view&id=1fmoGfb8UxIXEsXR8Xs5RcS_b49E1bR1t",
      "https://drive.google.com/uc?export=view&id=1I3CmI1WDX6an0LTkxweQY4Vb0Enbpm4y",
    ],
  },
  {
    // id: "7",
    index: 7,
    brand: "Audi",
    model: "RS 6",
    price: "45,995",
    special: true,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1c3lIzadkMEqtVyg17mCStR0bkMCOxfiQ",
    images: [
      "https://drive.google.com/uc?export=view&id=1EAAsT_9Yk6novS380xjbCd0npGV79BgM",
      "https://drive.google.com/uc?export=view&id=1nkhJwMuPWMEWqTbYbTPBiEk7Ya3SqvSt",
      "https://drive.google.com/uc?export=view&id=1SvyiNy0OL-S4YMp3IU5CZ7tPw5pGFw2N",
      "https://drive.google.com/uc?export=view&id=18yF5bBkh-PKg4b8Aon0oWmDepQ5hAjnL",
      "https://drive.google.com/uc?export=view&id=16DiJ6x4Tks-UD2zRr32OVx-CbFIqOjNU",
      "https://drive.google.com/uc?export=view&id=1OJhR9PdCoNexWJf7rG8mWdi0nRA1aM6O",
    ],
  },
  {
    // id: "9",
    index: 8,
    brand: "Audi",
    model: "RS 7",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1EKyFHHjRA0Ou8SZFiIV3J7oIV58_Lmd7",

    images: [
      "https://drive.google.com/uc?export=view&id=1oKb-KcNWgltmC1JRh8NpaGjWoyMJ8eNP",
      "https://drive.google.com/uc?export=view&id=17Ip4-pwKULkVge_NRtrGLGSwx-7-HcOT",
      "https://drive.google.com/uc?export=view&id=1Kup3ac0HETfIn2pZH7jw16O8Yia0rlfZ",
      "https://drive.google.com/uc?export=view&id=1TU7KvfzLi6AKG7_cBVItihFY10udDAp1",
    ],
  },
  {
    //  id: "10",
    index: 9,
    brand: "Audi",
    model: "RS Q8",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1KM9jJAGnDx2_PaCSzrBXTBh3m7UniMA1",

    images: [
      "https://drive.google.com/uc?export=view&id=1byd96oIJ_bnLxNqzp7ZrmfCe7l6dtlDU",
      "https://drive.google.com/uc?export=view&id=1nUnsPu3iQfxh86dWktw57AhkVYpvJjqw",
      "https://drive.google.com/uc?export=view&id=1IJF6By7XMhPvzgoyja5QfsRLLmd57FHq",
      "https://drive.google.com/uc?export=view&id=1Le-bByHr9VsXg54FKZcwOXNwF6aAd464",
      "https://drive.google.com/uc?export=view&id=1Zsg_B21HEb2vfrvjHqFc_-b2DK9NV-RP",
      "https://drive.google.com/uc?export=view&id=1cTV8xDavO9dO9jAP8bHpMADKoZxC4-fO",
    ],
  },
  {
    //  id: "11",
    index: 10,
    brand: "Bentley",
    model: "Continental GT",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1xLef1jnXWWBnDgT-dIumohe3OQCMt4Lq",
    images: [
      "https://drive.google.com/uc?export=view&id=1adk6QePVxIyOJkOy4Ef6vSZkdXez3ahx",
      "https://drive.google.com/uc?export=view&id=1RiFGgEFex_jpUsQ2f9j1DuDol6gsYYXx",
      "https://drive.google.com/uc?export=view&id=1emN0BlpgxRg7uJZGSuAag8mfppExWxkE",
      "https://drive.google.com/uc?export=view&id=1HAfGbQRpBqg8qZ9T-8dPOMK0REZC1R3E",
      "https://drive.google.com/uc?export=view&id=1_zm9piZEziE2OH_JkXpe_Dc0x34IcLh-",
      "https://drive.google.com/uc?export=view&id=1PF9zCkMy0icCLVgfyxNc2IePkFwMsm-T",
    ],
  },
  {
    // id: "12",
    index: 11,
    brand: "Bentley",
    model: "Continental GT",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1dJl9_kD4kNpfKE5Js30sbJUNVD1qjQtr",
    images: [
      "https://drive.google.com/uc?export=view&id=1BSdF57ZTPrF2eMhfBvSYKlCMlRpPfir3",
      "https://drive.google.com/uc?export=view&id=1xNICBEzR3J8Bk0Ht3ORg5_9MtK8TaF0b",
      "https://drive.google.com/uc?export=view&id=1oKW-nmb4fM3oiooIPtrH66se19hROVwH",
      "https://drive.google.com/uc?export=view&id=1EcgCt8bmvgdSAdgzeAGXOZd6HXydAosL",
      "https://drive.google.com/uc?export=view&id=17ZfIu78aMPkq0M9UAz9NJIHXE86Z4khf",
      "https://drive.google.com/uc?export=view&id=1-Q7Ffgh3HRr9jRiBxJ1vkAxzTh2IQCxe",
      "https://drive.google.com/uc?export=view&id=1aV9MboNirRKleXB2quRTRrerNrPo8Hhx",
    ],
  },
  {
    //  id: "13",
    index: 12,
    brand: "BMW",
    model: "M5",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1qmyXNe2nuj2KXGbAaPpu6h4xiWasN1HK",
    images: [
      "https://drive.google.com/uc?export=view&id=1E23hSwEQKmLIrW-BNF1Zo5AA9n2o2ZRF",
      "https://drive.google.com/uc?export=view&id=1kQjt2HRgitsKrC6JaBAyQx3mjnm-eRDB",
      "https://drive.google.com/uc?export=view&id=1hlK3RbnziFj9V6nPTCeH4Xr41fWEIzmU",
      "https://drive.google.com/uc?export=view&id=1ZhwwjnKiwfJydJGL8aOTthvIuubV2YEN",
      "https://drive.google.com/uc?export=view&id=1dET97ChmTdnwwtW87-0t_WKPXD8sj1Rv",
      "https://drive.google.com/uc?export=view&id=1wAaWCnlsr52l1vLAx1PuHwvUdFVYn7xq",
      "https://drive.google.com/uc?export=view&id=1RtWjkrMgJjwYrrstPcTs-CtI7NXq19Ie",
    ],
  },
  {
    //  id: "14",
    index: 13,
    brand: "BMW",
    model: "M8",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1fciaONDocXBk1SoU0RJqgk6vp00Bw5AS",
    images: [
      "https://drive.google.com/uc?export=view&id=19VYLIeh_dURnrucL4iCyCZ0cWVnHZxJx",
      "https://drive.google.com/uc?export=view&id=17TWWWLvaukWIgSZLV14lclg20n2EWaDs",
      "https://drive.google.com/uc?export=view&id=1m4WmYYrOX07Zlaj-L6uEuk_hmtHN0MWE",
      "https://drive.google.com/uc?export=view&id=129xWWbK05GTAdLSlDCVCDX6B_9JKRRhT",
      "https://drive.google.com/uc?export=view&id=1g2tgOs5hwd_vKQvRDNWLfCo9H-9Nl0nn",
    ],
  },
  {
    // id: "15",
    index: 14,
    brand: "BMW",
    model: "X5M",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1K_CFgXMgidDUU7_lz4_Mvcf4hewXcIB0",
    images: [
      "https://drive.google.com/uc?export=view&id=11XsmLU9ICOWEfSel_BNLWZZXHkLTpU_R",
      "https://drive.google.com/uc?export=view&id=1EGCr2idXKQNHLd4U_dNBytKO7VYZQFIa",
      "https://drive.google.com/uc?export=view&id=1EtqKIrkfY1o6xvtA0BiJgmzowRrhGkPJ",
      "https://drive.google.com/uc?export=view&id=1bJgq3LdOdqAMlSvIAsl45IPxjR1J4BVS",
      "https://drive.google.com/uc?export=view&id=1Pv_P9EJXezKSFcqfeF8orj0vYdcT1QBz",

      "https://drive.google.com/uc?export=view&id=1YgAMtZBUKd0_IDAOA6dDCAAK9oSnCteg",
      "https://drive.google.com/uc?export=view&id=1zV71S5rJ25Yy-0-H8cRlp1uhQsfccp1E",
    ],
  },
  {
    // id: "16",
    index: 15,
    brand: "BMW",
    model: "X7",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1HgKjfO9lT-8Ij5_aYjyV4IZROU0H63fG",
    images: [
      "https://drive.google.com/uc?export=view&id=1XISXhcyPdIQNUVEr9864s5XagXnea4wa",
      "https://drive.google.com/uc?export=view&id=1dTChYo3QxC1RgnIn12EyTzZE112uCtqz",
      "https://drive.google.com/uc?export=view&id=1eTfJCtVFU9ARMvJkLV2qg4QW0tqjg_Hr",
      "https://drive.google.com/uc?export=view&id=1qRHIYmCHQSlXGcaJRoGAoPuuDou8DiBT",
      "https://drive.google.com/uc?export=view&id=1zMSGQ4Cph540esl415cGcW-6kdKS9UJF",
      "https://drive.google.com/uc?export=view&id=1-tuIi2kUAaQWc8Da4aSY8NAA79gcvvWP",
      "https://drive.google.com/uc?export=view&id=1RXmvtUZ15i9VScZgBo0YRafFj2mdUMo5",
      "https://drive.google.com/uc?export=view&id=1eaMEbS2kTOhNBr6pg9rpYBf_ufKqqh-c",
    ],
  },
  {
    // id: "17",
    index: 16,
    brand: "Ferrari",
    model: "296 GTB",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1ThvKUTPFHD3pIo6uoPKjJRXGl4R6H7n1",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    //id: "18",
    index: 17,
    brand: "Ferrari",
    model: "F8 Spider",
    price: "45,995",
    special: true,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=15Cs1DzkRp4fhQgXv7MrCMZ36YKH_qMQp",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "19",
    index: 18,
    brand: "Ferrari",
    model: "Rome",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=14qx3K0A7N6n1avws64k7PLVEHtkelnqt",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    //   id: "20",
    index: 19,
    brand: "Ford",
    model: "Mustang",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1-_9L8pYNWalEHuxJQZQMW5DF6jZfGTt2",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "21",
    index: 20,
    brand: "Ford",
    model: "Mustang Mach-E",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=109CJZqykg69n-QMuLmZnqmMAqGRSEX2b",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },

  {
    // id: "22",
    index: 21,
    brand: "Infiniti",
    model: "Q60",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=17wd1cEiG7ZhAKe4rGmcjsSr7PvWFI4tB",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "23",
    index: 22,
    brand: "Infiniti",
    model: "QX 80",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1770lEPqjR7CEw2R3hI8OWx62tlsgq_Lj",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "24",
    index: 23,
    brand: "Jaguar",
    model: "F-Pace",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1MgK2Y7y_ZfRgUFwZ-dIEHdw5lMgqPAsk",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "25",
    index: 24,
    brand: "Jaguar",
    model: "I-Pace",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1PXKJTuapjzTTMQ8rCNJfM94kenb75mX7",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "26",
    index: 25,
    brand: "Jaguar",
    model: "F-Type",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1NuZv6b6moLMKRykXibVVgpq4xLTuaIHd",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "27",
    index: 26,
    brand: "Land Rover",
    model: "Defender 90",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1IjxNFmjv0-pV051IdG2mdRbVdzDQVmGR",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "28",
    index: 27,
    brand: "Land Rover",
    model: "Defender 110",
    price: "45,995",
    special: true,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1HoE607viEVUgNpp8JuD0A1dvUAfWK9r_",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "28",
    index: 28,
    brand: "Land Rover",
    model: "Range Rover P-360",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1LszDFNvRuO4kINfRRZ1a6uGOR9Sh14vr",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "30",
    index: 29,
    brand: "Land Rover",
    model: "Range Rover D-350",
    price: "45,995",
    special: true,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1Jlz8ZqEYlYnWMY-mM2E5oJz-y9itos1_",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "30",
    index: 30,
    brand: "Land Rover",
    model: "Range Rover P-530",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1KrKwIofyDVMw8n0mY4dTIkVfSck--Vdm",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "31",
    index: 31,
    brand: "Lexus",
    model: "LX 600",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1GB5SJJ4qMaRzDvuOrk1b2Ub3eQMowelp",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "32",
    index: 32,
    brand: "Lexus",
    model: "LX 600",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1Gz7Zhio3Pc_72cStlR0sZHYa7T1n208x",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    index: 33,
    // id: "33",
    brand: "Maserati",
    model: "Levante",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1RpAFTd13-_FczkTDIvN8-hgVBAbIqrnP",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "34",
    index: 34,
    brand: "Maserati",
    model: "MC20",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1SheYb6Q-gRus8MBYmqN3IIYrjaJfIXb4",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "35",
    index: 35,
    brand: "Maserati",
    model: "Quattroporte VI",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1TG54cmsTzJ4GArHhADZlDcMTJQGWHn_x",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "36",
    index: 36,
    brand: "Maybach",
    model: "62",
    price: "45,995",
    special: true,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1Po_m1y-9jxtdpRaYAtAXWQaxKXQ-nqfC",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "37",
    index: 37,
    brand: "Maybach",
    model: "S-Klasse 680",
    price: "45,995",
    special: true,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1QchIq3VAnPLOQULTQQtrO_l6G1oIwtQU",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "38",
    index: 38,
    brand: "Mercedes-Benz",
    model: "G63 AMG",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1VS0nCOMV6T32A3kTPUAV7Bi7XrMcdE5P",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "39",
    index: 39,
    brand: "Mercedes-Benz",
    model: "G63 AMG 4x4",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1X9WfUH9IxHlxXkzmTTShm2D9uT1dZ6J9",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "40",
    index: 40,
    brand: "Mercedes-Benz",
    model: "S-Klasse",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1WAoMnwmPpfedw8Dc_sa2tSVdNiYtPJGk",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "41",
    index: 41,
    brand: "Lexus",
    model: "LX 600",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1Gz7Zhio3Pc_72cStlR0sZHYa7T1n208x",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "42",
    index: 42,
    brand: "Nissan",
    model: "GT-R",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1V9oZQ_32Ld1hDNJIk-ndjkk2heJGZVp5",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "43",
    index: 43,
    brand: "Lexus",
    model: "LX 600",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1Gz7Zhio3Pc_72cStlR0sZHYa7T1n208x",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "44",
    index: 44,
    brand: "Porsche",
    model: "911 Turbo S",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=11gmRaUOgtQZpyXbm1sg8byXAfxfbSvzI",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "45",
    index: 45,
    brand: "Porsche",
    model: "Cayenne GTS",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=12qm1f7VIBq2yq8j6eFSgROGyPgkL1Qmd",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "46",
    index: 46,
    brand: "Rolls Royce",
    model: "Cullinan",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1LHbSJBzf3yv8li2fVpoQLzybtnUWMh0w",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },

  {
    // id: "47",
    index: 47,
    brand: "Rolls Royce",
    model: "Phantom",
    price: "45,995",
    special: true,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1MHx-k_bW-TKuZ-oZYSYEW7IevRpg8SG8",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "48",
    index: 48,
    brand: "Tesla",
    model: "Model S Plaid",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1BHtUTfyx6Y8je0mbxgovL22SmX5hSWmT",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "49",
    index: 49,
    brand: "Tesla",
    model: "Model X",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1C8z0kDw8pnyZyuQGw8uUvlXxT2Hnnz4s",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "50",
    index: 50,
    brand: "Toyota",
    model: "Hilux Arctic",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1DgNYvQCn02NE4qGLjSseyHqnAakQBuqj",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "51",
    index: 51,
    brand: "Toyota",
    model: "Land Cruiser 300",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1D9eVIX2b49Oo-KcLVGPH7WWeAm1iK_oY",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "52",
    index: 52,
    brand: "Volkswagen",
    model: "Multivan",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1EC3Pt9Xfp45MpKSKQh8yV98pOG3fjAIu",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "53",
    index: 53,
    brand: "Volkswagen",
    model: "Touareg",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1DsTE0FMRpv1g6D1tPlQWGvxiYAMiu7aN",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "54",
    index: 54,
    brand: "Toyota",
    model: "Land Cruiser 300",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1D9eVIX2b49Oo-KcLVGPH7WWeAm1iK_oY",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
  {
    // id: "55",
    index: 55,
    brand: "Volvo",
    model: "XC90",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=16FG4iLmdq4LsfS505JDSObC0PI-8cJv6",
    images: [
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/uc?export=view&id=",
    ],
  },
];

export {cars};
