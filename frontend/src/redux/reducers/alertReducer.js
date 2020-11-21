import * as actionTypes from "../actions/actionTypes";

const initialState = {};

export default function (state = initialState, action) {
  if (action.type === actionTypes.SUCCESS_ALERT) {
    return state;
  }
  return state;
}
