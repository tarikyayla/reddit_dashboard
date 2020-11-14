import axios from "axios";
import { AUTH_ERROR, USER_LOADED, USER_LOADING } from "./types";
import { returnErrors } from "../actions/errorActions";

// Check token and load user

export const getSubReddits = () => (dispatch) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios.get("api/subreddits", tokenConfig).then((res) =>
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    })
  );
  // .catch((err) => {
  //   dispatch(returnErrors(err.res.data, err.response.status));
  //   dispatch({ type: AUTH_ERROR });
  // });
};

// Setup config/headers and token

export const tokenConfig = () => {
  // Get Token from api
  const token = axios
    .get("/api/get-api-token")
    .then((response) => response.data);

  // Headers
  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: null,
    },
  };

  // If token , add to headers
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
};
