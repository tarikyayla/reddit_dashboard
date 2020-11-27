import React, { Component } from "react";
import { Link } from "react-router-dom";
// REDUX IMPORTS
import { connect } from "react-redux";
import { searchText } from "../../redux/actions/redditActions";
// UI
import { Menu, Segment } from "semantic-ui-react";

class Navbar extends Component {
  state = { activeItem: "home" };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Segment inverted>
        <Menu secondary inverted stackable>
          <Link to="">
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={this.handleItemClick}
            />
          </Link>

          <Link to="/subreddits">
            <Menu.Item
              name="reddit follow list"
              active={activeItem === "reddit"}
              onClick={this.handleItemClick}
            />
          </Link>

          <Menu.Menu position="right">
            <Link to="profile">
              <Menu.Item
                icon="user circle"
                name="user"
                active={activeItem === "user"}
                onClick={this.handleItemClick}
              />
            </Link>
          </Menu.Menu>
        </Menu>
      </Segment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.test.token,
  };
};

export default connect(mapStateToProps, { searchText })(Navbar);
