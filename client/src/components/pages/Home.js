import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authAction";

const Home = props => {
  return (
    <div>
      <h1>I am Home</h1>
      {props.auth.isAuthenticated ? (
        <button
          className='btn btn-danger'
          onClick={() => props.logout(props.history)}
        >
          Logout
        </button>
      ) : (
        <Link to='/login'>
          <button className='btn btn-success'> Login </button>
        </Link>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Home);
