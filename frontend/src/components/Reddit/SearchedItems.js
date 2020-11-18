import {
  Image,
  Button,
  List,
  Segment,
  Icon,
  Pagination,
  Loader,
} from "semantic-ui-react";
import React from "react";
import {
  pagination,
  addSubreddit,
  getSubReddits,
  removeSubreddit,
} from "../../redux/actions/test";
import "./css/SearchBox.css";
import { connect } from "react-redux";

const SearchedItems = ({
  searchResult,
  subreddits,
  text,
  next,
  pagination,
  previous,
  token,
  totalResults,
  addSubreddit,
  getSubReddits,
  isLoading,
  removeSubreddit,
}) => {
  React.useEffect(() => {
    getSubReddits(token);
  }, [getSubReddits, token]);

  const handlePagination = (e) => {
    let target = e.target.text;
    if (isNaN(Number(target)) && target === "⟩") {
      pagination(next, token);
    }
    if (isNaN(Number(target)) && target === "⟨") {
      pagination(previous, token);
    }
    if (!isNaN(Number(target))) {
      target = Number(target);
      pagination(null, token, text, target);
    }
  };

  const handleAddButton = (sub) => {
    addSubreddit(sub.id, token);
  };

  const handleRemoveButton = (id) => {
    removeSubreddit(id, token);
  };

  const renderButton = (sub) => {
    var added = false;

    subreddits.results.forEach((element) => {
      if (sub.id === element.id) {
        added = true;
      }
    });

    if (added) {
      return (
        <Button onClick={() => handleRemoveButton(sub.id)} basic color="red">
          Remove
          <Icon name="remove" />
        </Button>
      );
    }

    return (
      <Button
        onClick={(e) => {
          handleAddButton(sub);
        }}
        basic
        color="green"
      >
        Follow <Icon name="plus" />
      </Button>
    );
  };

  if (searchResult !== null && text !== "") {
    return (
      <Segment.Group>
        <Segment>
          {searchResult.results.map((sub) => (
            <List selection divided>
              <List.Item>
                <Image src={sub.icon_img} avatar />
                <List.Content>{sub.name}</List.Content>
                <List.Content floated="right">{renderButton(sub)}</List.Content>
              </List.Item>
            </List>
          ))}
          <Pagination
            onClick={handlePagination}
            boundaryRange={0}
            defaultActivePage={1}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            totalPages={Math.ceil(totalResults / 20)}
            nextItem={next !== null ? "⟩" : null}
            prevItem={previous !== null ? "⟨" : null}
          />
        </Segment>
      </Segment.Group>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return {
    searchResult: state.test.search.data,
    subreddits: state.test.subreddits,
    totalResults: state.test.totalResults,
    token: state.test.token,
    text: state.test.search.searchTerm,
    next: state.test.search.next,
    previous: state.test.search.previous,
    currentPage: state.test.currentPage,
    addSubredditBtn: state.test.addSubredditBtn,
    isLoading: state.test.isLoading,
  };
};

export default connect(mapStateToProps, {
  pagination,
  addSubreddit,
  getSubReddits,
  removeSubreddit,
})(SearchedItems);
