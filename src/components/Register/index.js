import React, { Component } from "react";
import InputField from "../helpers/inputField";
import "./index.scss";
import { validation } from "../helpers/validation";
import { firebase } from "../../firebase";
import ModalSuccess from "../helpers/modalSuccess";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassWord: "",
      error: {},
    };
  }

  _onChange = e => {
    let { error, password, confirmPassWord } = this.state;
    error = validation(error, e.target.name, { [e.target.name]: e.target.value }, { password, confirmPassWord });
    this.setState({ [e.target.name]: e.target.value, error });
  };
  _handleRegister = () => {
    let { email, password, error } = this.state;
    if (Object.keys(error).length === 0) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(response => {
          if (response.additionalUserInfo.isNewUser) {
            this.setState({ isRegister: true, isLoadding: false, isOpen: true, text: "Register success" }, () =>
              setTimeout(() => {
                this.props.history.push("/login");
              }, 1500),
            );
          }
        })
        .catch(e => {
          this.setState({ errorApi: e.message, isLoadding: false });
        });
      this.setState({ isLoadding: true });
    }
  };
  render() {
    let { email, password, confirmPassWord, error, errorApi } = this.state;
    let disable = {
      cursor: "pointer",
    };
    if (!email || !password || !confirmPassWord || Object.keys(error).length > 0) {
      disable = {
        opacity: 0.5,
        pointerEvents: "none",
      };
    }
    return (
      <div className="container">
        <ModalSuccess text={this.state.text} isOpen={this.state.isOpen} isLoadding={this.state.isLoadding} />

        <div className="register col-8">
          <h1>Sign Up</h1>
          <p>Create your account</p>
          <div className="form">
            <InputField id="email" type="text" placeholder="Email" name="email" value={email} onChange={this._onChange} error={error.email} />
            <InputField type="password" placeholder="Password" name="password" value={password} onChange={this._onChange} error={error.password} />
            <InputField
              type="password"
              placeholder="Confirm Password"
              name="confirmPassWord"
              value={confirmPassWord}
              onChange={this._onChange}
              error={error.confirmPassWord}
            />
            {errorApi ? <span className="error-api">{errorApi}</span> : ""}
            <input style={disable} onClick={this._handleRegister} defaultValue="Submit" className="btn btn-info" />
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
