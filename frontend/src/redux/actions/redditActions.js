import axios from "axios";
import * as actionTypes from "./actionTypes";

// GET TOKEN
export const getToken = () => (dispatch) => {
  axios.get("api/get-api-token").then((res) => {
    const token = res.data.token;
    dispatch({ type: actionTypes.GET_TOKEN, payload: token });
    dispatch(fetchUserAuth(token));
  });
};

// GET USER DATA
export const fetchUserAuth = (token) => (dispatch) => {
  axios
    .get("/api/reddit-auth", {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: token,
      },
    })
    .then((user) => {
      if (user.data.active) {
        dispatch({
          type: actionTypes.FETCH_USER_AUTH,
          payload: user.data,
        });
        dispatch({
          type: actionTypes.GET_USER_DATA,
          payload: user.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_USER_DATA_FAIL,
          payload: user.data,
        });
      }
    });
};

// GET ALL SUBREDDITS FROM YOUR STACK
export const getSubReddits = (token) => (dispatch) => {
  axios
    .get("/api/subreddits", {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: token,
      },
    })
    .then((resp) =>
      dispatch({
        type: actionTypes.GET_SUBREDDITS,
        payload: {
          subreddits: resp.data,
          totalResults: resp.data.count,
        },
      })
    )
    .catch((err) => console.log(err.message));
};

// GET CHANGES FROM REDDIT.COM
export const refreshSubreddits = (token) => (dispatch) => {
  axios
    .get("api/refresh-subreddits", {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: token,
      },
    })
    .then(() => dispatch({ type: actionTypes.REFRESH_SUBREDDITS }))
    .catch((err) => console.log(err.message));
};

// SEARCH SUBREDDIT
export const searchText = (text, token) => (dispatch) => {
  if (text !== "") {
    axios
      .get(`api/search-subreddits?text=${text}`, {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: token,
        },
      })
      .then((resp) =>
        dispatch({
          type: actionTypes.SEARCH_TEXT,
          payload: {
            data: resp.data,
            searchTerm: text,
            totalResults: resp.data.count,
            next: resp.data.next,
            previous: resp.data.previous,
          },
        })
      );
  }
};

// PAGINATION
export const pagination = (url, token, searchTerm, currentPage = 1) => (
  dispatch
) => {
  if (url !== null || url === undefined) {
    let parseUrl = url.slice(21);

    axios
      .get(parseUrl, {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: token,
        },
      })
      .then((resp) =>
        dispatch({
          type: actionTypes.PAGINATION,
          payload: {
            next: resp.data.next,
            previous: resp.data.previous,
            data: resp.data,
            currentPage: currentPage,
          },
        })
      );
  } else {
    axios
      .get(`/api/search-subreddits?page=${currentPage}&text=${searchTerm}`, {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: token,
        },
      })
      .then((resp) =>
        dispatch({
          type: actionTypes.PAGINATION,
          payload: {
            next: resp.data.next,
            previous: resp.data.previous,
            data: resp.data,
            currentPage: currentPage,
          },
        })
      );
  }
};

// SUBREDDIT LIST PAGINATION
export const subredditsListPagination = (
  url,
  token,
  searchTerm,
  currentPage = 1
) => (dispatch) => {
  if (url !== null || url === undefined) {
    let parseUrl = url.slice(21);

    axios
      .get(parseUrl, {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: token,
        },
      })
      .then((resp) =>
        dispatch({
          type: actionTypes.LIST_PAGINATION,
          payload: {
            next: resp.data.next,
            previous: resp.data.previous,
            data: resp.data,
            currentPage: currentPage,
          },
        })
      );
  } else {
    if (searchTerm !== null) {
      url = `/api/subreddits?name=${searchTerm}&page=${currentPage}`;
    }
    axios
      .get(`/api/subreddits?&page=${currentPage}`, {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: token,
        },
      })
      .then((resp) =>
        dispatch({
          type: actionTypes.LIST_PAGINATION,
          payload: {
            next: resp.data.next,
            previous: resp.data.previous,
            data: resp.data,
            currentPage: currentPage,
          },
        })
      );
  }
};

// ADD SUBREDDIT
export const addSubreddit = (id, token) => (dispatch) => {
  fetch("api/subreddits", {
    method: "POST",
    body: JSON.stringify({
      subreddit_id: id,
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
        type: actionTypes.ADD_SUBREDDIT,
        payload: {
          subreddit_id: id,
        },
      });
      dispatch(getSubReddits(token));
    })
    .catch((err) => console.log(err.message));
};

// REMOVE SUBREDDIT
export const removeSubreddit = (id, token) => (dispatch) => {
  fetch(`api/subreddits/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      subreddit_id: id,
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
        type: actionTypes.REMOVE_SUBREDDIT,
        payload: {
          subreddit_id: id,
        },
      });
    })
    .catch((err) => console.log(err.message));
};
