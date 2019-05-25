import React, { Component } from "react";
import ReactLoading from "react-loading";
export default function(ComponentAuthen, isPublish) {
  class Authenticate extends Component {
    componentWillMount() {
      let user = JSON.parse(localStorage.getItem("user"));
      if (!user && !isPublish) {
        this.props.history.push("/login");
      } else if (user && isPublish) {
        this.props.history.push("/dashboard");
      }
    }
    render() {
      return <ComponentAuthen {...this.props} />;
    }
  }

  return Authenticate;
}
