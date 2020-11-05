import {
  // TOKEN
  FETCH_TOKEN_FAILURE,
  FETCH_TOKEN_SUCCESS,
  FETCH_TOKEN_REQUEST,
  GET_HEADER_WITH_TOKEN,
  // USER
  //   FETCH_USER_AUTH_FAILURE,
  //   FETCH_USER_AUTH_SUCCESS,
  //   FETCH_USER_AUTH_REQUEST,
} from "./actions";

const initialStore = {
  token: null,
  header: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: null,
  },
  redditAuth: {
    active: false,
  },
  loading: false,
  user: "",
};

function reducer(state = initialStore, action) {
  // TOKEN REDUCER
  if (action.type === FETCH_TOKEN_REQUEST) {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === FETCH_TOKEN_SUCCESS) {
    return {
      ...state,
      loading: false,
      token: action.payload.token,
    };
  }
  if (action.type === FETCH_TOKEN_FAILURE) {
    return {
      ...state,
      loading: false,
      error: "error",
    };
  }
  if (action.type === GET_HEADER_WITH_TOKEN) {
    return {
      ...state,
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: action.payload.token,
      },
    };
  }

  // USER REDUCER
  //   if (action.type === FETCH_USER_AUTH_REQUEST) {
  //     return {
  //       ...state,
  //       loading: true,
  //     };
  //   }
  //   if (action.type === FETCH_USER_AUTH_SUCCESS) {
  //     return {
  //       ...state,
  //       loading: false,
  //       user: action.payload.user,
  //     };
  //   }
  //   if (action.type === FETCH_USER_AUTH_FAILURE) {
  //     return {
  //       ...state,
  //       loading: false,
  //       user: action.payload.user,
  //     };
  //   }

  return state;
}

export default reducer;
