import React, { Component } from "react";
import ReactLoading from "react-loading";
class ModalSuccess extends Component {
  render() {
    if (this.props.isLoadding) {
      return <ReactLoading delay={0} color="tomato" width={65} height={65} type={"spinningBubbles"} className="react-loadding" />;
    } else if (this.props.isOpen) {
      return (
        <div className="modal-success">
          <div className="icon">
            <div className="mark" />
          </div>
          <div className="text">{this.props.text}</div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ModalSuccess;
