const initialState = {
  token: null,
  header: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  redditAuth: {
    active: false,
  },
};

function reducer(state = initialState, action) {
  return state;
}

export default reducer;
