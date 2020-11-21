import axios from "axios";
import * as actionTypes from "./actionTypes";

export const getDcServers = (token) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_REQ,
  });

  axios
    .get("/api/discord", {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: token,
      },
    })
    .then((resp) =>
      dispatch({
        type: actionTypes.GET_DC_SERVERS,
        payload: {
          discord_channels: resp.data.discord_channels,
          add_url: resp.data.add_url,
        },
      })
    )
    .catch((err) =>
      dispatch({
        type: actionTypes.GET_REQ_FAIL,
        payload: {
          msg: err.message,
        },
      })
    );
};

export const createTextChannel = (slug, channel_id, discord_id, token) => (
  dispatch
) => {
  fetch("api/text-channels", {
    method: "POST",
    body: JSON.stringify({
      name: slug,
      channel_id: channel_id,
      discord_id: discord_id,
    }),
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: token,
    },
  })
    .then((resp) => resp.json())
    .then((resp) => {
      dispatch({
        type: actionTypes.CREATE_TEXT_CHANNEL,
        payload: {
          name: slug,
          channel_id: channel_id,
          discord_id: discord_id,
        },
      });
    })
    .catch((err) => console.log(err.message));
};

export const deleteTextChannel = (token, textChannelId) => (dispatch) => {
  axios
    .delete(`api/text-channels/${textChannelId}`, {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: token,
      },
    })
    .then((resp) => dispatch({ type: actionTypes.DELETE_TEXT_CHANNEL }))
    .catch((err) => console.log(err.message));
};

export const addSubredditToTextChannel = (
  textChannelId,
  subreddit_id,
  token
) => (dispatch) => {
  fetch(`api/text-channels/${textChannelId}`, {
    method: "PUT",
    body: JSON.stringify({
      subreddit_id: subreddit_id,
      method: 1,
    }),
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: token,
    },
  })
    .then((resp) => resp.json())
    .then((resp) => {
      dispatch({
        type: actionTypes.ADD_SUBREDDIT_TO_TEXT_CHANNEL,
      });
    })
    .catch((err) => console.log(err.message));
};

export const getFollowingSubreddits = (textChannelId, token) => (dispatch) => {
  axios
    .get(`àpi/text-channels/${textChannelId}`, {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: token,
      },
    })
    .then((resp) =>
      dispatch({
        type: actionTypes.GET_FOLLOWING_SUBREDDITS,
        payload: {
          textChannel: resp.data,
        },
      })
    )
    .catch((err) => console.log(err.message));
};
