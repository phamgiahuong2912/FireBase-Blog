import React from "react";
import { Route } from "react-router-dom";
import Layout from "./layout/index";
import Home from "./components/home.js";
const routes = () => {
  return (
    <Layout>
      <Route exact path="/" component={Home} />
    </Layout>
  );
};

export default routes;
