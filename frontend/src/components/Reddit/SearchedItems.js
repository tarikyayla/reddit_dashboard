import {
  Image,
  Button,
  List,
  Segment,
  Icon,
  Pagination,
  Divider,
} from "semantic-ui-react";
import React from "react";
import {
  pagination,
  addSubreddit,
  getSubReddits,
  removeSubreddit,
} from "../../redux/actions/redditActions";
import { useAlert } from "react-alert";
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
}) => {
  const alert = useAlert();

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
    alert.success(`${sub.name} added !`);
  };

  if (searchResult !== null && text !== "") {
    return (
      <Segment inverted>
        {searchResult.results.map((sub) => (
          <List selection divided inverted key={sub.id}>
            <List.Item>
              {sub.icon_img === null ||
              sub.icon_img === "" ||
              sub.icon_img === undefined ? (
                <Image
                  src="https://b.thumbs.redditmedia.com/iTldIIlQVSoH6SPlH9iiPZZVzFWubJU7cOM__uqSOqU.png"
                  avatar
                />
              ) : (
                <Image src={sub.icon_img} avatar />
              )}
              <List.Content>{sub.name}</List.Content>
              <List.Content floated="right">
                {
                  <Button
                    onClick={(e) => {
                      handleAddButton(sub);
                    }}
                    basic
                    icon
                    color="green"
                  >
                    <Icon name="plus" />
                  </Button>
                }
              </List.Content>
            </List.Item>
            <Divider />
          </List>
        ))}
        <Pagination
          inverted
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
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return {
    added: state.test.added,
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
