import React, { Component } from "react";
import FollowList from "../Reddit/FollowList";
import RedditLogin from "../Reddit/RedditLogin";
import SearchBox from "../Reddit/SearchBox";
import "./Dashboard.css";
class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="dashboard__container">
          <div class="ui inverted menu"></div>
          <RedditLogin />
          <SearchBox />
          <FollowList />
        </div>
      </div>
    );
  }
}

export default Dashboard;
