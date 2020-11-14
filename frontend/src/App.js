import React from "react";
import Dashboard from "./components/dashboard/Dashboard";
import { Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Route path="/" exact component={Dashboard} />
      <Route path="/home" component={Dashboard} />
    </div>
  );
}

export default App;
