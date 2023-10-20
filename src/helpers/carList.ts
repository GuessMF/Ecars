// import {getStorage, ref} from "firebase/storage";

// // Create a reference with an initial file path and name
// const storage = getStorage();
// const pathReference = ref(storage, "images/stars.jpg");

// // Create a reference from a Google Cloud Storage URI
// const gsReference = ref(storage, "gs://bucket/images/stars.jpg");

// // Create a reference from an HTTPS URL
// // Note that in the URL, characters are URL escaped!
// const httpsReference = ref(
//   storage,
//   "https://firebasestorage.googleapis.com/b/bucket/o/images%20stars.jpg"
// );
// Note: using explicit types like `Auth.GoogleAuth` are only here for
// demonstration purposes.  Generally with TypeScript, these types would
// be inferred.
//const auth: Auth.GoogleAuth = new google.auth.GoogleAuth();
// const drive: drive_v3.Drive = google.drive({
//   version: "v3",
//   auth,
// });

// import {google} from "googleapis";
// const auth = new google.auth.GoogleAuth({
//   keyFile: "./googleAPI.json",
//   scopes: ["https://www.googleapis.com/auth/drive.readonly"],
// });

// const drive = google.drive({version: "v3", auth});

// async function getDriveFiles() {
//   try {
//     const response = await drive.files.list({
//       q: "'папка_id' in parents", // Укажите ID папки, в которой хранятся ваши фотографии
//     });

//     const files = response.data.files;
//     const imageLinks: string[] = [];

//     if (files && files.length) {
//       files.forEach((file) => {
//         const fileId = file.id;
//         const imageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
//         imageLinks.push(imageUrl);
//       });
//     }

//     // Теперь у вас есть массив imageLinks с URL-адресами изображений
//     console.log(imageLinks);
//   } catch (error) {
//     console.error("Ошибка получения данных из Google Drive:", error);
//   }
// }

// Вызовите функцию для получения данных из Google Drive
//

