import React from "react";

// import SignIn from "./components/SignIn";
import Reddit from "./components/Dashboard/Reddit";

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
      <Reddit />
    </div>
  );
}

export default App;
