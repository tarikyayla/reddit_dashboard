import React from "react";
import { connect } from "react-redux";
import { Button, Container, Segment } from "semantic-ui-react";
import { getSubReddits } from "../../redux/actions/test";
import "./css/SubReddits.css";
import SubList from "./SubList";

const SubReddits = ({ getSubReddits, token, btnActive }) => {
  return (
    <div className="container">
      <Button color="green" onClick={() => getSubReddits(token)}>
        Refresh
      </Button>

      {btnActive ? (
        <>
          <Segment>
            <Container>
              <SubList />
            </Container>
          </Segment>
        </>
      ) : null}
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
