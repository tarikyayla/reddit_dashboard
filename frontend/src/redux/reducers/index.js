import { combineReducers } from "redux";

import testReducer from "./redditReducer";
import discordReducer from "./discordReducer";

export default combineReducers({
  discord: discordReducer,
  test: testReducer,
});
