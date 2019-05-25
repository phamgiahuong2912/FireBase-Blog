import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./layout/index";
import Home from "./components/home.js";
import Register from "./components/Register";
import Login from "./components/Login";
import Authenticate from "./components/helpers/authenticate";
import DashBoard from "./components/dashboard";
import AddBroad from "./components/addBoard";
const routes = () => {
  return (
    <Layout>
      <Route exact path="/" component={Authenticate(Home, false)} />
      <Route exact path="/dashboard" component={Authenticate(DashBoard, false)} />
      <Route exact path="/add-broad" component={Authenticate(AddBroad, false)} />
      <Route exact path="/register" component={Authenticate(Register, true)} />
      <Route exact path="/login" component={Authenticate(Login, true)} />
    </Layout>
  );
};

export default routes;
