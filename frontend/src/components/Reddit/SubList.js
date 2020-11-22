import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Divider,
  Header,
  Image,
  Label,
  List,
  Segment,
} from "semantic-ui-react";
import {
  getDcServers,
  addSubredditToTextChannel,
} from "../../redux/actions/discordActions";
import { removeSubreddit } from "../../redux/actions/redditActions";
import { useAlert } from "react-alert";

const SubList = ({ subreddits, getDcServers, token, removeSubreddit }) => {
  React.useEffect(() => {
    getDcServers(token);
  }, [getDcServers, token]);

  const alert = useAlert();

  const handleDeleteSubReddit = (id) => {
    removeSubreddit(id, token);
    alert.error("Subreddit deleted!");
  };

  const list = (subreddit) => {
    return (
      <List.Item>
        <List.Content floated="right">
          <Button
            onClick={() => handleDeleteSubReddit(subreddit.id)}
            color="red"
            basic
            size="tiny"
          >
            Delete
          </Button>
        </List.Content>

        <List.Content floated="right">
          {subreddit.over18 ? <Label color="red">+18</Label> : null}
        </List.Content>

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
      <Header as="h2">
        Subreddits <Label color="grey">{subreddits.count}</Label>
      </Header>
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
    currentTextChannel: state.discord.currentTextChannel,
  };
};

export default connect(mapStateToProps, {
  getDcServers,
  addSubredditToTextChannel,
  removeSubreddit,
})(SubList);
