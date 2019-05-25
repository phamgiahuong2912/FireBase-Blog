import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="content">
          <div className="item">
            <h1>Developer FrontEnd</h1>
            <div className="bottom">
              <div onClick={() => window.location.replace("/register")} className="btn btn-light">
                SignUp
              </div>
              <div onClick={() => window.location.replace("/login")} className="btn btn-info">
                Login
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
