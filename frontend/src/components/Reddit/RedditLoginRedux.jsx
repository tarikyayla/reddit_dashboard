import React, { Component } from "react";
import {
  Button,
  Icon,
  Segment,
  Divider,
  Header,
  Image,
} from "semantic-ui-react";
import "./css/Login.css";

class RedditLogin extends Component {
  render() {
    return (
      <div className="Reddit__btn">
        <Segment>
          <Header as="h2" floated="right">
            <Button animated>
              <Button.Content visible>Reddit Login</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
          </Header>
          <Divider clearing />
          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      </div>
    );
  }
}

export default RedditLogin;
