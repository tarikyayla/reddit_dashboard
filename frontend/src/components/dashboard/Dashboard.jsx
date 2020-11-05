import React, { Component } from "react";
import RedditLoginRedux from "../Reddit/RedditLoginRedux";
import SearchBox from "../Reddit/SearchBox";
import SubReddits from "../Reddit/SubReddits";

import "./Dashboard.css";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard__container">
        <RedditLoginRedux />
        <SearchBox />
        <SubReddits />
      </div>
    );
  }
}

export default Dashboard;
