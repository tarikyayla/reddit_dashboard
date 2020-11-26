import axios from "axios";
export const getToken = () => (dispatch) => {
  axios.get("api/get-api-token").then((res) => {
    const token = res.data.token;
    dispatch({ type: "GET_TOKEN", payload: token });
    dispatch(fetchUserAuth(token));
  });
};

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
          type: "FETCH_USER_AUTH",
          payload: user.data,
        });
        dispatch({
          type: "GET_USER_DATA",
          payload: user.data,
        });
      } else {
        dispatch(getUserDataFail(user.data));
      }
    });
};

export const btnClicked = () => {
  return {
    type: "CLICK_LOGIN_BTN",
  };
};

export const getUserDataFail = (url) => (dispatch) => {
  dispatch({
    type: "GET_USER_DATA_FAIL",
    payload: url,
  });
};

export const searchText = (text, token) => (dispatch) => {
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
        type: "SEARCH_TEXT",
        payload: {
          data: resp.data,
          searchTerm: text,
          totalResults: resp.data.count,
          next: resp.data.next,
          previous: resp.data.previous,
        },
      })
    );
};

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
          type: "PAGINATION",
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
          type: "PAGINATION",
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
          type: "LIST_PAGINATION",
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
          type: "LIST_PAGINATION",
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

export const addSubreddit = (id, token) => (dispatch) => {
  dispatch({
    type: "LOADING",
  });

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
        type: "ADD_SUBREDDIT",
        payload: {
          subreddit_id: id,
        },
      });
      dispatch(getSubReddits(token));
    })
    .catch((err) => console.log(err.message));
  dispatch({ type: "LOADED" });
};

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
        type: "REMOVE_SUBREDDIT",
        payload: {
          subreddit_id: id,
        },
      });

      dispatch(getSubReddits(token));
    })
    .catch((err) => console.log(err.message));
};

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
        type: "GET_SUBREDDITS",
        payload: {
          subreddits: resp.data,
          totalResults: resp.data.count,
        },
      })
    );

  axios
    .get("api/refresh-subreddits", {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: token,
      },
    })
    .then((resp) => dispatch({ type: "REFRESH_SUBREDDITS" }))
    .catch((err) => console.log(err.message));
};
