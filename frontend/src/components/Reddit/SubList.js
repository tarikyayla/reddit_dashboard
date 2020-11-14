import React from "react";
import { connect } from "react-redux";
import { Icon, Item, Label, Button } from "semantic-ui-react";
import "./css/SubReddits.css";

const SubList = ({ subreddits }) => {
  return (
    <div container>
      <div className="list">
        <Item.Group divided>
          {subreddits.results.map((subreddit) => (
            <Item key={subreddit.id}>
              {subreddit.icon_img === "" || subreddit.icon_img === null ? (
                <Item.Image
                  src="https://b.thumbs.redditmedia.com/S6FTc5IJqEbgR3rTXD5boslU49bEYpLWOlh8-CMyjTY.png"
                  size="tiny"
                />
              ) : (
                <Item.Image src={subreddit.icon_img} size="tiny" />
              )}
              <Item.Content>
                <Item.Header>{subreddit.name}</Item.Header>
                <Item.Meta>
                  <span className="cinema">
                    <strong> {subreddit.subscribers} </strong> subscribers
                  </span>
                </Item.Meta>
                <Item.Extra>
                  {subreddit.over18 ? null : <Label color="red">+18</Label>}
                </Item.Extra>
                <Item.Extra>
                  <Button floated="right" basic>
                    Add
                    <Icon name="right chevron" />
                  </Button>
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    subreddits: state.test.subreddits,
    totalResults: state.test.totalResults,
    currentPage: state.test.currentPage,
    token: state.test.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SubList);
