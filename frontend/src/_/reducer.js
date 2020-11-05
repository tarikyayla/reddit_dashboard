export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

export function reducer(state = initialState, action) {
  if (action.type === FETCH_USER_REQUEST) {
    return {
      ...state,
      loading: true,
    };
  }

  if (action.type === FETCH_USER_SUCCESS) {
    return {
      ...state,
      loading: false,
      users: action.payload, // from api
      error: "",
    };
  }

  if (action.type === FETCH_USER_FAILURE) {
    return {
      ...state,
      loading: false,
      users: [],
      error: action.payload, // from api
    };
  }

  return state;
}
