import React from "react";
import {useState, useEffect} from "react";
import style from "./__errorLogin.module.scss";

interface Props {
  error: string;
  closePopUp: () => void;
}

export default function ErrorLogin({error, closePopUp}: Props) {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (error === "auth/invalid-email")
      setMessage("Incorrect email address entered");
    if (error === "auth/missing-password") {
      setMessage("Missing password");
    }
    if (error === "auth/invalid-login-credentials") {
      setMessage("Invalid login credentials");
    }
  }, [error]);

  return (
    <div className={style.errorLogin}>
      <div className={style.wrapper}>
        <button onClick={closePopUp}>x</button>
        <h3>{message}</h3>
      </div>
    </div>
  );
}
