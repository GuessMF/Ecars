import React from "react";
import ReactDOM from "react-dom/client";
import {HashRouter as Router} from "react-router-dom";
import "./styles/index.scss";
// import
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router basename={process.env.PIBLIC_URL}>
    <App />
  </Router>
);
