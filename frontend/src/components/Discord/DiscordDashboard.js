import React from "react";
// REDUX IMPORTS
import { connect } from "react-redux";
import { getToken, getSubReddits } from "../../redux/actions/redditActions";
import { getDcServers } from "../../redux/actions/discordActions";
// UI
import { Button, Container, Grid, Segment, Menu } from "semantic-ui-react";
// COMPONENTS
import SubReddits from "../Reddit/SubReddits";
import TextChannels from "./TextChannels";
import DiscordServers from "./DiscordServers";
import SearchBox from "../Reddit/SearchBox";
import UserCard from "../Reddit/UserCard";

class DiscordDashboard extends React.Component {
  state = { activeItem: "server settings" };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  // NAVBAR FUNCTION
  renderSelectedOption = () => {
    // SERVER SETTINGS
    if (this.state.activeItem === "server settings") {
      return <DiscordServers />;
    }
    // TEXT CHANNELS
    if (this.state.activeItem === "text channels") {
      return (
        <Segment inverted raised>
          <TextChannels />
        </Segment>
      );
    }
    // SUBREDDITS
    if (this.state.activeItem === "subreddits") {
      if (this.props.subreddits.count > 0) {
        return (
          <Segment inverted>
            <SubReddits />
          </Segment>
        );
      } else {
        return (
          <Button basic color="grey">
            YOUR STACK IS EMPTY !
          </Button>
        );
      }
    }
    // ADD SUBREDDIT
    if (this.state.activeItem === "add subreddit") {
      return <SearchBox />;
    }
    if (this.state.activeItem === "user") {
      return <UserCard />;
    }
  };
  render() {
    const { activeItem } = this.state;
    return (
      <Container fluid>
        <Grid>
          <Grid.Column width={4}>
            {/* NAVBAR HEADER */}
            <Button fluid basic compact color="grey">
              Menu
            </Button>

            {/* NAVBAR CONFIG */}
            <Menu fluid inverted pointing vertical>
              <Menu.Item
                name="server settings"
                active={activeItem === "server settings"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="text channels"
                active={activeItem === "text channels"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="subreddits"
                active={activeItem === "subreddits"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="add subreddit"
                active={activeItem === "add subreddit"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="user"
                active={activeItem === "user"}
                onClick={this.handleItemClick}
              />
            </Menu>
          </Grid.Column>

          {/* RENDER NAVBAR */}
          <Grid.Column width={12}>{this.renderSelectedOption()}</Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.test.token,
    discord_channels: state.discord.discord_channels,
    loading: state.discord.isLoading,
    text_channels: state.discord.discord_channels.text_channels,
    subreddits: state.test.subreddits,
  };
};

export default connect(mapStateToProps, {
  getDcServers,
  getToken,
  getSubReddits,
})(DiscordDashboard);
