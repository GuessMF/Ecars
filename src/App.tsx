import React from "react";

import style from "./styles/__app.module.scss";
import TopBar from "./components/simple/TopBar/TopBar";
import GetAquote from "./components/ui/GetAquote/GetAquote";
function App() {
  return (
    <div className={style.app}>
      <TopBar />
      <GetAquote />
      <div className={style.header}>header</div>
    </div>
  );
}

export default App;
