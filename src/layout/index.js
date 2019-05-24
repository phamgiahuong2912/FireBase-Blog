import React, { Component } from "react";
import Header from "./header";
import Footer from "./footer";
class Layout extends Component {
  render() {
    return (
      <div className="layout">
        <div className="container">
          <Header />
          <div className="page-container">{this.props.children}</div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Layout;
