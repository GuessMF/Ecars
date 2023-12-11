import React, {useState, useEffect} from "react";

import style from "./__popupdel.module.scss";

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
  // const [password, setPassword] = useState<string>("");
  // const handleConfirmDelete = () => {
  //   // Вызываем функцию обратного вызова с паролем
  //   onConfirmDelete(password);
  // };
  //   <button onClick={() => onConfirmDelete(password)}>Confirm Delete</button>
  // console.log(correctPassword + " correctPassword");
  useEffect(() => {
    //console.log(password);
  }, [password, correctPassword]);

  return (
    <div className={style.popupdel}>
      <h3>{carName}</h3>
      <input type="text" value={password} onChange={onPasswordChange} />
      <button disabled={correctPassword === false} onClick={() => deleteCar()}>
        Confirm Delete
      </button>
      <button className={style.close__btn} onClick={closePopUp}>
        x
      </button>
    </div>
  );
}
