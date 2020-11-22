import React from "react";
import Dashboard from "./components/dashboard/Dashboard";
import DiscordDashboard from "./components/Discord/DiscordDashboard";
import { Route } from "react-router-dom";
import Navbar from "./components/dashboard/Navbar";
import UserCard from "./components/Reddit/UserCard";
import SearchedItems from "./components/Reddit/SearchedItems";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "./App.css";
import { Container } from "semantic-ui-react";
import { connect } from "react-redux";
import { getToken } from "./redux/actions/redditActions";
import RedditLoginRedux from "./components/Reddit/RedditLoginRedux";

const options = {
  position: positions.TOP_CENTER,
  timeout: 3500,
  transition: transitions.SCALE,
};

const App = ({ getToken, user }) => {
  React.useEffect(() => {
    getToken();
  }, [getToken]);

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      {user === null ? (
        <RedditLoginRedux />
      ) : (
        <div className="main">
          <Container fluid>
            <Navbar />
            <Route path="/" exact component={DiscordDashboard} />
            <Route path="/subreddits" exact component={Dashboard} />
            <Route path="/profile" exact component={UserCard} />
            <Route path="/search" exact component={SearchedItems} />
          </Container>{" "}
        </div>
      )}
    </AlertProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.test.token,
    user: state.test.user,
  };
};

export default connect(mapStateToProps, { getToken })(App);
