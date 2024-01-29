import React from "react";
import style from "./__popuperror.module.scss";
import {ReactComponent as CloseIcon} from "./deleteIcon.svg";
interface PopUpErrorsProps {
  closePopUp: () => void;
}

export default function PopUpError({closePopUp}: PopUpErrorsProps) {
  return (
    <div className={style.popUp__errors}>
      <div className={style.container}>
        <button className={style.close__btn} onClick={closePopUp}>
          <CloseIcon />
        </button>
        <div className={style.message_box}>
          <p>Fill in the blank fields highlighted in red</p>
          <button className={style.agree__btn} onClick={closePopUp}>
            Okay. I'll fill it out.
          </button>
        </div>
      </div>
    </div>
  );
}
