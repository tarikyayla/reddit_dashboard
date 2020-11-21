import React from "react";
import { connect } from "react-redux";

import {
  Divider,
  Header,
  Label,
  List,
  Segment,
  Button,
  Dropdown,
  Popup,
  Icon,
  Image,
  Card,
  Item,
} from "semantic-ui-react";
import {
  deleteTextChannel,
  getDcServers,
  addSubredditToTextChannel,
} from "../../redux/actions/discordActions";

import { success } from "../../redux/actions/alertActions";
import { getSubReddits } from "../../redux/actions/test";

const TextChannels = ({
  discord_channels,
  deleteTextChannel,
  token,
  getDcServers,
  subreddits,
  addSubredditToTextChannel,
  success,
  getSubReddits,
}) => {
  const handleDeleteTextChannel = (textChannelId) => {
    deleteTextChannel(token, textChannelId);
    getDcServers(token);
    getDcServers(token);
  };

  const handleDropData = (subredditName, idForFetch, idForSubreddit) => {
    addSubredditToTextChannel(idForFetch, idForSubreddit, token);
    getSubReddits(token);
    getDcServers(token);

    success();
  };

  return (
    <Segment inverted padded="very">
      <Header as="h1">Text Channels</Header> <Divider />
      {discord_channels.map((channel) => (
        <>
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
                <List.Item>
                  <List.Content floated="right">
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
                        button
                        compact
                        placeholder="add subreddit to this channel"
                      >
                        <Dropdown.Menu>
                          {subreddits.results.map((subreddit) => (
                            <Dropdown.Item
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
                      </Dropdown>
                    </List.Content>
                  )}
                  <List.Content>
                    <List.Header>
                      <Icon size="large" name="discord" /> Channel Name :{" "}
                      {textChannel.slug}
                    </List.Header>
                    <Icon size="large" /> Channel ID :
                    <strong>{textChannel.channel_id}</strong>
                  </List.Content>
                  <Divider />
                  <Segment inverted vertical>
                    {textChannel.following_subreddits.length > 0 ? (
                      <>
                        {" "}
                        <Header>
                          <Button basic color="green" compact fluid>
                            Following Subreddits
                          </Button>
                        </Header>
                        <List animated verticalAlign="middle" ordered inverted>
                          {textChannel.following_subreddits.map(
                            (followingSubreddit) => (
                              <>
                                <Popup
                                  inverted
                                  trigger={
                                    <List.Item size="massive">
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
                                      <List.Content>
                                        <List.Header>
                                          {followingSubreddit.name}
                                        </List.Header>
                                        <strong>Subscribers :</strong>{" "}
                                        {followingSubreddit.subscribers}
                                      </List.Content>
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
                                    {" "}
                                    {
                                      followingSubreddit.subscribers
                                    } subscribers{" "}
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
                              </>
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
        </>
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
  };
};

export default connect(mapStateToProps, {
  deleteTextChannel,
  getDcServers,
  addSubredditToTextChannel,
  success,
  getSubReddits,
})(TextChannels);
