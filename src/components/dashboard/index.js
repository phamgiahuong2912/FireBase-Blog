import React, { Component } from "react";
import "./index.scss";
import { firebaseBroad } from "../../firebase";
import ReactLoading from "react-loading";
class DashBoard extends Component {
  state = {
    listBroad: [],
    isLoadding: true,
  };
  componentDidMount() {
    let listBroad = [];
    firebaseBroad.once("value").then(response => {
      response.forEach(record => {
        let value = record.val();
        let id = record.key;
        listBroad.push({ id, ...value });
        this.setState({ listBroad, isLoadding: false });
      });
    });
  }
  renderListBroad = (data, index) => (
    <div className="item-broad" key={index}>
      <div className="col-md-2">{data.title}</div>
      <div className="col-md-6 description">{data.description}</div>
      <div className="col-md-2">{data.author}</div>
      <div className="col-md-2 icon">
        <div className="col-md-4 fas fa-eye" />
        <div className="col-md-4 fas fa-edit" />
        <div className="col-md-4 fas fa-trash-alt" />
      </div>
    </div>
  );
  render() {
    if (this.state.isLoadding) {
      return <ReactLoading delay={0} color="tomato" width={65} height={65} type={"spinningBubbles"} className="react-loadding" />;
    }
    return (
      <div className="container">
        <div className="dashboard">
          <h1>DASHBOARD</h1>
          <p>Welcome to dashboard</p>

          <input defaultValue="ADD YOUR BROAD" className="btn btn-info" onClick={() => this.props.history.push("/add-broad")} />
          <div className="content">
            <div className="thead">
              <div className="col-md-2">Title</div>
              <div className="col-md-6">Description</div>
              <div className="col-md-2">Author</div>
              <div className="col-md-2">Action</div>
            </div>
            <div className="body">{this.state.listBroad.map(this.renderListBroad, this)}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashBoard;
