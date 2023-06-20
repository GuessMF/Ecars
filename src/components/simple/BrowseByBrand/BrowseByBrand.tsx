import React from "react";
import style from "./__browseByBrand.module.scss";
import ShowAllBrands from "../../ui/ShowAllBrands/ShowAllBrands";
import BrandCard from "../../smart/BrandCard/BrandCard";
import {CSSTransition} from "react-transition-group";

import brands from "../../../helpers/brandsList";
import {log} from "console";

export default function BrowseByBrand() {
  const [visible, setVisible] = React.useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };
  return (
    <div className={style.browseByBrand}>
      <div className={style.browseByBrand__content}>
        <h2>Browse by brand</h2>
        <div className={style.browseByBrand__favoritesBrands}>
          <div className={style.browseByBrand__row}>
            {brands.map((brand, i) => {
              console.log(i);
              if (i <= 5) {
                return (
                  <BrandCard brand={brand.name} brandIMG={brand.brandIMG} />
                );
              }
            })}

            <CSSTransition
              in={visible}
              timeout={300}
              classNames={style.alert}
              unmountOnExit
            >
              <div className={style.allBrands}>
                {brands.map((brand, i) => {
                  console.log(i);
                  if (i > 5) {
                    return (
                      <BrandCard brand={brand.name} brandIMG={brand.brandIMG} />
                    );
                  }
                })}
              </div>
            </CSSTransition>
          </div>
          <ShowAllBrands visible={visible} onclick={handleClick} />
        </div>
      </div>
    </div>
  );
}
