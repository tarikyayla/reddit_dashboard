import React, { Component } from "react";
import { Menu, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { searchText } from "../../redux/actions/test";
import { connect } from "react-redux";

class Navbar extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    const handleSearchText = (e) => {
      let text = e.target.value;
      console.log(text);
      this.props.searchText(text, this.props.token);
    };

    return (
      <Menu secondary pointing>
        <Link to="">
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          />
        </Link>

        <Link to="/subreddits">
          <Menu.Item
            name="follow list"
            active={activeItem === "follow list"}
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

        <Menu.Menu position="right">
          <Link to="search">
            <Menu.Item>
              <Input
                inverted
                size="mini"
                icon="reddit"
                placeholder="Search Subreddits..."
                onChange={handleSearchText}
              />
            </Menu.Item>
          </Link>
        </Menu.Menu>
      </Menu>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.test.token,
  };
};

export default connect(mapStateToProps, { searchText })(Navbar);
