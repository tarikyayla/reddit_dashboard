import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  Container,
  Grid,
  Header,
  List,
  Segment,
} from "semantic-ui-react";
import { getToken, getSubReddits } from "../../redux/actions/test";
import { getDcServers } from "../../redux/actions/discordActions";

const DiscordDashboard = ({
  token,
  getDcServers,
  getToken,
  discord_channels,
  loading,
}) => {
  React.useEffect(() => {
    if (token === null) {
      getToken();
      getSubReddits(token);
    }
  }, [getToken, token]);

  const handleGetDcServers = () => {
    getDcServers(token);
  };

  return (
    <Container>
      <Segment inverted>
        <Header as="h1" textAlign="center">
          Welcome to Discord panel!
        </Header>
      </Segment>
      <Grid>
        <Grid.Row>
          <Grid.Column width={6}>
            <Header as="h1">User Data</Header>
            <Card>
              <Card.Content>
                <Card.Header>Steve Sanders</Card.Header>
                <Card.Meta>Friends of Elliot</Card.Meta>
                <Card.Description>
                  Steve wants to add you to the group
                  <strong>best friends</strong>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button basic color="green">
                  Active
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={10}>
            {/* LIST */}
            <Segment>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Header as="h1">Channels</Header>
                  </Grid.Column>
                  <Grid.Column>
                    {loading ? (
                      <Button floated="right" size="mini" loading>
                        Refresh
                      </Button>
                    ) : (
                      <Button
                        onClick={handleGetDcServers}
                        floated="right"
                        size="mini"
                      >
                        Refresh
                      </Button>
                    )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <List divided relaxed>
                {discord_channels.map((channel) => (
                  <List.Item>
                    <List.Content>
                      <List.Header>{channel.name}</List.Header>
                      An excellent companion
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
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
