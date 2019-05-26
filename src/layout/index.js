import React, { Component } from "react";
import Header from "./header";
import Footer from "./footer";
class Layout extends Component {
  state = {
    removeAttribute: "",
  };
  componentWillMount() {
    let removeAttribute = "";
    if (window.location.pathname === "/") {
      removeAttribute = "remove";
      this.setState({ removeAttribute });
    }
  }
  render() {
    return (
      <div className="layout">
        <Header />
        <div className={`page-container ${this.state.removeAttribute}`}>{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

export default Layout;
