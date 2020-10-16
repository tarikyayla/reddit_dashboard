import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Icon,
} from "semantic-ui-react";

const LoginForm = () => (
  <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" color="white" textAlign="center">
        <Icon name="reddit"></Icon>
        Login
      </Header>
      <Form size="massive">
        <Segment stacked>
          <Form.Input
            fluid
            icon="user outline"
            iconPosition="left"
            placeholder="E-mail address"
          />
          <Form.Input
            fluid
            icon="unlock alternate"
            iconPosition="left"
            placeholder="Password"
            type="password"
          />

          <Button color="black" fluid size="large">
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <a href="#">Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>
);

export default LoginForm;
