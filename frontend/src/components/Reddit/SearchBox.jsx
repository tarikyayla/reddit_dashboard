import React from "react";
import { Divider, Header, Input, Segment } from "semantic-ui-react";
import { searchText } from "../../redux/actions/test";
import { getSubReddits } from "../../redux/actions/test";
import { connect } from "react-redux";
import SearchedItems from "./SearchedItems";

const SearchBox = ({ searchText, token, getSubReddits }) => {
  React.useEffect(() => {
    getSubReddits(token);
  }, [token, getSubReddits]);

  const handleChange = (e) => {
    let text = e.target.value;
    searchText(text, token);
  };

  return (
    <Segment fluid inverted>
      <Header color="grey" textAlign="center">
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
      <SearchedItems />
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.test.token,
  };
};

export default connect(mapStateToProps, { searchText, getSubReddits })(
  SearchBox
);
