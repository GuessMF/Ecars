import React from "react";
import ReactDOM from "react-dom/client";
import {HashRouter as Router} from "react-router-dom";
import "./styles/index.scss";
import {Provider} from "react-redux";
import App from "./App";
import "./firebase";
import {store} from "store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Router basename={process.env.PIBLIC_URL}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
