import React from "react";
// REDUX IMPORTS
import { connect } from "react-redux";
import { getToken } from "./redux/actions/redditActions";
import DiscordDashboard from "./components/Discord/DiscordDashboard";
import RedditLoginRedux from "./components/Reddit/RedditLoginRedux";
// ALERT
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
// CUSTOM CSS
import "./App.css";

// ALERT OPTIONS
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
          <DiscordDashboard />
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
