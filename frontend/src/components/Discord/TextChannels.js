import React from "react";
// REDUX IMPORTS
import { connect } from "react-redux";
import {
  getSubReddits,
  refreshSubreddits,
} from "../../redux/actions/redditActions";
import {
  deleteTextChannel,
  getDcServers,
  addSubredditToTextChannel,
  searchFollowingSubreddits,
} from "../../redux/actions/discordActions";
// UI
import {
  Divider,
  Header,
  Label,
  List,
  Segment,
  Button,
  Popup,
  Icon,
  Image,
  Item,
  Dropdown,
} from "semantic-ui-react";
// ALERT
import { useAlert } from "react-alert";

const TextChannels = ({
  discord_channels,
  deleteTextChannel,
  token,
  getDcServers,
  subreddits,
  addSubredditToTextChannel,
  getSubReddits,
  searchedFollowList,
  searchFollowingSubreddits,
  refreshSubreddits,
}) => {
  // ALERT SETUP
  const alert = useAlert();
  React.useEffect(() => {
    refreshSubreddits(token);
    getSubReddits(token);
  }, [getSubReddits, token, refreshSubreddits]);

  const handleChange = (e) => {
    let text = e.target.value.trim();
    if (searchedFollowList !== [] && text !== "") {
      searchFollowingSubreddits(text, token);
    }
  };

  const handleDeleteTextChannel = (textChannelId) => {
    deleteTextChannel(token, textChannelId);
    alert.error("TEXT CHANNEL DELETED!");
    getDcServers(token);
    // REFRESH
    getDcServers(token);
  };

  // ADD SUBREDDIT
  const handleDropData = (subredditName, idForFetch, idForSubreddit) => {
    addSubredditToTextChannel(idForFetch, idForSubreddit, token);
    // REFRESH FOLLOW LIST
    getDcServers(token);
    alert.success(`${subredditName} added!`);
  };
  return (
    <Segment inverted padded="very">
      <Header color="grey" as="h1">
        Text Channels
      </Header>
      <Divider />
      {discord_channels.map((channel) => (
        <div key={channel.id}>
          {/* TEXT CHANNEL NAME */}
          <Header as="h2">
            <Button basic size="big" color="grey">
              <Icon name="dot circle" /> {channel.name}
            </Button>

            {channel.text_channels.length === 0 ? (
              <>
                <Label as="a" size="mini" pointing="left" color="red">
                  No text channel
                </Label>
              </>
            ) : (
              <>
                <Label as="a" size="small" pointing="left" color="green">
                  {channel.text_channels.length} active text channel
                </Label>
              </>
            )}
          </Header>

          <Segment inverted>
            <List divided inverted relaxed>
              {channel.text_channels.map((textChannel) => (
                <List.Item key={textChannel.id}>
                  <List.Content floated="right">
                    {/* DELETE TEXT CHANNEL */}
                    <Button
                      onClick={() => handleDeleteTextChannel(textChannel.id)}
                      color="red"
                      basic
                      size="tiny"
                    >
                      Delete
                    </Button>
                  </List.Content>

                  {subreddits.results === undefined ||
                  subreddits.results.length === 0 ? (
                    <List.Content floated="right">
                      {/* EMPTY SUBREDDIT STACK */}
                      <Popup
                        content="Empty subreddit stack ! Please add some subreddit .
                        "
                        trigger={
                          <Button basic compact color="yellow" icon="add" />
                        }
                      />
                    </List.Content>
                  ) : (
                    <List.Content floated="right">
                      <Dropdown
                        scrolling
                        search
                        compact
                        button
                        placeholder="follow subreddit"
                        onSearchChange={handleChange}
                      >
                        {searchedFollowList.length > 0 ? (
                          <Dropdown.Menu>
                            {/* SEARCH SUBREDDIT AND ADD */}
                            {searchedFollowList.map((searchedItem) => (
                              <Dropdown.Item
                                key={searchedItem.id}
                                onClick={(e) => {
                                  handleDropData(
                                    e.target.innerText,
                                    textChannel.id,
                                    searchedItem.id
                                  );
                                }}
                              >
                                <Icon name="reddit" /> {searchedItem.name}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        ) : (
                          <Dropdown.Menu>
                            {/* GET DEFAULT LIST */}
                            {subreddits.results.map((subreddit) => (
                              <Dropdown.Item
                                key={subreddit.id}
                                onClick={(e) => {
                                  handleDropData(
                                    e.target.innerText,
                                    textChannel.id,
                                    subreddit.id
                                  );
                                }}
                              >
                                <Icon name="reddit" /> {subreddit.name}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        )}
                      </Dropdown>
                    </List.Content>
                  )}
                  <List.Content>
                    <List.Header>
                      <Icon size="large" name="discord" /> Channel Name :
                      {textChannel.slug}
                    </List.Header>
                    <Icon size="large" /> Channel ID :
                    <strong>{textChannel.channel_id}</strong>
                  </List.Content>
                  <Divider />
                  <Segment inverted>
                    {textChannel.following_subreddits.length > 0 ? (
                      <>
                        <Header>
                          <Button basic color="green" compact>
                            Following Subreddits
                          </Button>
                        </Header>
                        <Divider />
                        <List animated>
                          {textChannel.following_subreddits.map(
                            (followingSubreddit) => (
                              <div key={followingSubreddit.id}>
                                {/* SUBREDDIT POPUP */}
                                <Popup
                                  inverted
                                  trigger={
                                    <List.Item>
                                      {followingSubreddit.icon_img === "" ||
                                      followingSubreddit.icon_img === null ? (
                                        <Image
                                          src="https://b.thumbs.redditmedia.com/S6FTc5IJqEbgR3rTXD5boslU49bEYpLWOlh8-CMyjTY.png"
                                          avatar
                                        />
                                      ) : (
                                        <Image
                                          avatar
                                          src={followingSubreddit.icon_img}
                                        />
                                      )}
                                      {followingSubreddit.name}
                                      <List.Content floated="right">
                                        <Header>Subscribers</Header>
                                        <Icon name="reddit" />
                                        {followingSubreddit.subscribers}
                                      </List.Content>
                                      <Divider />
                                    </List.Item>
                                  }
                                >
                                  {/* POP-UP DATA */}
                                  <Header>
                                    {followingSubreddit.icon_img === "" ||
                                    followingSubreddit.icon_img === null ? (
                                      <Image
                                        src="https://b.thumbs.redditmedia.com/S6FTc5IJqEbgR3rTXD5boslU49bEYpLWOlh8-CMyjTY.png"
                                        avatar
                                      />
                                    ) : (
                                      <Image
                                        avatar
                                        src={followingSubreddit.icon_img}
                                      />
                                    )}
                                    {followingSubreddit.name}
                                  </Header>
                                  <Item>
                                    {followingSubreddit.subscribers} subscribers
                                  </Item>
                                  {!followingSubreddit.over18 ? null : (
                                    <Button
                                      size="mini"
                                      icon
                                      compact
                                      basic
                                      color="red"
                                    >
                                      <Icon name="user" /> +18
                                    </Button>
                                  )}
                                </Popup>
                              </div>
                            )
                          )}
                        </List>
                      </>
                    ) : (
                      <>
                        <Segment inverted vertical>
                          <Button basic color="grey" compact fluid>
                            THIS CHANNEL IS NOT FOLLOWING ANY SUBREDDIT!
                          </Button>
                        </Segment>
                      </>
                    )}
                  </Segment>
                </List.Item>
              ))}
              <Divider />
            </List>
          </Segment>
        </div>
      ))}
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.test.token,
    discord_channels: state.discord.discord_channels,
    add_url: state.discord.add_url,
    subreddits: state.test.subreddits,
    searchedFollowList: state.discord.searchedFollowList.data,
  };
};

export default connect(mapStateToProps, {
  deleteTextChannel,
  getDcServers,
  addSubredditToTextChannel,
  getSubReddits,
  searchFollowingSubreddits,
  refreshSubreddits,
})(TextChannels);
