import React, {useState} from "react";

import style from "./__popupdel.module.scss";

interface Props {
  carName: string;
  onConfirmDelete: (carId: string, carName: string) => void;
}
export default function PopUpDel({carName, onConfirmDelete}: Props) {
  const [password, setPassword] = useState<string>("");
  // const handleConfirmDelete = () => {
  //   // Вызываем функцию обратного вызова с паролем
  //   onConfirmDelete(password);
  // };
  //   <button onClick={() => onConfirmDelete(password)}>Confirm Delete</button>

  return (
    <div className={style.popupdel}>
      <h3>{carName}</h3>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => onConfirmDelete("1", carName)}>
        Confirm Delete
      </button>
    </div>
  );
}
