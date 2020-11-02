import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./user/userSlice";
import Dashboard from "./dashboard/Dashboard";
import RedditLogin from "./Reddit/RedditLogin";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div>
      <Dashboard />
    </div>
  );
}

export default App;
