import React from "react";
// REDUX IMPORTS
import { connect } from "react-redux";
import {
  getSubReddits,
  refreshSubreddits,
} from "../../redux/actions/redditActions";
import {
  getDcServers,
  createTextChannel,
} from "../../redux/actions/discordActions";
// UI
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
// ALERT
import { useAlert } from "react-alert";

const DiscordServers = ({
  discord_channels,
  getDcServers,
  token,
  createTextChannel,
  add_url,
  refreshSubreddits,
  getSubReddits,
}) => {
  // ALERT SETUP
  const alert = useAlert();

  React.useEffect(() => {
    getDcServers(token);
    refreshSubreddits(token);
    getSubReddits(token);
  }, [refreshSubreddits, token, getSubReddits, getDcServers]);

  // ADD NEW DISCORD CHANNEL
  const handleAddNewDiscordServer = () => {
    window.open(add_url, "_self");
  };

  // ADD NEW TEXT CHANNEL TO DISCORD SERVER
  const handleAdd = (discordId, dcServerName) => {
    let textChannelName = document
      .getElementById("textChannelName")
      .value.trim();
    let textChannelId = document.getElementById("textChannelId").value.trim();

    if (textChannelName === "" || textChannelId === "") {
      // EMPTY AREA ERROR
      alert.error("EMPTY AREA !");
    } else {
      if (isNaN(textChannelId)) {
        // NUMBER ERROR
        alert.error("ID MUST BE A NUMBER !");
      } else {
        // SUCCESS
        createTextChannel(textChannelName, textChannelId, discordId, token);
        alert.success(`${textChannelName} added to ${dcServerName}!`);
      }
    }

    // REFRESH TEXT CHANNEL DATA
    getDcServers(token);
  };

  return (
    <Segment inverted padded="very">
      <Header color="grey" as="h1">
        Active Servers
        {/* COUNT OF ACTIVE DISCORD CHANNELS */}
        <Label size="small" color="grey">
          {discord_channels.length}
        </Label>
      </Header>
      <Divider />
      {/* LIST OF SERVERS */}
      {discord_channels.length > 0 ? (
        <List divided inverted relaxed>
          {discord_channels.map((channel) => (
            <List.Item key={channel.id}>
              <List.Content>
                <List.Header as="h2" padded="very">
                  {/* CHANNEL NAME */}
                  {channel.name}
                  {channel.text_channels.length === 0 ? (
                    //  IF THERE IS NO TEXT CHANNEL - NO TEXT CHANNEL TAG
                    <Label as="a" size="small" pointing="left" color="red">
                      No text channel
                    </Label>
                  ) : (
                    // COUNT OF ACTIVE TEXT CHANNELS
                    <Label
                      as="a"
                      size="small"
                      pointing="left"
                      color="green"
                      floated="right"
                    >
                      {channel.text_channels.length} active text channel
                    </Label>
                  )}
                  {/* ADD TEXT CHANNEL TO DISCORD SERVER */}
                  <Segment inverted>
                    <Form
                      onSubmit={(e) => {
                        handleAdd(channel.id, channel.name);
                      }}
                    >
                      <Input
                        icon="chain"
                        iconPosition="left"
                        placeholder="Enter Text Channel Name"
                        transparent
                        size="big"
                        id="textChannelName"
                        fluid
                      />
                      <Divider />
                      <Input
                        icon="chain"
                        iconPosition="left"
                        placeholder="Enter Text Channel ID"
                        transparent
                        size="big"
                        id="textChannelId"
                      />
                      <Divider />
                      <Button fluid basic color="green">
                        Add
                      </Button>
                    </Form>
                  </Segment>
                </List.Header>
              </List.Content>
            </List.Item>
          ))}
        </List>
      ) : (
        <Button basic color="grey" fluid compact>
          NO DISCORD SERVER !
        </Button>
      )}

      <Divider />
      {/* ADD NEW DISCORD SERVER */}
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
  refreshSubreddits,
})(DiscordServers);
