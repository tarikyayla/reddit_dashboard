import React, { Component } from "react";
// REDUX IMPORTS
import { connect } from "react-redux";
import { getToken, getUserDataFail } from "../../redux/actions/redditActions";
import RedditLoginRedux from "../Reddit/RedditLoginRedux";
// UI
import { Container } from "semantic-ui-react";
import SubReddits from "../Reddit/SubReddits";

class Dashboard extends Component {
  componentDidMount() {
    if (this.props.token === null) {
      this.props.getToken();
    }
  }

  render() {
    return (
      <>
        {this.props.user === null ? (
          <RedditLoginRedux />
        ) : (
          <Container>
            <SubReddits />
          </Container>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.test.redditAuth.redirect_link,
    user: state.test.user,
    token: state.test.token,
  };
};

export default connect(mapStateToProps, {
  getUserDataFail,
  getToken,
})(Dashboard);
