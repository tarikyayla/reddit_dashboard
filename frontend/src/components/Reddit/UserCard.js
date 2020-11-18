import React from "react";

import { connect } from "react-redux";
import {
  Button,
  Card,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
} from "semantic-ui-react";
import "./css/UserCard.css";

const CardExampleCardProps = ({ userData, username }) => {
  return (
    <>
      <Container>
        <Segment inverted>
          <Header as="h1" textAlign="left">
            User Data
          </Header>
        </Segment>
        <Segment>
          <Grid>
            <Grid.Row>
              <Grid.Column width={6}>
                <Card.Group className="User_card">
                  <Card>
                    <Card.Content>
                      <Image
                        floated="right"
                        size="large"
                        src={userData.icon_img}
                      />
                      <Card.Header>{username}</Card.Header>
                      <Card.Meta>Reddit User</Card.Meta>
                      <Card.Description>
                        <Icon name="reddit"></Icon> {userData.subscribers}
                        <strong>subscribers</strong>
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <div className="ui two buttons">
                        <Button basic color="green">
                          Active
                        </Button>
                      </div>
                    </Card.Content>
                  </Card>
                </Card.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.test.redditAuth.userDetail,
    username: state.test.redditAuth.username,
    redirect_url: state.test.redditAuth.redirect_url,
  };
};

export default connect(mapStateToProps)(CardExampleCardProps);
