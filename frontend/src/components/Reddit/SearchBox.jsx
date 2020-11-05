import React from "react";
import { Divider, Grid, Icon, Search, Segment } from "semantic-ui-react";
import "./css/SearchBox.css";

const SearchBox = () => (
  <div className="Reddit__searchBox">
    <Segment placeholder>
      <Grid columns={2} stackable textAlign="center">
        <Divider vertical>
          <Icon name="reddit" />
        </Divider>
        <Grid.Row verticalAlign="middle">
          <Grid.Column>
            <Search placeholder="Search subreddit..." />
          </Grid.Column>
          <Grid.Column>
            <Segment inverted>
              <h2>SubList</h2>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </div>
);

export default SearchBox;
