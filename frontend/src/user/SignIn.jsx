import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
setUser ,selectUser
} from './userSlice';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Icon,
} from "semantic-ui-react";


function SignIn() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

 const loginToApp = () => {
   dispatch(setUser({user : "admin"}))
 }
  return (
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
  
          <Button
          onClick = {loginToApp} 
          color="black" 
          fluid size="large">
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <a href="#">Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>
  )
}

export default SignIn





