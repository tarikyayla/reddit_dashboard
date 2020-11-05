import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Icon,
  Segment,
  Divider,
  Header,
  Image,
} from "semantic-ui-react";
import "./css/Login.css";
import * as userActions from "../redux/actions/userActions";
import { bindActionCreators } from "redux";

class RedditLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      redditAuth: {
        active: false,
      },
    };
  }

  componentDidMount() {
    this.getAuthToken();
  }

  fetchUserAuth = () => {
    fetch("/api/reddit-auth", {
      headers: this.state.header,
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.parseUserDetail(data);
      });
  };

  parseUserDetail = (userData) => {
    let redditAuth = {};
    redditAuth.active = userData.active;
    if (redditAuth.active) {
      redditAuth.username = userData.username;
      redditAuth.userDetail = JSON.parse(userData.user_data);
    } else {
      redditAuth.redirectUrl = userData.redirect_link;
    }
    this.setState({ redditAuth });
    console.log(redditAuth);
  };

  getAuthToken = () => {
    fetch("/api/get-api-token")
      .then((resp) => resp.json())
      .then((data) => {
        let header = this.state.header;
        header.Authorization = data.token;
        this.setState({ header }, () => this.fetchUserAuth());
      });
  };

  onUrlChange = (event) => {
    console.log(event);
  };

  redditButton = () => {
    if (!this.state.redditAuth.active && this.state.redditAuth.redirectUrl) {
      let redirectUrl = this.state.redditAuth.redirectUrl;
      window.open(redirectUrl, "_self");
    }
  };

  render() {
    return (
      <div className="Reddit__btn">
        <Segment>
          <Header as="h2" floated="right">
            {!this.props.redditAuth.active && (
              <Button onClick={this.props.actions.redditButton} animated>
                <Button.Content visible>Reddit Login</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            )}
          </Header>
          <Divider clearing />
          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.redditLoginReducer,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      redditAuth: bindActionCreators(userActions.redditAuth, dispatch),
      redditButton: bindActionCreators(userActions.redditButton, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RedditLogin);
