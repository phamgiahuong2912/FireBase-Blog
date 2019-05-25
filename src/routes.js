import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./layout/index";
import Home from "./components/home.js";
import Register from "./components/register";
import Login from "./components/login";
import Authenticate from "./components/helpers/authenticate";
import DashBoard from "./components/dashboard";
import AddBroad from "./components/addBoard";
import BroadDetail from "./components/broadDetail";
const routes = () => {
  return (
    <Layout>
      <Route exact path="/" component={Home} />
      <Route exact path="/broad" component={Authenticate(DashBoard, false)} />
      <Route exact path="/broad/create" component={Authenticate(AddBroad, false)} />
      <Route exact path="/broad/create/:id" component={Authenticate(AddBroad, false)} />
      <Route exact path="/broad/detail/:id" component={Authenticate(BroadDetail, false)} />
      <Route exact path="/register" component={Authenticate(Register, true)} />
      <Route exact path="/login" component={Authenticate(Login, true)} />
    </Layout>
  );
};

export default routes;
