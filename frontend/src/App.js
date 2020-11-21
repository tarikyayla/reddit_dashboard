import React from "react";
import Dashboard from "./components/dashboard/Dashboard";
import DiscordDashboard from "./components/Discord/DiscordDashboard";
import { Route } from "react-router-dom";
import Navbar from "./components/dashboard/Navbar";
import UserCard from "./components/Reddit/UserCard";
import SearchedItems from "./components/Reddit/SearchedItems";
import "./App.css";
import { Container } from "semantic-ui-react";

function App({ user }) {
  return (
    <div className="main">
      <Container fluid>
        <div className="navbar">{user !== null ? <Navbar /> : null}</div>
        <Route path="/" exact component={DiscordDashboard} />
        <Route path="/subreddits" exact component={Dashboard} />
        <Route path="/profile" exact component={UserCard} />
        <Route path="/search" exact component={SearchedItems} />
      </Container>
    </div>
  );
}

export default App;
