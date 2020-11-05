import React from "react";
import { connect } from "react-redux";
import { List, Image, Button } from "semantic-ui-react";

const SubReddits = ({ getSubReddits }) => (
  <List>
    <Button onClick={() => getSubReddits()}>get subreddits</Button>

    <List.Item>
      <Image
        avatar
        src="https://react.semantic-ui.com/images/avatar/small/rachel.png"
      />
      <List.Content>
        <List.Header as="a">Rachel</List.Header>
        <List.Description>Last seen watching just now.</List.Description>
      </List.Content>
    </List.Item>
  </List>
);

const mapStateToProps = (state) => {
  console.log(state);
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSubReddits: () => dispatch({ type: "GET_SUBREDDITS" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubReddits);