interface Car {
  index: number;
  brand: string;
  model: string;
  price: string;
  special: boolean;
  previewIMG: string;
  images: Array<string>;
}
console.log("hello");
const cars: Car[] = [
  {
    // id: "1",
    index: 0,
    brand: "Acura",
    model: "RDX white",
    price: "45,995",
    special: false,
    previewIMG:
      "https://drive.google.com/uc?export=view&id=1vTzKi-oekLTWDU4tqWe2t9Yc3x23aR-m",

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
      "https://drive.google.com/uc?export=view&id=19QToxZgjYI3qXpEygnebrEVCPEBwjuDh",
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
      "https://drive.google.com/uc?export=view&id=1nEzhYe2XID4_RZ7Gunmi6n5jxMVNN6IO",
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
      "https://drive.google.com/uc?export=view&id=1zsFSGKP7ZAmRntFndhy-0FVvZjqYqz8b",
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
      "https://drive.google.com/uc?export=view&id=1A1m1vKxfr-KuQ25WiqLKE_NMzDObuQPP",
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
      "https://drive.google.com/uc?export=view&id=1AuJPIkyDN5K6s3eKDiY9npDLXvaZZdqi",
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
      "https://drive.google.com/uc?export=view&id=15I0TFK17fDYTgftLKgfcnU97CQLIXiyx",
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
      "https://drive.google.com/uc?export=view&id=1EAAsT_9Yk6novS380xjbCd0npGV79BgM",
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
      "https://drive.google.com/uc?export=view&id=1oKb-KcNWgltmC1JRh8NpaGjWoyMJ8eNP",

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
      "https://drive.google.com/uc?export=view&id=1byd96oIJ_bnLxNqzp7ZrmfCe7l6dtlDU",

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
      "https://drive.google.com/uc?export=view&id=1adk6QePVxIyOJkOy4Ef6vSZkdXez3ahx",
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
      "https://drive.google.com/uc?export=view&id=1BSdF57ZTPrF2eMhfBvSYKlCMlRpPfir3",
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
      "https://drive.google.com/uc?export=view&id=1E23hSwEQKmLIrW-BNF1Zo5AA9n2o2ZRF",
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
      "https://drive.google.com/uc?export=view&id=19VYLIeh_dURnrucL4iCyCZ0cWVnHZxJx",
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
      "https://drive.google.com/uc?export=view&id=11XsmLU9ICOWEfSel_BNLWZZXHkLTpU_R",
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
      "https://drive.google.com/uc?export=view&id=1XISXhcyPdIQNUVEr9864s5XagXnea4wa",
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
      "https://drive.google.com/uc?export=view&id=1BkvYi_KJOoqc-RmnD10bcFC9QL6lZdru",
    images: [
      "https://drive.google.com/uc?export=view&id=1BkvYi_KJOoqc-RmnD10bcFC9QL6lZdru",
      "https://drive.google.com/uc?export=view&id=1EHU9xjfQhwjc-4kap3oWJ-ivtgd2p6Mi",
      "https://drive.google.com/uc?export=view&id=1D44O_VI-e2kPQuX7-Mgs260C3w0LUcu6",
      "https://drive.google.com/uc?export=view&id=1mSVo2CSDoHE6tDsIfndrqbIEZz2rNeIm",
      "https://drive.google.com/uc?export=view&id=1E8qA9hJGAW1su2Ziyoj-s_aCXxOsegdJ",
      "https://drive.google.com/uc?export=view&id=1tcYrcrswH21TK9jN_q_lobRHAKO8Qtk4",
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
      "https://drive.google.com/uc?export=view&id=1b2RCk3C8-Ahr76kseWuyaPi5qa8EHNkl",
    images: [
      "https://drive.google.com/uc?export=view&id=1b2RCk3C8-Ahr76kseWuyaPi5qa8EHNkl",
      "https://drive.google.com/uc?export=view&id=1LWnpRrm0Fdno7hD9DBlSiMpG_H6836vn",
      "https://drive.google.com/uc?export=view&id=1__gPrDzbDe_F811mJ-0BnyVqOpw3-96S",
      "https://drive.google.com/uc?export=view&id=1p5bTVgC7nUV01nx9j2w1EMg88D-sWr8p",
      "https://drive.google.com/uc?export=view&id=1SX71H4Zccy3wMVs8oiuIHhKEDgObqZsG",
      "https://drive.google.com/uc?export=view&id=1xhpWrja7C9Sx4zNpZ7V3SnDurP-Jb66u",
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
      "https://drive.google.com/uc?export=view&id=1uN2z1QwGksoQnTPQq2g0Aix_PTzP38ca",
    images: [
      "https://drive.google.com/uc?export=view&id=1uN2z1QwGksoQnTPQq2g0Aix_PTzP38ca",
      "https://drive.google.com/uc?export=view&id=1iualwe9ly60XVUGiKAB6FCPw-HnBOGnP",
      "https://drive.google.com/uc?export=view&id=1aLugV4mWIu_IOEFFjwkHZ555zVwx1Pgh",
      "https://drive.google.com/uc?export=view&id=1zLUirb7PmVTECIYbwth_nE0v_H8fm5Vz",
      "https://drive.google.com/uc?export=view&id=1WuFpvznGc1nqxvwzw8YqBHp8HrnYsof0",
      "https://drive.google.com/uc?export=view&id=1WYYRz4erw-dtDVYFb7dO3ZMlDpfEBLGF",
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
      "https://drive.google.com/uc?export=view&id=106TLWUtQS43HsFxI62V9xYEooGhaduaR",
    images: [
      "https://drive.google.com/uc?export=view&id=106TLWUtQS43HsFxI62V9xYEooGhaduaR",
      "https://drive.google.com/uc?export=view&id=103fRhqLyz0fyjQgQIldJU9OGI4ToKiwU",
      "https://drive.google.com/uc?export=view&id=100jVGcxPNv3TeryMPQi5urBPruV0dXRM",
      "https://drive.google.com/uc?export=view&id=1-k4Gz9PLeSo2bDVsa0rmpyBGeyshkUx3",
      "https://drive.google.com/uc?export=view&id=1-wdG-BIXDHdswOu5AZP63-tBP4or3ijv",
      "https://drive.google.com/uc?export=view&id=1-jkPXZ8-OGEFWXM5VtIxqcqFW2l7Gm4B",
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
      "https://drive.google.com/uc?export=view&id=1-GunQIQ-rwmc-Le4_5hG3BFU-BZYXPjG",
    images: [
      "https://drive.google.com/uc?export=view&id=1-GunQIQ-rwmc-Le4_5hG3BFU-BZYXPjG",
      "https://drive.google.com/uc?export=view&id=10VWJWCTRF_SHf5aRvGTeoz8cgdLR7taq",
      "https://drive.google.com/uc?export=view&id=10Wq_l3So574kSzDCTF8-zPheDgbdF8qU",
      "https://drive.google.com/uc?export=view&id=10S6DB4khkGgcsRNoHuPcC730wDmklnix",
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
      "https://drive.google.com/uc?export=view&id=15dE2dXCJzUYfqDrN-ldi7p078mt1TJBj",
    images: [
      "https://drive.google.com/uc?export=view&id=15dE2dXCJzUYfqDrN-ldi7p078mt1TJBj",
      "https://drive.google.com/uc?export=view&id=18LviU4__xPDfHQN-fkHvSou5oyQXmoXg",
      "https://drive.google.com/uc?export=view&id=18L94QoRnhL0zHcdJWfoHUbxkC_n9fFXT",
      "https://drive.google.com/uc?export=view&id=18FUyPG3JI2pIUAT4fRJPpFyiajvabzPk",
      "https://drive.google.com/uc?export=view&id=18C6Hn5Ear9y694ccj6Sf98e0uauiGKbR",
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
      "https://drive.google.com/uc?export=view&id=17OUZ0C570pcnbOY03v1TBFkJTHnUP77c",
    images: [
      "https://drive.google.com/uc?export=view&id=17OUZ0C570pcnbOY03v1TBFkJTHnUP77c",
      "https://drive.google.com/uc?export=view&id=17MeblSdSxtE2jdG6X-_eP63IkGKkqGZ_",
      "https://drive.google.com/uc?export=view&id=17e9RmZsaIGiq_HeUm7IlLhAUeBP74pIc",
      "https://drive.google.com/uc?export=view&id=17dqeMZ3ZTgV8wySgY3x39kZW9wAlsmVP",
      "https://drive.google.com/uc?export=view&id=17ZpbHiudy1brg8Kqh4mryKdFxoJCtZMM",
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
      "https://drive.google.com/uc?export=view&id=1NMULw4MlUeX3h_iDGhPaFfKs2Mo6obsm",
    images: [
      "https://drive.google.com/uc?export=view&id=1NMULw4MlUeX3h_iDGhPaFfKs2Mo6obsm",
      "https://drive.google.com/uc?export=view&id=1N9WwhO0oPTyBEGoZ9Ju_UsJkUdygs3rk",
      "https://drive.google.com/uc?export=view&id=1N8BMwjb9u3pjNnlyoAG72rNWhAN4ENdb",
      "https://drive.google.com/uc?export=view&id=1N3iJN-xgphEM4C9PeryT9O4cgyDkuAOA",
      "https://drive.google.com/uc?export=view&id=1MuzcbpW4-nbESi_NXfu0Azcc9VtIpjs2",
      "https://drive.google.com/uc?export=view&id=1NMW6AgYxTgAGRHAnplqFusssTjYD6qL1",
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
      "https://drive.google.com/uc?export=view&id=1NZZNRYjwXAGJPWXvFXcWguNiTWoqvUOs",
    images: [
      "https://drive.google.com/uc?export=view&id=1NZZNRYjwXAGJPWXvFXcWguNiTWoqvUOs",
      "https://drive.google.com/uc?export=view&id=1PbNiCcyLkmSjaEPOma1k_FrTyGVLKO0Z",
      "https://drive.google.com/uc?export=view&id=1NVqkhYT7DoyFhoXshr1m6hD2BXxJelFp",
      "https://drive.google.com/uc?export=view&id=1NaCsGqy6omicoTt7Xyc3oBk2qsm7u7vT",
      "https://drive.google.com/uc?export=view&id=1NQ8iy_TRBaW-aF4HVikd66g88EY8euI3",
      "https://drive.google.com/uc?export=view&id=1P_exGMMGbD_X9jznBJK1_yjM05H_aQ63",
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
      "https://drive.google.com/uc?export=view&id=1OSLnX7OWktd6tubM3lIFYvvTVV27ICWb",
    images: [
      "https://drive.google.com/uc?export=view&id=1OSLnX7OWktd6tubM3lIFYvvTVV27ICWb",
      "https://drive.google.com/uc?export=view&id=1OTX-R-H_wjkprxijT2OchYssi_GAVqb3",
      "https://drive.google.com/uc?export=view&id=1OO0gOhO5SBIl_1V8Pw4m65v66pGmekXC",
      "https://drive.google.com/uc?export=view&id=1MW1XLztSyOf7-yR9DErhfuvRwCC-I03B",
      "https://drive.google.com/uc?export=view&id=1O_pbllAw30LMmvUbPabUjhbs-u2j30Bl",
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
      "https://drive.google.com/uc?export=view&id=1InSlNSR6ibPdJSKPSuw2xgo4442IIzMS",
    images: [
      "https://drive.google.com/uc?export=view&id=1InSlNSR6ibPdJSKPSuw2xgo4442IIzMS",
      "https://drive.google.com/uc?export=view&id=1HW7Z-y7tTcluIwnVOkcrsTHDAjL5B285",
      "https://drive.google.com/uc?export=view&id=1HJ6FrY6Etnqrng-CjiXcRjkBLzvQyZqA",
      "https://drive.google.com/uc?export=view&id=1HZS0gEwWmv8xFYgng-2haSE6wQG2Rpvl",
      "https://drive.google.com/uc?export=view&id=1HWi1mpWtAJ7lcDtT2nLNDj3R6t3rMvv8",
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
      "https://drive.google.com/uc?export=view&id=1I3J9_04zMabXz51spGegCqqr6SpswH0b",
    images: [
      "https://drive.google.com/uc?export=view&id=1HvPcCBJVZZagU0rCo81o6wP_YqQFULUk",
      "https://drive.google.com/uc?export=view&id=1Hyu_9xGNn2WedKNNWKOzTkCWR4aWUo4-",
      "https://drive.google.com/uc?export=view&id=1HxGL5xCi-7ijbPj9BbEkkAOonS6O1nfs",
      "https://drive.google.com/uc?export=view&id=1I3s5sdzCfLJzFLsBxhZT9aZadEzIn5tq",
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
      "https://drive.google.com/uc?export=view&id=1KJoueH1-x9X_mWD3UjWAiUt-tsYo1m52",
    images: [
      "https://drive.google.com/uc?export=view&id=1KJoueH1-x9X_mWD3UjWAiUt-tsYo1m52",
      "https://drive.google.com/uc?export=view&id=1KQpOOskVnxqKKQIhRoX3Fam6ZI_eXf8n",
      "https://drive.google.com/uc?export=view&id=1K285AYxxEVh3_rYTfcgNhOGqaXCqCXRg",
      "https://drive.google.com/uc?export=view&id=1KHmf6M1nobH4LJLaAFamEr_phFEOwsYV",
      "https://drive.google.com/uc?export=view&id=1KDH4nkxkAOHjiWlk-NZDyBamWOmW23He",
      "https://drive.google.com/uc?export=view&id=1KT7sYm0niDiHY44d5TtxQogxCrDcELQq",
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
      "https://drive.google.com/uc?export=view&id=1IIbQayBnOAqHys1QVTm0GkS6gua44MKk",
    images: [
      "https://drive.google.com/uc?export=view&id=1IIbQayBnOAqHys1QVTm0GkS6gua44MKk",
      "https://drive.google.com/uc?export=view&id=1IOSh02-Irt9dTFsj1wajyXvzJdVHUAyD",
      "https://drive.google.com/uc?export=view&id=1IJVDPAR4C9aC_02dlW8V-ORiL8oK4G7e",
      "https://drive.google.com/uc?export=view&id=1IKRNszlkb1rrUD895PgJa0jsTxoP3dZ5",
      "https://drive.google.com/uc?export=view&id=1IRnDq6dW-hSvsLyska2K6gwJ2kNarAHp",
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
