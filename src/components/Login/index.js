import React, { Component } from "react";
import InputField from "../helpers/inputField";
import "./index.scss";
import { validation } from "../helpers/validation";
import { firebase } from "../../firebase";
import ModalSuccess from "../helpers/modalSuccess";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: {},
      text: "",
      isOpen: false,
    };
  }

  _onChange = e => {
    let { error } = this.state;
    error = validation(error, e.target.name, { [e.target.name]: e.target.value });
    this.setState({ [e.target.name]: e.target.value, error });
  };
  _handleLogin = async () => {
    let { email, password, error } = this.state;
    if (Object.keys(error).length === 0) {
      let isLoadding = true;

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => {
          if (!response.additionalUserInfo.isNewUser) {
            localStorage.setItem("user", JSON.stringify(response.user));
            this.setState({ isLoadding: false, isOpen: true, text: "Login Success" }, () =>
              setTimeout(() => {
                this.props.history.push("/broad");
              }, 1500),
            );
          }
        })
        .catch(e => {
          this.setState({ errorApi: e.message, isLoadding: false });
        });
      this.setState({ isLoadding, isOpen1: true });
    }
  };
  render() {
    let { email, password, error, errorApi } = this.state;
    let disable = {
      cursor: "pointer",
    };
    if (!email || !password || Object.keys(error).length > 0) {
      disable = {
        opacity: 0.5,
        pointerEvents: "none",
      };
    }

    return (
      <div className="container">
        <ModalSuccess text={this.state.text} isOpen={this.state.isOpen} isLoadding={this.state.isLoadding} />
        <div className="register col-8">
          <h1>Login</h1>
          <p>Login your account</p>
          <div className="form">
            <InputField id="email" type="text" placeholder="Email" name="email" value={email} onChange={this._onChange} error={error.email} />
            <InputField type="password" placeholder="Password" name="password" value={password} onChange={this._onChange} error={error.password} />
            {errorApi ? <span className="error-api">{errorApi}</span> : ""}
            <input style={disable} onClick={this._handleLogin} defaultValue="Submit" className="btn btn-info" />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
