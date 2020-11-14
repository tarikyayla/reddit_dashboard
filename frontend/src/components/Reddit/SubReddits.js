import React from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { getSubReddits } from "../../redux/actions/test";
import "./css/SubReddits.css";
import SubList from "./SubList";

const SubReddits = ({ getSubReddits, token, btnActive }) => {
  return (
    <div className="container">
      <div className="btn">
        <Button onClick={() => getSubReddits(token)}>Get Follow List</Button>
      </div>
      {btnActive ? <SubList /> : null}
    </div>
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
