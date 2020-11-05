import axios from "axios";

// TOKEN actions
export const FETCH_TOKEN_REQUEST = "FETCH_TOKEN_REQUEST";
export const FETCH_TOKEN_SUCCESS = "FETCH_TOKEN_SUCCESS";
export const FETCH_TOKEN_FAILURE = "FETCH_TOKEN_FAILURE";
export const GET_HEADER_WITH_TOKEN = "GET_HEADER_WITH_TOKEN";

// USER actions
export const FETCH_USER_AUTH_REQUEST = "FETCH_USER_AUTH_REQUEST";
export const FETCH_USER_AUTH_SUCCESS = "FETCH_USER_AUTH_SUCCESS";
export const FETCH_USER_AUTH_FAILURE = "FETCH_USER_AUTH_FAILURE";

// TOKEN action creators

const fetchTokenRequest = () => {
  return {
    type: FETCH_TOKEN_REQUEST,
  };
};

const fetchTokenSuccess = (token) => {
  return {
    type: FETCH_TOKEN_SUCCESS,
    payload: {
      token,
    },
  };
};

const fetchTokenFailure = (error) => {
  return {
    type: FETCH_TOKEN_FAILURE,
    payload: {
      error: error,
    },
  };
};

const getHeaderWithToken = (token) => {
  return {
    type: GET_HEADER_WITH_TOKEN,
    payload: {
      token,
    },
  };
};

export const getAuthToken = () => {
  return (dispatch) => {
    dispatch(fetchTokenRequest());

    axios
      .get("/api/get-api-token")
      .then((resp) => {
        let token = resp.data.token;
        dispatch(fetchTokenSuccess(token));
        dispatch(getHeaderWithToken(token));
      })
      .catch((err) => {
        dispatch(fetchTokenFailure(err.message));
      });
  };
};

// USER action creators

// const fetchUserAuthRequest = () => {
//   return {
//     type: FETCH_USER_AUTH_REQUEST,
//   };
// };

// const fetchUserAuthSuccess = (user) => {
//   return {
//     type: FETCH_USER_AUTH_SUCCESS,
//     payload: {
//       user,
//     },
//   };
// };

// export const fetchUserAuth = (token) => {
//   return (dispatch) => {
//     dispatch(fetchUserAuthRequest(), {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//     });
//     axios.get("/api/reddit-auth").then((resp) => {
//       dispatch(fetchUserAuthSuccess(resp.data));
//     });
//   };
// };
