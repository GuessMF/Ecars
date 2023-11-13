import React from "react";
import style from "./__popupsent.module.scss";
interface Props {
  sent: boolean;
}

export default function PopUpSent({sent}: Props) {
  return (
    <div className={`${style.popUp__sent} ${sent ? style.show : ""}`}>
      <div className={style.container}>
        <div className={style.message_box}>
          <p>Данные успешно отправлены</p>
        </div>
      </div>
    </div>
  );
}
