import React from "react";
import style from "./__contactUs.module.scss";

type Props = {
  version: string;
};
export default function ContactUs({version}: Props) {
  return (
    <button
      className={
        version == "light" ? style.contactUsLight : style.contactUsDark
      }
    >
      Contact Us
    </button>
  );
}
