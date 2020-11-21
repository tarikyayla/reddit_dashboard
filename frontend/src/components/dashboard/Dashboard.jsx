import React, { Component } from "react";
import { connect } from "react-redux";
import { getToken, btnClicked } from "../../redux/actions/test";
import RedditLoginRedux from "../Reddit/RedditLoginRedux";
import { getUserDataFail } from "../../redux/actions/test";
import SubReddits from "../Reddit/SubReddits";
import { Container } from "semantic-ui-react";

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
    isLoginActive: state.test.redditLoginBtn,
    url: state.test.redditAuth.redirect_link,
    user: state.test.user,
    token: state.test.token,
  };
};

export default connect(mapStateToProps, {
  getUserDataFail,
  getToken,
  btnClicked,
})(Dashboard);
