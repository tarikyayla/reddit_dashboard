import * as actionTypes from "../actions/actionTypes";

const initialState = {
  add_url: null,
  isLoading: false,
  msg: null,
  discord_channels: [],
};

export default function (state = initialState, action) {
  if (action.type === actionTypes.GET_REQ) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === actionTypes.GET_REQ_FAIL) {
    return {
      ...state,
      isLoading: false,
      msg: action.payload.msg,
    };
  }

  if (action.type === actionTypes.GET_DC_SERVERS) {
    return {
      ...state,
      discord_channels: action.payload.discord_channels,
      isLoading: false,
      add_url: action.payload.add_url,
    };
  }
  return state;
}
