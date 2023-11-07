import React from "react";
import style from "./__popuperror.module.scss";

export default function PopUpError() {
  return (
    <div className={style.popUp__errors}>
      <div className={style.container}>
        <button className={style.close__btn}>x</button>
        <div className={style.message_box}>
          <p>Заполните пустые поля выделенные красным</p>
          <button className={style.agree__btn}>Хорошо, заполню</button>
        </div>
      </div>
    </div>
  );
}
