import React, { Component } from "react";
import { connect } from "react-redux";
import { getToken, btnClicked } from "../../redux/actions/test";
import RedditLoginRedux from "../Reddit/RedditLoginRedux";
import { getUserDataFail } from "../../redux/actions/test";
import SubReddits from "../Reddit/SubReddits";
import UserCard from "../Reddit/UserCard";
import Navbar from "../dashboard/Navbar";
import SearchBox from "../Reddit/SearchBox";
import "./d.css";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getToken();
  }

  render() {
    return (
      <div>
        {!this.props.user ? (
          <RedditLoginRedux />
        ) : (
          <>
            <Navbar />
            <div className="boxes">
              <div className="user-card">
                <UserCard />
              </div>
              <div className="s-box">
                <SearchBox />
              </div>
            </div>
            <SubReddits />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginActive: state.test.redditLoginBtn,
    url: state.test.redditAuth.redirect_link,
    user: state.test.user,
  };
};

export default connect(mapStateToProps, {
  getUserDataFail,
  getToken,
  btnClicked,
})(Dashboard);
