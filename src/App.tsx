import React from "react";

import style from "./styles/__app.module.scss";
import TopBar from "./components/simple/TopBar/TopBar";
import Header from "./components/ordinary/Header/Header";
import Homepage from "./pages/Homepage/Homepage";
import Catalog from "./pages/Catalog/Catalog";
import Footer from "./components/simple/Footer/Footer";

function App() {
  return (
    <div className={style.app}>
      <TopBar />
      <Header />
      {/* <Homepage /> */}
      <Catalog />
      <Footer />
    </div>
  );
}

export default App;
