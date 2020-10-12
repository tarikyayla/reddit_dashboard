import React from "react";
import logo from "./logo.svg";
import "./App.css";

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

  function asd(e) {
    console.log("1");
  }
  asd();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
