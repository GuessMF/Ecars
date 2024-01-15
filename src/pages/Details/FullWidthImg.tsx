import React from "react";
import style from "./__fullWidthImg.module.scss";

type Props = {
  imgSrc: string;
  handleClose: () => void;
};

export default function FullWidthImg({imgSrc, handleClose}: Props) {
  return (
    <div className={style.fullWidthImg}>
      <button onClick={handleClose}>Close</button>
      <img src={imgSrc} alt="wide img" />
    </div>
  );
}
