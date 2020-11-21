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
import { getSubReddits } from "../../redux/actions/test";

const DiscordServers = ({
  discord_channels,
  getDcServers,
  token,
  createTextChannel,
  add_url,
  getSubReddits,
}) => {
  React.useEffect(() => {
    getSubReddits(token);
  });

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
        channel_id = "";
      }
    } else {
      // Empty Area Error
      console.log("no empty1");
    }
  };

  const serverList = (channel) => {
    return (
      <List.Item>
        <List.Content>
          <List.Header as="h2" padded="very">
            {channel.name}
            {channel.text_channels.length === 0 ? (
              <>
                <Label as="a" compact size="small" pointing="left" color="red">
                  No text channel
                </Label>
                <Segment inverted>
                  <Form
                    onSubmit={(e) => {
                      handleAdd(e.target[0].value, channel.id);
                    }}
                  >
                    <Input
                      icon="chain"
                      iconPosition="left"
                      placeholder="Enter Text Channel ID"
                      transparent
                      size="big"
                    />{" "}
                    <Button floated="right" compact basic color="grey">
                      Add Text Channel
                    </Button>
                  </Form>
                </Segment>
              </>
            ) : (
              <>
                <Label
                  as="a"
                  size="small"
                  pointing="left"
                  color="green"
                  compact
                  floated="right"
                >
                  {channel.text_channels.length} active text channel
                </Label>
                <Segment inverted>
                  <Form
                    onSubmit={(e) => {
                      console.log("dsa");
                      handleAdd(e.target[0].value, channel.id);
                    }}
                  >
                    <Input
                      icon="chain"
                      iconPosition="left"
                      placeholder="Enter Text Channel ID"
                      transparent
                      size="big"
                    />{" "}
                    <Button floated="right" compact basic color="grey">
                      Add Text Channel
                    </Button>
                  </Form>
                </Segment>
              </>
            )}
          </List.Header>
        </List.Content>
      </List.Item>
    );
  };

  return (
    <Segment inverted padded="very">
      <Header as="h1">
        Active Servers
        <Label compact size="big" color="grey">
          {discord_channels.length}
        </Label>
      </Header>
      <Divider />

      {/* LIST OF SERVERS */}

      <List divided inverted relaxed>
        {discord_channels.map((channel) => serverList(channel))}
      </List>
      <Divider />
      <Button onClick={handleAddNewDiscordServer} basic primary fluid>
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

export default connect(mapStateToProps, {
  getDcServers,
  createTextChannel,
  getSubReddits,
})(DiscordServers);
