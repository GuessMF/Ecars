import React from "react";
import style from "./__deleteCar.module.scss";
interface Props {
  id: string;
  deleteCarFunc: () => void;
}

export default function DeleteCar({deleteCarFunc, id}: Props) {
  return (
    <button className={style.delete_btn} onClick={deleteCarFunc}>
      DeleteCar
    </button>
  );
}
