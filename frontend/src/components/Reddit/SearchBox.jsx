import React from "react";
// REDUX IMPORTS
import { connect } from "react-redux";
import {
  searchText,
  getSubReddits,
  pagination,
  addSubreddit,
  removeSubreddit,
  refreshSubreddits,
} from "../../redux/actions/redditActions";
// UI
import { Divider, Header, Input, Segment } from "semantic-ui-react";
// COMP
import SeachedItems from "./SearchedItems";
const SearchBox = ({ searchText, token }) => {
  // SEARCH FUNC
  const handleChange = (e) => {
    let text = e.target.value;
    searchText(text, token);
  };

  return (
    <Segment inverted padded="very">
      <Header as="h1" color="grey" textAlign="center">
        Search any subreddit ...
      </Header>
      <Input
        onChange={handleChange}
        fluid
        icon="reddit"
        placeholder="Search Subreddits..."
        transparent
      />
      <Divider />
      {/* SEARCHED LIST */}
      <SeachedItems />
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.test.token,
    searchResult: state.test.search.data,
    subreddits: state.test.subreddits,
    totalResults: state.test.totalResults,
    text: state.test.search.searchTerm,
    next: state.test.search.next,
    previous: state.test.search.previous,
    currentPage: state.test.currentPage,
    addSubredditBtn: state.test.addSubredditBtn,
    isLoading: state.test.isLoading,
  };
};

export default connect(mapStateToProps, {
  searchText,
  getSubReddits,
  pagination,
  addSubreddit,
  removeSubreddit,
  refreshSubreddits,
})(SearchBox);
