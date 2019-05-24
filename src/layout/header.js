import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="content">
          <div className="left">
            <span>Developer</span>
            <span className="title">Front End</span>
          </div>
          <div className="right">
            <span style={{ marginRight: "10px" }}>Sign Up</span>
            <span>Login</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
