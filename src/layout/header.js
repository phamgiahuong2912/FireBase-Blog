import React, { Component } from "react";
import { firebase } from "../firebase";
import { Link, withRouter } from "react-router-dom";
import ModalSucces from "../components/helpers/modalSuccess";
class Header extends Component {
  // state = {
  //   isOpen: false,
  //   isLoadding: false,
  //   text: "",
  // };
  _handleLogout = () => {
    firebase.auth().signOut();

    // setTimeout(() => {
    //   this.setState({ isOpen: false, isLoadding: false });
    // }, 1500);
    // this.setState({ isLoadding: true, isOpen: true, text: "Loggout Success" });
    localStorage.clear();
    this.props.history.push("/login");
  };
  render() {
    let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "";
    let contentRight = "";
    if (user) {
      contentRight = (
        <div>
          <span className="fas fa-user" style={{ marginRight: "10px", fontSize: "20px" }} />
          <span style={{ marginRight: "10px" }}>{user.email}</span>
          <span style={{ fontSize: "16px" }} onClick={this._handleLogout}>
            Logout
          </span>
        </div>
      );
    } else {
      contentRight = (
        <div>
          <Link to="/register">
            {" "}
            <span style={{ marginRight: "10px", color: "white" }}>Sign Up</span>
          </Link>
          <Link to="/login">
            {" "}
            <span style={{ color: "white" }}>Login</span>
          </Link>
        </div>
      );
    }
    return (
      <div className="header">
        {/* <ModalSucces isOpen={this.state.isOpen} isLoadding={this.state.isLoadding} text={this.state.text} /> */}
        <div className="content">
          <div className="left">
            <span onClick={() => window.location.replace("/")} style={{ cursor: "pointer" }}>
              Developer
            </span>
            <span className="title">Front End</span>
          </div>
          <div className="right">{contentRight}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
