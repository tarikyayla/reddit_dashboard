import React from "react";
import { connect } from "react-redux";
import { Button, Popup } from "semantic-ui-react";
import { getSubReddits } from "../../redux/actions/test";
import "./css/SubReddits.css";
import SubList from "./SubList";

const SubReddits = ({ getSubReddits, token, btnActive, user }) => {
  React.useEffect(() => {
    getSubReddits(token);
  }, [token, getSubReddits]);

  return (
    <>
      {btnActive ? <SubList /> : null}
      <Popup
        content="Refresh stack."
        mouseEnterDelay={200}
        position="top left"
        trigger={
          <Button
            floated="right"
            basic
            color="green"
            onClick={() => getSubReddits(token)}
            icon="refresh"
          />
        }
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    subreddits: state.test.subreddits,
    token: state.test.token,
    btnActive: state.test.getListOfSubReddits,
    user: state.test.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSubReddits: (token) => dispatch(getSubReddits(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubReddits);
