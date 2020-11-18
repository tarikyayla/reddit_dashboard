import React from "react";
import Dashboard from "./components/dashboard/Dashboard";
import DiscordDashboard from "./components/Discord/DiscordDashboard";
import { Route } from "react-router-dom";
import Navbar from "./components/dashboard/Navbar";
import UserCard from "./components/Reddit/UserCard";
import SearchedItems from "./components/Reddit/SearchedItems";
import { Segment } from "semantic-ui-react";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <Segment raised padded="very" vertical className="main">
        <Route path="/" exact component={DiscordDashboard} />
        <Route path="/subreddits" exact component={Dashboard} />
        <Route path="/profile" exact component={UserCard} />
        <Route path="/search" exact component={SearchedItems} />
      </Segment>
    </div>
  );
}

export default App;

// https://b.thumbs.redditmedia.com/iTldIIlQVSoH6SPlH9iiPZZVzFWubJU7cOM__uqSOqU.png
