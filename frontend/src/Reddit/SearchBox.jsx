import React from "react";
import {
  Dimmer,
  Divider,
  Grid,
  Icon,
  Search,
  Segment,
  Image,
  Loader,
} from "semantic-ui-react";
import styles from "./css/SearchBox.css";

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
            <Segment>
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>
              <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment> </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </div>
);

export default SearchBox;
