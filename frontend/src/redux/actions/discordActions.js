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
