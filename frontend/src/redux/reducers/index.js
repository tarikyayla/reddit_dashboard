import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import testReducer from "./testReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  test: testReducer,
});
