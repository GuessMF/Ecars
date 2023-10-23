import React, {useRef, useEffect, useState} from "react";
import style from "./__personalPage.module.scss";
import {ReactComponent as GoogleIcon} from "../../assets/icons/google_icon.svg";

import {NavLink} from "react-router-dom";
import {log} from "console";

export default function PersonalPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files);
      setSelectedFiles(filesArray);
    }
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      console.log("Selected Files:", selectedFiles);
      // Здесь вы можете выполнить отправку файлов на сервер или другие действия с файлами.
    } else {
      console.log("No files selected");
    }
  };

  return (
    <div className={style.login}>
      <div className={style.wrapper}>
        <h1>Admin</h1>
        <div className={style.form}>
          <div className={style.email}>
            <input type="text" placeholder="Brand" />
            <input type="text" placeholder="Model" />
            <input type="number" placeholder="Year" />
            <input type="number" placeholder="Price" />
          </div>

          <input type="file" multiple onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
          {selectedFiles.map((file, index) => (
            <div key={index}>
              <img
                src={URL.createObjectURL(file)}
                alt={`File Preview ${index}`}
                style={{width: "100px", height: "100px"}}
              />
              <p>File Name: {file.name}</p>
            </div>
          ))}
          <button className={style.loginBtn}>Paste</button>
        </div>
      </div>
    </div>
  );
}
