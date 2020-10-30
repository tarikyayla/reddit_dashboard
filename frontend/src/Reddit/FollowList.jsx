import React, { Component } from "react";
import styles from "./css/FollowList.css";
import { Segment, List, Header } from "semantic-ui-react";
class FollowList extends Component {
  render() {
    return (
      <div className="Reddit__followList">
        <Header color="grey">Following</Header>
        <Segment inverted>
          <List divided inverted relaxed>
            <List.Item>
              <List.Content color="grey">
                <List.Header>1</List.Header>
                test1
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>2</List.Header>test2
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>3</List.Header>
                test3
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      </div>
    );
  }
}

export default FollowList;
