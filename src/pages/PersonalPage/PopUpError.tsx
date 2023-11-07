import React from "react";
import style from "./__popuperror.module.scss";

interface PopUpErrorsProps {
  closePopUp: () => void;
}

export default function PopUpError({closePopUp}: PopUpErrorsProps) {
  return (
    <div className={style.popUp__errors}>
      <div className={style.container}>
        <button className={style.close__btn} onClick={closePopUp}>
          x
        </button>
        <div className={style.message_box}>
          <p>Заполните пустые поля выделенные красным</p>
          <button className={style.agree__btn} onClick={closePopUp}>
            Хорошо, заполню
          </button>
        </div>
      </div>
    </div>
  );
}
