import { Container, Input } from "semantic-ui-react";
import React from "react";
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
    <Container>
      <Input
        onChange={handleChange}
        fluid
        icon="reddit"
        placeholder="Search Subreddits..."
      />
      <SearchedItems />
    </Container>
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
