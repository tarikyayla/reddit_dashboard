import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Divider,
  Form,
  Header,
  Input,
  Label,
  List,
  Segment,
} from "semantic-ui-react";
import {
  getDcServers,
  createTextChannel,
} from "../../redux/actions/discordActions";

const DiscordServers = ({
  discord_channels,
  getDcServers,
  token,
  createTextChannel,
  add_url,
}) => {
  const handleAddNewDiscordServer = () => {
    window.open(add_url, "_self");
  };

  const handleAdd = (channel_id, discord__id) => {
    if (channel_id !== null && channel_id !== "" && discord__id !== undefined) {
      if (isNaN(channel_id)) {
        // Number Error
        console.log("pls enter a number");
      } else {
        createTextChannel("Genel", channel_id, discord__id, token);
        getDcServers(token);
        console.log("ok");
      }
    } else {
      // Empty Area Error
      console.log("no empty");
    }
  };

  const serverList = (channel) => {
    return (
      <List.Item>
        <List.Content>
          <List.Header as="h2">
            {channel.name}
            {channel.text_channels.length === 0 ? (
              <>
                <Label
                  as="a"
                  size="mini"
                  pointing="left"
                  horizontal
                  color="red"
                >
                  No text channel
                </Label>
                <Form
                  onSubmit={(e) => handleAdd(e.target[0].value, channel.id)}
                >
                  <Input
                    placeholder="Enter Text Channel ID"
                    fluid
                    transparent
                  />
                  <Divider />
                  <Button basic fluid primary>
                    Add Text Channel
                  </Button>
                </Form>
              </>
            ) : (
              <>
                <Label as="a" size="mini" pointing="left" color="green">
                  {channel.text_channels.length} active text channel
                </Label>
                <Form
                  onSubmit={(e) => handleAdd(e.target[0].value, channel.id)}
                >
                  <Input
                    placeholder="Enter Text Channel ID"
                    fluid
                    transparent
                  />
                  <Divider />
                  <Button basic fluid primary>
                    Add Text Channel
                  </Button>
                </Form>
              </>
            )}
          </List.Header>
        </List.Content>
      </List.Item>
    );
  };

  return (
    <Segment inverted padded="very">
      <Header as="h1" textAlign="center">
        Active Servers <Label color="green">{discord_channels.length}</Label>
      </Header>
      <Divider />

      {/* LIST OF SERVERS */}

      <List divided inverted relaxed>
        {discord_channels.map((channel) => serverList(channel))}
      </List>

      <Button onClick={handleAddNewDiscordServer} compact circular fluid>
        Add New Discord Server
      </Button>
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

export default connect(mapStateToProps, { getDcServers, createTextChannel })(
  DiscordServers
);
