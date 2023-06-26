import React from "react";
import style from "./__contactUsBig.module.scss";

import Mobile from "../Mobile/Mobile";
import Email from "../Email/Email";

export default function ContactUsBig() {
  const color: string = "#1A1A1A";

  return (
    <div className={style.contactUsBig}>
      <span>
        Contact us for auto import assistance or to learn more about us
      </span>
      <Mobile color={color} />
      <Email color={color} />
    </div>
  );
}
