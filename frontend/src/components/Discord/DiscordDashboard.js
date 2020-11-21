import React from "react";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";
import { getToken, getSubReddits } from "../../redux/actions/test";
import { getDcServers } from "../../redux/actions/discordActions";
import DiscordNav from "./DiscordNav";

const DiscordDashboard = ({ token, getToken }) => {
  React.useEffect(() => {
    if (token === null) {
      getToken();
      getSubReddits(token);
    }
  }, [getToken, token]);

  return <Container fluid>{token ? <DiscordNav /> : null}</Container>;
};

const mapStateToProps = (state) => {
  return {
    token: state.test.token,
    discord_channels: state.discord.discord_channels,
    loading: state.discord.isLoading,
  };
};

export default connect(mapStateToProps, {
  getDcServers,
  getToken,
  getSubReddits,
})(DiscordDashboard);
