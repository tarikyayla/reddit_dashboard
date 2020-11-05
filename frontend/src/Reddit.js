import React from "react";
import { connect } from "react-redux";
import { getAuthToken } from "./actions";

const Reddit = ({ getAuthToken, token, header, user }) => {
  React.useEffect(() => {
    getAuthToken();
  }, [getAuthToken]);

  console.log(token, header, `user : ${user}`);
  return <div>Redux</div>;
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
    header: state.header,
    user: state.user,
  };
};

const mapDispatchToProps = {
  getAuthToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reddit);
