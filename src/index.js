/* eslint-disable no-unused-expressions */
import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import { firebase } from "./firebase";
import { register } from "./serviceWorker";
import HttpsRedirect from "react-https-redirect";

ReactDOM.render(
  <BrowserRouter>
    <HttpsRedirect>
      <Routes />
    </HttpsRedirect>
  </BrowserRouter>,
  document.getElementById("root"),
);
register();
