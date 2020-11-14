import { Input, Segment } from "semantic-ui-react";
import React from "react";
import { searchText } from "../../redux/actions/test";
import "./css/SearchBox.css";
import { connect } from "react-redux";
import SearchedItems from "./SearchedItems";

const SearchBox = ({ searchText, token }) => {
  const handleChange = (e) => {
    let text = e.target.value;
    searchText(text, token);
  };

  return (
    <div className="Reddit__searchBox">
      <Segment raised>
        <Input
          onChange={handleChange}
          fluid
          icon="reddit"
          placeholder="Search Subreddits..."
        />
        <SearchedItems />
      </Segment>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.test.token,
  };
};

export default connect(mapStateToProps, { searchText })(SearchBox);
