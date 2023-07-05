import React, {useEffect, useState, useCallback} from "react";
import ReactDOM from "react-dom";

import style from "./__catalogPagination.module.scss";
import BigCard from "../../smart/BigCard/BigCard";
import {cars} from "../../../helpers/carList";
import Skeleton from "../../ui/Skeleton/Skeleton";
import {log} from "console";

interface Props {
  currentItems: any;
}

export default function CatalogPagination({currentItems}: Props) {
  const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   const loadIMG = async (url: string) => {
  //     const img = new Image();
  //     img.src = url;
  //     await img.decode();
  //     return img;
  //   };

  //   const loading = async () => {
  //     const urls: string[] = [];
  //     currentItems.map((item: any) => {
  //       urls.push(item.previewIMG);
  //     });

  //     const images = await Promise.all(urls.map(loadIMG));
  //     setLoaded(true);
  //   };
  //   loading();
  // }, []);

  // console.log(loaded);
  setTimeout(() => {
    setLoaded(true);
  }, 1000);
  return (
    <div className={style.catalogPagination}>
      {currentItems.map((item: any) =>
        loaded ? (
          <BigCard
            index={item.index}
            brand={item.brand}
            model={item.model}
            price={item.price}
            previewIMG={item.previewIMG}
          />
        ) : (
          <Skeleton />
        )
      )}
    </div>
  );
}
