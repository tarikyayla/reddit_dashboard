import * as actionTypes from "../actions/actionTypes";

const initialState = {
  add_url: null,
  discord_channels: [],
  text_channels: {},
  searchedFollowList: { data: [] },
};
export default function (state = initialState, action) {
  if (action.type === actionTypes.GET_DC_SERVERS) {
    return {
      ...state,
      discord_channels: action.payload.discord_channels,

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

  if (action.type === actionTypes.SEARCH_FOLLOWING_LIST) {
    return {
      ...state,
      searchedFollowList: {
        ...state.searchedFollowList,
        data: action.payload.data,
      },
    };
  }

  return state;
}
