import React, {useRef, useEffect, useState} from "react";
import style from "./__personalPage.module.scss";
import {ReactComponent as GoogleIcon} from "../../assets/icons/google_icon.svg";

import {NavLink} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import {Axios} from "axios";
// import { axios } from 'axios';
import brands from "../../helpers/brandsList";
import fs from "fs-extra";
import {writeFileSync} from "fs";
// import carsData from "../../helpers/cars.json";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import axios, {AxiosError, AxiosResponse} from "axios";

const express = require("express");
const fs = require("fs");

app.post("/addCar", (req, res) => {
  const {id, brand, model, price, year, mileage, imageUrl} = req.body;
  const carObject = {
    id,
    brand,
    model,
    price,
    year,
    mileage,
    imageUrl,
  };

  // Прочитать существующие данные из файла
  const data = fs.readFileSync("cars.json");
  const cars = JSON.parse(data);

  // Добавить новую машину в массив
  cars.push(carObject);

  // Записать обновленные данные в файл
  fs.writeFileSync("cars.json", JSON.stringify(cars, null, 2));

  res.json({message: "Машина успешно добавлена в JSON файл"});
});

app.listen(3001, () => {
  console.log("Сервер запущен на порту 3001");
});

const storage = getStorage();

export default function PersonalPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");

  const storage = getStorage();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const generateNewId = (): string => {
    return uuidv4();
  };

  const updateCarData = (carId, updatedCarData) => {
    const carRef = ref(database, "cars/" + carId);
    set(carRef, updatedCarData)
      .then(() => {
        console.log(
          "Данные об автомобиле успешно обновлены в Firebase Realtime Database."
        );
      })
      .catch((error: any) => {
        console.error("Ошибка при обновлении данных об автомобиле:", error);
      });
  };

  // Пример использования функции
  const carIdToUpdate = "ваш_ид_автомобиля";
  const updatedCarData = {
    brand: "Новый бренд",
    model: "Новая модель",
    price: "Новая цена",
    // и так далее, вносите все необходимые изменения
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (file) {
      const newId = generateNewId();
      const storageRef = ref(storage, `cars/${newId}/${file.name}`);
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);

      const carObject = {
        id: newId,
        brand,
        model,
        price,
        year: parseInt(year),
        mileage: parseInt(mileage),
        imageUrl,
      };

      // Отправить объект на сервер или выполнить другие действия с ним
      console.log(carObject);
      updateCarData(carIdToUpdate, updatedCarData);

      // Сбросить значения формы
      setFile(null);
      setBrand("");
      setModel("");
      setPrice("");
      setYear("");
      setMileage("");
    }
  };

  return (
    <div className={style.login}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Фотография машины:
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>
        </div>
        <div>
          <label>
            Марка:
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Модель:
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Цена:
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Год выпуска:
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Пробег:
            <input
              type="text"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Добавить машину</button>
      </form>
    </div>
  );
}
