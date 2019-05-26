import React, { Component } from "react";
class Pagination extends Component {
  state = {
    currentPage: 1,
    limit: 5,
    pageSize: 5,
    startIndex: "",
    endIndex: "",
  };
  componentWillMount() {
    this._setPage();
  }
  _setPage = () => {
    let { listBroad } = this.props;
    let { currentPage, limit, pageSize, startIndex, endIndex } = this.state;
    let startPage, endPage;
    let listPage = [];
    let totalPage = Math.ceil(listBroad.length / limit);
    startIndex = (currentPage - 1) * limit;
    endIndex = Math.min(startIndex + limit);
    if (totalPage <= pageSize) {
      startPage = 1;
      endPage = totalPage;
    } else {
      let maxPageBefore = Math.floor(pageSize / 2);
      let maxPageAfter = Math.ceil(pageSize / 2);
      if (currentPage <= maxPageBefore) {
        startPage = 1;
        endPage = pageSize;
      } else if (currentPage + maxPageBefore >= totalPage) {
        startPage = totalPage - pageSize + 1;
        endPage = totalPage;
      } else {
        startPage = currentPage - maxPageBefore;
        endPage = currentPage + maxPageAfter - 1;
      }
    }

    listPage = [...Array(endPage + 1 - startPage).keys()].map(i => startPage + i);
    this.setState({ listPage }, () => this._getPage(startIndex, endIndex));
  };
  _getPage = (startIndex, endIndex) => {
    let { listBroad } = this.props;
    let listTemp = [];
    listTemp = listBroad.slice(startIndex, endIndex);
    this.props.onChangePage(listTemp);
  };
  render() {
    let { listPage } = this.state;
    return (
      <div className="pagination">
        {listPage.map((page, index) => (
          <div
            key={index}
            className={page === this.state.currentPage ? "index active" : "index"}
            onClick={() => this.setState({ currentPage: page }, () => this._setPage())}>
            {page}
          </div>
        ))}
      </div>
    );
  }
}

export default Pagination;
