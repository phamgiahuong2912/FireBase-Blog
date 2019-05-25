import React, { Component } from "react";
import { firebaseDb } from "../../firebase";
import ReactLoading from "react-loading";
import "./index.scss";
import { Link } from "react-router-dom";
class BroadDetail extends Component {
  state = {
    isLoadding: true,
    objBroad: {},
  };
  componentDidMount() {
    let broadId = this.props.match.params.id;
    if (broadId) {
      firebaseDb
        .ref(`broad/${broadId}`)
        .once("value")
        .then(data => {
          this.setState({ isLoadding: false, objBroad: data.val() });
        });
    }
  }

  render() {
    let { objBroad } = this.state;
    if (this.state.isLoadding) {
      return <ReactLoading delay={0} color="tomato" width={65} height={65} type={"spinningBubbles"} className="react-loadding" />;
    }
    return (
      <div className="container">
        <Link style={{ padding: "10px 40px" }} to="/broad" className="btn btn-info">
          Back
        </Link>
        <h1 style={{ color: "#014D9F" }}>Broad Detail</h1>
        <div className="broad-detail">
          <h3 className="item">{objBroad.title}</h3>
          <div className="item">
            <h6>Description:</h6>
            <div>{objBroad.description}</div>
          </div>
          <div className="item">
            <h6>Author:</h6>
            <div>{objBroad.author}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default BroadDetail;
