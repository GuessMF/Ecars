import React from "react";
import Happy from "../../../assets/images/happy.webp";
import style from "./__edited.module.scss";

export default function Edited() {
  return (
    <div className={style.Edited}>
      <h4>Your changes have been successfully sent to the server</h4>
      <img src={Happy} alt="" />
    </div>
  );
}
