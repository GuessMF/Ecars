import React from "react";
import style from "./__like.module.scss";
import {ReactComponent as LikeIcon} from "./likeIcon.svg";

export default function Like() {
  return (
    <div className={style.like}>
      <LikeIcon />
    </div>
  );
}
