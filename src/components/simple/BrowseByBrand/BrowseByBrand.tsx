import React from "react";
import style from "./__browseByBrand.module.scss";
import ShowAllBrands from "../../ui/ShowAllBrands/ShowAllBrands";
import BrandCard from "../../smart/BrandCard/BrandCard";

export default function BrowseByBrand() {
  return (
    <div className={style.browseByBrand}>
      <div className={style.browseByBrand__content}>
        <h2>Browse by brand</h2>
        <div className={style.browseByBrand__favoritesBrands}>
          <div className={style.browseByBrand__row}>
            <BrandCard />
            <BrandCard />
            <BrandCard />
            <BrandCard />
            <BrandCard />
            <BrandCard />
            {/* <BrandCard /> */}
          </div>
          <ShowAllBrands />
        </div>
      </div>
    </div>
  );
}
