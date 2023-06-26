import React from "react";
import style from "./__getAquoteBig.module.scss";
import GetAquote from "../GetAquote/GetAquote";
import {ReactComponent as MailIconGreen} from "../../../assets/icons/getAquoteBig/mail_icon_green.svg";

export default function GetAquoteBig() {
  const version: string = "big";

  return (
    <div className={style.getAquoteBig}>
      <MailIconGreen />
      <div className={style.getAquoteBig__content}>
        <h5>Send an inquiry and our managers will offer you the best deals.</h5>
        <span>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit.
        </span>
      </div>
      <GetAquote version={version} />
    </div>
  );
}
