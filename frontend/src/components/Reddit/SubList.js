import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Divider,
  Header,
  Image,
  Label,
  List,
  Pagination,
  Segment,
} from "semantic-ui-react";
import {
  getDcServers,
  addSubredditToTextChannel,
} from "../../redux/actions/discordActions";
import {
  removeSubreddit,
  subredditsListPagination,
} from "../../redux/actions/redditActions";
import { useAlert } from "react-alert";

const SubList = ({
  subreddits,
  getDcServers,
  token,
  removeSubreddit,
  totalResults,
  subredditsListPagination,
  next,
  prev,
  currentPage,
}) => {
  const alert = useAlert();
  React.useEffect(() => {
    getDcServers(token);
  }, [getDcServers, token]);

  const handlePagination = (e) => {
    let number = Number(e.target.text);
    if (isNaN(number)) {
      let option = e.target.text;
      if (option === "⟩") {
        if (next !== null) {
          subredditsListPagination(next, token, null, currentPage);
        }
      }
      if (option === "⟨") {
        if (prev !== null) {
          subredditsListPagination(prev, token, null, currentPage);
        }
      }
    } else {
      subredditsListPagination(null, token, null, number);
    }
  };

  const handleDeleteSubReddit = (id) => {
    removeSubreddit(id, token);
    alert.error("Subreddit deleted!");
  };

  return (
    <Segment inverted padded="very">
      <Header as="h2">
        Subreddits <Label color="grey">{subreddits.count}</Label>
      </Header>
      <Divider />
      <List divided inverted relaxed>
        {subreddits.results.map((subreddit) => (
          <List.Item key={subreddit.id}>
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
        ))}
      </List>
      <Pagination
        defaultActivePage={1}
        firstItem={null}
        lastItem={null}
        pointing
        secondary
        totalPages={Math.ceil(totalResults / 20)}
        inverted
        onClick={handlePagination}
        nextItem={next !== null ? "⟩" : null}
        prevItem={prev !== null ? "⟨" : null}
      />
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
    next: state.test.subreddits.next,
    prev: state.test.subreddits.previous,
  };
};

export default connect(mapStateToProps, {
  getDcServers,
  addSubredditToTextChannel,
  removeSubreddit,
  subredditsListPagination,
})(SubList);
