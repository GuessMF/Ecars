import React from "react";

import style from "./__popupdel.module.scss";
import {ReactComponent as CloseIcon} from "./deleteIcon.svg";

interface Props {
  carName: string;
  password: string;
  correctPassword: boolean;
  onConfirmDelete: (carId: string, carName: string) => void;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  deleteCar: () => void;
  closePopUp: () => void;
}
export default function PopUpDel({
  carName,
  password,
  correctPassword,
  onConfirmDelete,
  onPasswordChange,
  deleteCar,
  closePopUp,
}: Props) {
  return (
    <div className={style.popupdel}>
      <h2>
        To confirm the deletion, enter the make of the vehicle to be deleted:
      </h2>
      <h3>{carName}</h3>
      <input type="text" value={password} onChange={onPasswordChange} />
      <button disabled={correctPassword === false} onClick={() => deleteCar()}>
        Confirm Delete
      </button>
      <button className={style.close__btn} onClick={closePopUp}>
        <CloseIcon />
      </button>
    </div>
  );
}
