import React from "react";
// REDUX IMPORTS
import { connect } from "react-redux";
import {
  getSubReddits,
  refreshSubreddits,
} from "../../redux/actions/redditActions";
// UI
import { Button, Popup } from "semantic-ui-react";
import SubList from "./SubList";
// ALERT
import { useAlert } from "react-alert";

const SubReddits = ({ token, getSubReddits }) => {
  const alert = useAlert();

  React.useEffect(() => {
    getSubReddits(token);
  }, [getSubReddits, token]);

  const handleRefreshSubreddit = () => {
    getSubReddits(token);
    refreshSubreddits(token);
    alert.success("REFRESHED !");
  };

  return (
    <>
      {/* LIST OF SUBREDDITS */}
      <SubList />
      {/* REFRESH BUTTON */}
      <Popup
        content="Refresh stack."
        mouseEnterDelay={200}
        position="top left"
        trigger={
          <Button
            floated="right"
            basic
            color="green"
            onClick={handleRefreshSubreddit}
            icon="refresh"
          />
        }
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.test.token,
  };
};

export default connect(mapStateToProps, {
  getSubReddits,
  refreshSubreddits,
})(SubReddits);
