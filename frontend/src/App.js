import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import Reddit from "./Reddit";
import reducer from "./reducer";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

function App() {
  return (
    <Provider store={store}>
      <div>
        <Reddit />
      </div>
    </Provider>
  );
}

export default App;
