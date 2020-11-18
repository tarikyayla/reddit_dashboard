import React from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { getSubReddits } from "../../redux/actions/test";
import "./css/SubReddits.css";
import SubList from "./SubList";

const SubReddits = ({ getSubReddits, token, btnActive }) => {
  React.useEffect(() => {
    getSubReddits(token);
  }, [token, getSubReddits]);

  return (
    <>
      <Button color="green" onClick={() => getSubReddits(token)}>
        Refresh
      </Button>

      {btnActive ? <SubList /> : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    subreddits: state.test.subreddits,
    token: state.test.token,
    btnActive: state.test.getListOfSubReddits,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSubReddits: (token) => dispatch(getSubReddits(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubReddits);
