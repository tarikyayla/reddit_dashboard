const initialState = {
  redditLoginBtn: false,
  isLoading: false,
  getListOfSubReddits: false,
  token: null,

  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
    Authorization: null,
  },

  user: null,

  redditAuth: {
    active: false,
    username: null,
    userDetail: {},
    redirect_link: null,
  },
  subreddits: {},
  totalResults: 0,
  currentPage: 1,
  search: {
    searchTerm: "",
    data: null,
    next: null,
    previous: null,
  },
};

export default function (state = initialState, action) {
  if (action.type === "GET_TOKEN") {
    return {
      ...state,
      token: action.payload,
      headers: {
        ...state.headers,
        Authorization: action.payload,
      },
    };
  }

  if (action.type === "FETCH_USER_AUTH") {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === "GET_USER_DATA") {
    return {
      ...state,
      redditAuth: {
        ...state.redditAuth,
        active: true,
        username: action.payload.username,
        userDetail: JSON.parse(action.payload.user_data),
      },
    };
  }

  if (action.type === "CLICK_LOGIN_BTN") {
    return {
      ...state,
      redditLoginBtn: true,
    };
  }

  if (action.type === "GET_USER_DATA_FAIL") {
    return {
      ...state,
      redditAuth: {
        ...state.redditAuth,
        active: false,
        username: null,
        userDetail: {},
        redirect_link: action.payload.redirect_link,
      },
    };
  }

  if (action.type === "GET_SUBREDDITS") {
    return {
      ...state,
      subreddits: action.payload.subreddits,
      totalResults: action.payload.totalResults,
      getListOfSubReddits: true,
    };
  }

  if (action.type === "SEARCH_TEXT") {
    return {
      ...state,
      totalResults: action.payload.totalResults,
      search: {
        ...state.search,
        searchTerm: action.payload.searchTerm,
        data: action.payload.data,
        next: action.payload.next,
        previous: action.payload.previous,
      },
    };
  }

  if (action.type === "PAGINATION") {
    return {
      ...state,
      currentPage: action.payload.currentPage,
      search: {
        ...state.search,
        next: action.payload.next,
        previous: action.payload.previous,
        data: action.payload.data,
      },
    };
  }

  if (action.type === "ADD_SUBREDDIT") {
    return state;
  }
  if (action.type === "REMOVE_SUBREDDIT") {
    return state;
  }
  if (action.type === "LOADING") {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === "LOADED") {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === "LOGOUT") {
    return {
      ...state,
      redditLoginBtn: false,
      isLoading: false,
      getListOfSubReddits: false,
      token: null,

      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: null,
      },

      user: null,

      redditAuth: {
        active: false,
        username: null,
        userDetail: {},
        redirect_link: null,
      },
      subreddits: {},
      totalResults: 0,
      currentPage: 1,
      search: {
        searchTerm: "",
        data: null,
        next: null,
        previous: null,
      },
    };
  }

  return state;
}
