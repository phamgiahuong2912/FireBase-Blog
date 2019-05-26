import React, { Component } from "react";
import "./index.scss";
import { firebaseBroad, firebaseDb } from "../../firebase";
import ReactLoading from "react-loading";
import parse from "html-react-parser";
import Pagination from "../helpers/pagination";
import { Link } from "react-router-dom";
class DashBoard extends Component {
  state = {
    listBroad: [],
    isLoadding: true,
    listBroadRender: [],
  };
  componentDidMount() {
    this.getListBroad();
  }
  getListBroad = e => {
    let listBroad = [];
    let uid = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).uid : "";
    firebaseBroad.once("value").then(response => {
      response.forEach(record => {
        let value = record.val();
        let id = record.key;
        if (value.uid === uid) {
          listBroad.push({ id, ...value });
        }
      });
      this.setState({ listBroad, isLoadding: false });
    });
  };
  renderListBroad = (data, index) => (
    <div className="item-broad" key={index}>
      <div className="col-md-2 word-break">{data.title}</div>
      <div className="col-md-6 description">{parse(data.description)}</div>
      <div className="col-md-2 word-break">{data.author}</div>
      <div className="col-md-2 icon">
        <Link className="col-md-4 fas fa-eye" to={`/broad/detail/${data.id}`} />
        <Link className="col-md-4 fas fa-edit" to={`/broad/create/${data.id}`} />
        <div
          className="col-md-4 fas fa-trash-alt"
          onClick={() => {
            firebaseDb.ref(`broad/${data.id}`).remove(() => {
              this.setState({ isLoadding: true });
              setTimeout(() => this.getListBroad(), 1500);
            });
          }}
        />
      </div>
    </div>
  );
  onChangePage = listBroad => {
    let listBroadRender = listBroad;

    this.setState({ listBroadRender });
  };
  render() {
    if (this.state.isLoadding) {
      return <ReactLoading delay={0} color="tomato" width={65} height={65} type={"spinningBubbles"} className="react-loadding" />;
    }
    return (
      <div className="container">
        <div className="dashboard">
          <h1>Broad</h1>
          <p>Welcome To Broad</p>

          <input defaultValue="ADD YOUR BROAD" className="btn btn-info" onClick={() => this.props.history.push("/broad/create")} />
          <div className="content">
            <div className="thead">
              <div className="col-md-2">Title</div>
              <div className="col-md-6">Description</div>
              <div className="col-md-2">Author</div>
              <div className="col-md-2">Action</div>
            </div>
            <div className="body">{this.state.listBroadRender.map(this.renderListBroad, this)}</div>
            <Pagination listBroad={this.state.listBroad} onChangePage={this.onChangePage} />
          </div>
        </div>
      </div>
    );
  }
}

export default DashBoard;
