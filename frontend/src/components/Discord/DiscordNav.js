import React from "react";
import { connect } from "react-redux";
import { getToken, getSubReddits } from "../../redux/actions/test";
import { getDcServers } from "../../redux/actions/discordActions";
import { Grid, Segment, Menu, Button } from "semantic-ui-react";
import TextChannels from "./TextChannels";
import DiscordServers from "./DiscordServers";
import SubReddits from "../Reddit/SubReddits";
import SearchBox from "../Reddit/SearchBox";

class DiscordServerList extends React.Component {
  state = { activeItem: "server settings" };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  componentDidMount() {
    this.props.getDcServers(this.props.token);
  }

  renderSelectedOption = () => {
    if (this.state.activeItem === "server settings") {
      return <DiscordServers />;
    }
    if (this.state.activeItem === "text channels") {
      return (
        <Segment inverted raised>
          <TextChannels />
        </Segment>
      );
    }
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
    if (this.state.activeItem === "add subreddit") {
      return <SearchBox />;
    }
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Grid>
        <Grid.Column width={4}>
          <Button fluid basic color="grey">
            Menu
          </Button>

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
          </Menu>
        </Grid.Column>

        <Grid.Column width={12}>{this.renderSelectedOption()}</Grid.Column>
      </Grid>
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
})(DiscordServerList);
