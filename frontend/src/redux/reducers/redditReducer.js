import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  getListOfSubReddits: false,
  token: null,

  user: null,
  added: false,
  redditAuth: {
    active: false,
    username: null,
    userDetail: {},
    redirect_link: null,
  },
  subreddits: {},
  totalResults: 0,
  currentPage: 1,
  currentPageForList: 1,

  listPagination: {
    next: null,
    prev: null,
    data: null,
  },

  search: {
    searchTerm: "",
    data: null,
    next: null,
    previous: null,
  },
};

export default function (state = initialState, action) {
  if (action.type === actionTypes.GET_TOKEN) {
    return {
      ...state,
      token: action.payload,
    };
  }

  if (action.type === actionTypes.FETCH_USER_AUTH) {
    return {
      ...state,
      user: action.payload,
    };
  }

  if (action.type === actionTypes.GET_USER_DATA) {
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

  if (action.type === actionTypes.GET_USER_DATA_FAIL) {
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

  if (action.type === actionTypes.GET_SUBREDDITS) {
    return {
      ...state,
      subreddits: action.payload.subreddits,
      totalResults: action.payload.totalResults,
      getListOfSubReddits: true,
    };
  }

  if (action.type === actionTypes.REFRESH_SUBREDDITS) {
    return state;
  }

  if (action.type === actionTypes.SEARCH_TEXT) {
    return {
      ...state,
      totalResults: action.payload.totalResults,
      search: {
        ...state.search,
        searchTerm: action.payload.searchTerm,
        data: action.payload.data,
        next: action.payload.next,
        prev: action.payload.previous,
      },
    };
  }

  if (action.type === actionTypes.PAGINATION) {
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

  if (action.type === actionTypes.LIST_PAGINATION) {
    return {
      ...state,
      currentPageForList: action.payload.currentPage,
      subreddits: {
        ...state.subreddits,
        next: action.payload.next,
        previous: action.payload.previous,
        results: action.payload.data.results,
      },
    };
  }

  if (action.type === actionTypes.ADD_SUBREDDIT) {
    return {
      ...state,
      added: true,
    };
  }
  if (action.type === actionTypes.REMOVE_SUBREDDIT) {
    return {
      ...state,
      added: false,
    };
  }

  return state;
}
