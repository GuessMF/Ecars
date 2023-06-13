import {log} from "console";
import React from "react";

import style from "./__getaquote.module.scss";

interface Props {
  version: string;
}

export default function GetAquote({version}: Props) {
  console.log(version);
  return (
    <button
      className={version == "big" ? style.getAquote_big : style.getAquote}
    >
      Get a quote
    </button>
  );
}
