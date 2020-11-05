import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "./asyncActions";

export const Try = ({ fetchUsers, users, error, loading }) => {
  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const data = loading ? (
    <h2>loading...</h2>
  ) : (
    <div>
      {users.map((id) => (
        <li key={id}>{id}</li>
      ))}
    </div>
  );

  return <div>{data}</div>;
};

const mapStateToProps = (state) => {
  //   console.log(state);
  return {
    users: state.users,
    error: state.error,
    loading: state.loading,
  };
};

const mapDispatchToProps = {
  fetchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Try);
