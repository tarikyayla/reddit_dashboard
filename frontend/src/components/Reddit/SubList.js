import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Divider,
  Dropdown,
  Image,
  Label,
  List,
  Segment,
} from "semantic-ui-react";
import { getDcServers } from "../../redux/actions/discordActions";

import "./css/Sublist.css";
const SubList = ({ subreddits, getDcServers, token, discord_channels }) => {
  React.useEffect(() => {
    getDcServers(token);
  }, [getDcServers, token]);

  const list = (subreddit) => {
    return (
      <List.Item>
        {/* btn */}
        <List.Content floated="right">
          <Button color="green" basic size="tiny">
            Add
          </Button>
        </List.Content>
        {/* selector */}
        <List.Content floated="right">
          <Dropdown
            button
            className="icon"
            floating
            labeled
            search
            text="Select Language"
          />
          {/* +18 label */}
        </List.Content>
        <List.Content floated="right">
          {subreddit.over18 ? null : <Label color="red">+18</Label>}
        </List.Content>
        {/* specs */}

        <List.Content>
          <List.Header>
            {subreddit.icon_img === "" || subreddit.icon_img === null ? (
              <Image
                src="https://b.thumbs.redditmedia.com/S6FTc5IJqEbgR3rTXD5boslU49bEYpLWOlh8-CMyjTY.png"
                avatar
              />
            ) : (
              <Image src={subreddit.icon_img} avatar />
            )}

            <span> </span>
            {subreddit.name}
          </List.Header>
        </List.Content>
      </List.Item>
    );
  };

  return (
    <Segment inverted padded="very">
      <Divider />
      <List divided inverted relaxed>
        {subreddits.results.map((subreddit) => list(subreddit))}
      </List>
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    subreddits: state.test.subreddits,
    totalResults: state.test.totalResults,
    currentPage: state.test.currentPage,
    token: state.test.token,
    discord_channels: state.discord.discord_channels,
  };
};

export default connect(mapStateToProps, { getDcServers })(SubList);
