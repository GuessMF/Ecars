import React from "react";
import style from "./__noCar.module.scss";
import {NavLink} from "react-router-dom";
import {Rings} from "react-loader-spinner";
interface Props {
  loading: boolean;
  founted: boolean;
}

export default function NoCar({loading, founted}: Props) {
  return (
    <div className={style.noCar}>
      {loading ? (
        <Rings
          height="108"
          width="600"
          color="#4fa94d"
          // radius="6"
          // wrapperStyle={{}}
          wrapperClass={style.loader}
          visible={true}
          // ariaLabel="rings-loading"
        />
      ) : (
        <div>
          <h3>We can't find this car</h3>
          <p>
            Perhaps such a page simply doesn't exist. Try our
            <NavLink to="/catalog"> catalog</NavLink>
          </p>
        </div>
      )}
    </div>
  );
}
