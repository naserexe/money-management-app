import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { login } from "../../store/actions/authAction";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let [errors, setErrors] = useState({});

  const { error } = props.auth;

  useEffect(() => {
    errors = setErrors(error);
  }, [error]);

  const onSubmit = e => {
    e.preventDefault();

    const user = { email, password };

    props.login(user, props.history);
  };

  return (
    <div class='row'>
      <div className='col-md-6 offset-md-3'>
        <h1 className='text-center display-4'>Login Here</h1>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className={
                errors.email ? "form-control is-invalid" : "form-control"
              }
              placeholder='Enter Your Email'
              name='email'
              id='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className='invalid-feedback'>{errors.email}</div>
            )}
          </div>
          <div className='form-group'>
            <input
              type='password'
              className={
                errors.password ? "form-control is-invalid" : "form-control"
              }
              placeholder='Enter Your Password'
              name='password'
              id='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {errors.password && (
              <div className='invalid-feedback'>{errors.password}</div>
            )}
          </div>
          <button className='btn btn-primary  my-3 d-block'>Login</button>
          <Link className='badge badge-success' to='/register'>
            Don't Have Account? Register Here
          </Link>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
