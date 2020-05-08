import React from "react";
import ReactDOM from "react-dom";
import fastclick from "fastclick";
import {Provider} from "react-redux";
import store from "./store";
import "normalize.css/normalize.css";

import App from "./App";
import "./common/styles/index.scss";

fastclick.attach(document.body);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
