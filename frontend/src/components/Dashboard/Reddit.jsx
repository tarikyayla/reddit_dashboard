import React from "react";

import {
  Button,
  Icon,
  Grid,
  Input,
  Segment,
  List,
  Header,
  Label,
  Image,
} from "semantic-ui-react";

const Dashboard = () => (
  <div>
    <Segment inverted>Discord Bot</Segment>

    <Grid columns={3}>
      <Grid.Row>
        <Grid.Column>
          <Button animated>
            <Button.Content visible>Reddit Login</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button animated="fade">
            <Button.Content visible>Discord Login</Button.Content>
            <Button.Content hidden>Add Now</Button.Content>
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Header>Reddit Info</Header>
          <div>
            <Label as="a">
              <Image
                avatar
                spaced="right"
                src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
              />
              User
            </Label>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Header>Search Subs</Header>
          <Input action="Add" placeholder="Search..." />
        </Grid.Column>
        <Grid.Column> </Grid.Column>
        <Grid.Column>
          <Header>Following</Header>
          <Segment inverted>
            <List divided inverted relaxed>
              <List.Item>
                <List.Content>
                  <List.Header>1</List.Header>
                  test1
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>2</List.Header>test2
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>3</List.Header>
                  test3
                </List.Content>
              </List.Item>
            </List>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

export default Dashboard;
