import React from "react";

import { connect } from "react-redux";
import { Button, Card, Header, Icon, Image, Segment } from "semantic-ui-react";
import { getToken } from "../../redux/actions/test";

const CardExampleCardProps = ({ userData, username, getToken }) => {
  React.useEffect(() => {
    getToken();
  }, [getToken]);

  const handleLogout = () => {
    console.log("logged out");
  };
  return (
    <>
      <Segment inverted textAlign="center">
        <Header as="h1">User Data</Header>
      </Segment>
      <Segment vertical inverted>
        <Card centered color="grey">
          <Card.Content>
            <Image floated="right" size="large" src={userData.icon_img} />
            <Card.Header>{username}</Card.Header>
            <Card.Meta>Reddit User</Card.Meta>
            <Card.Description>
              <Icon name="reddit"></Icon> {userData.subscribers}{" "}
              <strong>subscribers</strong>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button onClick={handleLogout} fluid color="red">
              Logout
            </Button>
          </Card.Content>
        </Card>
      </Segment>
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

export default connect(mapStateToProps, {
  getToken,
})(CardExampleCardProps);
