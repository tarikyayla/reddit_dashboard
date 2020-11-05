// DEFAULT STATE

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

export default initialState;
