import React, {useRef, useEffect} from "react";
import {Routes, Route} from "react-router-dom";

import ScrollToTop from "./utils/scrollToTop";

import style from "./styles/__app.module.scss";
import TopBar from "./components/simple/TopBar/TopBar";
import Header from "./components/ordinary/Header/Header";
import Homepage from "./pages/Homepage/Homepage";
import Catalog from "./pages/Catalog/Catalog";
import Footer from "./components/simple/Footer/Footer";
import AboutUs from "./pages/AboutUs/AboutUs";
import Details from "./pages/Details/Details";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import PersonalPage from "./pages/PersonalPage/PersonalPage";

import {initializeApp} from "firebase/app";
import {getStorage, ref, listAll} from "firebase/storage";

import {getDownloadURL} from "firebase/storage";
import {addDoc, collection} from "firebase/firestore";
import {getFirestore} from "firebase/firestore";
import firebase from "firebase/app";
function App() {
  // const headerRef = useRef<HTMLElement | null>(null);
  // useEffect(() => {
  //   if (headerRef.current) {
  //     const headerHeight = headerRef.current.getBoundingClientRect().height;
  //   }
  // }, []);
  // fetch("https://65378b85bb226bb85dd365a6.mockapi.io/cars")
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((json) => {
  //     console.log(json);
  //   });
  // const newCar = {
  //   make: "Toyota",
  //   model: "Camry",
  //   year: 2023,
  // };

  // // Опции для запроса
  // const requestOptions = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(newCar), // Преобразуйте объект в JSON перед отправкой
  // };

  // // Выполняем POST-запрос
  // fetch("https://65378b85bb226bb85dd365a6.mockapi.io/cars", requestOptions)
  //   .then((res) => {
  //     if (res.ok) {
  //       return res.json();
  //     }
  //     throw new Error("Network response was not ok.");
  //   })
  //   .then((json) => {
  //     console.log("Объект успешно отправлен на сервер:", json);
  //   })
  //   .catch((error) => {
  //     console.error("Ошибка при отправке объекта на сервер:", error);
  //   });

  const firebaseConfig = {
    apiKey: "AIzaSyAPhpxFJD0FYxtAih7jSx8wgqETXHhOBeI",
    authDomain: "ecars-de7bc.firebaseapp.com",
    projectId: "ecars-de7bc",
    storageBucket: "ecars-de7bc.appspot.com",
    messagingSenderId: "110000528537",
    appId: "1:110000528537:web:321165893ea4a7a8ac6c08",
    measurementId: "G-XDXHPB18TW",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  // const newCar = {
  //   make: "Toyota Test",
  //   model: "Camry",
  //   year: 2023,
  // };

  // const carsCollection = collection(db, "cars1");
  // addDoc(carsCollection, newCar)
  //   .then((docRef: any) => {
  //     console.log("Данные успешно добавлены в Firestore с ID:", docRef.id);
  //   })
  //   .catch((error: Error) => {
  //     console.error("Ошибка при добавлении данных в Firestore:", error);
  //   });

  // Новое изображение для Cloud Storage
  // const imageString = "data:image/png;base64,iVBORw0KGgo..."; // Base64-строка вашего изображения

  // Загрузка изображения в Cloud Storage
  // const storageRef = ref(storage, "images/car.png");
  // uploadString(storageRef, imageString, "data_url")
  //   .then((snapshot) => {
  //     console.log("Изображение успешно загружено в Cloud Storage.");
  //   })
  //   .catch((error: Error) => {
  //     console.error("Ошибка при загрузке изображения в Cloud Storage:", error);
  //   });

  return (
    <div className={style.app}>
      <ScrollToTop />
      <TopBar />
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/per" element={<PersonalPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
