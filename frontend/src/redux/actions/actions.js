import * as actionTypes from "./actionTypes";

export const addToList = () => ({
  type: actionTypes.ADD_TO_LIST,
  payload: 1,
});
export const addToServer = () => ({
  type: actionTypes.ADD_TO_SERVER,
  payload: 1,
});
export const discordLogin = () => ({
  type: actionTypes.DISCORD_LOGIN,
  payload: false,
});
export const getUserProfile = () => ({
  type: actionTypes.GET_USER_PROFILE,
  payload: 1,
});
export const loginWithReddit = () => ({
  type: actionTypes.LOGIN_WITH_REDDIT,
  payload: false,
});
export const searchByName = () => ({
  type: actionTypes.SEARCH_BY_NAME,
  payload: 1,
});
