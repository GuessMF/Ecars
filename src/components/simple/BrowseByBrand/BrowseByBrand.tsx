import React from "react";
import style from "./__browseByBrand.module.scss";
import ShowAllBrands from "../../ui/ShowAllBrands/ShowAllBrands";
import BrandCard from "../../smart/BrandCard/BrandCard";
import {CSSTransition} from "react-transition-group";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

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
              if (i <= 5) {
                return (
                  <Link
                    to={{
                      pathname: "/catalog",
                      search: `?brand=${encodeURIComponent(brand.name)}`,
                    }}
                    key={i}
                  >
                    <BrandCard brand={brand.name} brandIMG={brand.brandIMG} />
                  </Link>
                );
              }
              return null;
            })}
          </div>

          <CSSTransition
            in={visible}
            timeout={300}
            classNames={style.alert}
            unmountOnExit
          >
            <div className={style.allBrands}>
              {brands.map((brand, i) => {
                if (i > 5) {
                  return (
                    <Link
                      to={{
                        pathname: "/catalog",
                        search: `?brand=${encodeURIComponent(brand.name)}`,
                      }}
                      key={i}
                    >
                      <BrandCard brand={brand.name} brandIMG={brand.brandIMG} />
                    </Link>
                  );
                }
                return null;
              })}
            </div>
          </CSSTransition>

          <ShowAllBrands visible={visible} onclick={handleClick} />
        </div>
      </div>
    </div>
  );
}
