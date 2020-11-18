import React from "react";
import { connect } from "react-redux";
import {
  Divider,
  Header,
  Label,
  List,
  Segment,
  Button,
} from "semantic-ui-react";
import {
  deleteTextChannel,
  getDcServers,
} from "../../redux/actions/discordActions";

const TextChannels = ({
  discord_channels,
  deleteTextChannel,
  token,
  getDcServers,
}) => {
  const handleDeleteTextChannel = (textChannelId) => {
    deleteTextChannel(token, textChannelId);
    getDcServers(token);
  };

  const serverList = (channel) => {
    return (
      <>
        <Header as="h2">
          {channel.name}
          {channel.text_channels.length === 0 ? (
            <>
              <Label as="a" size="mini" pointing="left" horizontal color="red">
                No text channel
              </Label>
            </>
          ) : (
            <>
              <Label as="a" size="mini" pointing="left" color="green">
                {channel.text_channels.length} active text channel
              </Label>
            </>
          )}
        </Header>

        {/* TEXT CHANNELS */}
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
                <List.Content>
                  <List.Header>{textChannel.slug}</List.Header>
                  Channel ID : <strong>{textChannel.channel_id}</strong>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Segment>
      </>
    );
  };

  return (
    <Segment inverted padded="very">
      <Header as="h1">Active Text Channels</Header>
      <Divider />
      {discord_channels.map((channel) => serverList(channel))}
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.test.token,
    discord_channels: state.discord.discord_channels,
    add_url: state.discord.add_url,
  };
};

export default connect(mapStateToProps, {
  deleteTextChannel,
  getDcServers,
})(TextChannels);
