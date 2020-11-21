import * as actionTypes from "../actions/actionTypes";

const initialState = {
  add_url: null,
  isLoading: false,
  msg: null,
  discord_channels: [],
  text_channels: {},
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

  if (action.type === actionTypes.CREATE_TEXT_CHANNEL) {
    return {
      ...state,
      text_channels: {
        ...state.text_channels,
        channelId: action.payload.channel_id,
      },
    };
  }

  if (action.type === actionTypes.DELETE_TEXT_CHANNEL) {
    return {
      ...state,
    };
  }

  if (action.type === actionTypes.ADD_SUBREDDIT_TO_TEXT_CHANNEL) {
    return { ...state };
  }
  if (action.type === actionTypes.GET_FOLLOWING_SUBREDDITS) {
    return {
      ...state,
      textChannels: {
        ...state.text_channels,
        textChannel: action.payload.textChannel,
      },
    };
  }

  return state;
}
