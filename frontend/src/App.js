import React from "react";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  const dummyRequest = () => {
    fetch("/api/hello")
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log("SELAMÜN ALEYKÜM ASLAN PARÇASI");
      });
  };

  dummyRequest();

  return (
    <div>
      <SignIn />
    </div>
  );
}

export default App;
