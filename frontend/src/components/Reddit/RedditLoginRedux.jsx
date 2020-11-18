import React from "react";
import { connect } from "react-redux";
import { Button, Icon, Header, Image, Form, Grid } from "semantic-ui-react";
import "./css/Login.css";

const RedditLoginPage = ({ isRedditAuthActive, url }) => {
  const redditButton = () => {
    if (!isRedditAuthActive) {
      let redirectUrl = url;
      window.open(redirectUrl, "_self");
    }
  };
  return (
    <div className="redirect_page">
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" textAlign="center">
            <Image>
              <Icon name="github" />
            </Image>
            Log-in to your account
          </Header>
          <Form size="large">
            <Button
              onClick={() => redditButton()}
              color="blue"
              fluid
              size="massive"
            >
              Reddit Login
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.test.token,
    headers: state.test.headers,
    user: state.test.user,
    redirect_link: state.test.redditAuth.redirect_link,
    isRedditAuthActive: state.test.redditAuth.active,
    url: state.test.redditAuth.redirect_link,
  };
};

export default connect(mapStateToProps)(RedditLoginPage);
