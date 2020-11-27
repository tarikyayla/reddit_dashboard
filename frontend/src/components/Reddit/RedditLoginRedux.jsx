import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Icon,
  Header,
  Form,
  Grid,
  Segment,
  Divider,
} from "semantic-ui-react";
import "./Login.css";

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
        <Grid.Column>
          <Header as="h2" color="grey" textAlign="center">
            <Icon name="reddit" />
            Log-in to your account
          </Header>
          <Divider />
          <Form>
            <Segment raised inverted>
              {/* LOGIN BUTTON */}
              <Button
                onClick={redditButton}
                basic
                color="grey"
                fluid
                size="big"
              >
                Login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    redirect_link: state.test.redditAuth.redirect_link,
    url: state.test.redditAuth.redirect_link,
  };
};

export default connect(mapStateToProps)(RedditLoginPage);
