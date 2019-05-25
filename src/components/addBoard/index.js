import React, { Component } from "react";
import InputField from "../helpers/inputField";
import TextAreaField from "../helpers/textAreaField";
import { validation } from "../helpers/validation";
import { firebaseBroad, firebaseDb } from "../../firebase";
import ModalSuccess from "../helpers/modalSuccess";
import "./index.scss";
import ReactLoading from "react-loading";
class AddBroad extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      description: "",
      title: "",
      author: "",
      error: {},
      isLoadding: false,
      isLoaddingPage: true,
    };
  }
  componentDidMount() {
    let broadId = this.props.match.params.id;
    if (broadId) {
      firebaseDb
        .ref(`broad/${broadId}`)
        .once("value")
        .then(data => {
          data = data.val();
          this.setState({ title: data.title, description: data.description, author: data.author, isLoaddingPage: false });
        });
    } else {
      this.setState({ isLoaddingPage: false });
    }
  }
  _onChange = e => {
    let { error } = this.state;
    error = validation(error, e.target.name, { [e.target.name]: e.target.value });
    this.setState({ [e.target.name]: e.target.value, error });
  };
  _handleAddBroad = () => {
    let { title, description, author, error } = this.state;
    let broadId = this.props.match.params.id;
    let uid = JSON.parse(localStorage.getItem("user")).uid;
    let data = {
      title,
      description,
      author,
      uid,
    };
    if (Object.keys(error).length === 0) {
      let url = "";
      let text = "";
      if (broadId) {
        url = firebaseDb.ref(`broad/${broadId}`).update(data);
        text = "Update Success";
      } else {
        url = firebaseBroad.push(data);
        text = "Create Success";
      }
      url.then(() => {
        this.setState({ isLoadding: false, isOpen: true, text: text }, () =>
          setTimeout(() => {
            this.props.history.push("/broad");
          }, 1500),
        );
      });
      this.setState({ isLoadding: true });
    }
  };
  render() {
    let { description, title, author, error } = this.state;
    let disable = {
      cursor: "pointer",
    };
    if (!description || !title || !author || Object.keys(error).length > 0) {
      disable = {
        opacity: 0.5,
        pointerEvents: "none",
      };
    }
    if (this.state.isLoaddingPage)
      return <ReactLoading delay={0} color="tomato" width={65} height={65} type={"spinningBubbles"} className="react-loadding" />;
    return (
      <div className="container">
        <ModalSuccess text={this.state.text} isLoadding={this.state.isLoadding} isOpen={this.state.isOpen} />
        <div className="add-broad col-8">
          <h1>Add Your Broad</h1>
          <InputField id="title" type="text" placeholder="Title" name="title" value={title} onChange={this._onChange} error={error.title} />
          <TextAreaField
            id="description"
            type="text"
            placeholder="description"
            name="description"
            value={description}
            onChange={this._onChange}
            error={error.description}
          />
          <InputField id="author" type="text" placeholder="Author" name="author" value={author} onChange={this._onChange} error={error.author} />
          <input style={disable} onClick={this._handleAddBroad} defaultValue="Submit" className="btn btn-info" />
        </div>
      </div>
    );
  }
}

export default AddBroad;
