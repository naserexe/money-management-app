import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { register } from "../../store/actions/authAction";

const Register = props => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  let [errors, setErrors] = useState({});

  const { error } = props.auth;

  useEffect(() => {
    // eslint-disable-next-line
    errors = setErrors(error);
  }, [error]);

  const onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
      password2
    };
    props.register(newUser, props.history);
  };
  return (
    <div className='row'>
      <div className='col-md-6 offset-md-3'>
        <h1 className='text-center display-4'>Register Here</h1>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className={
                errors.name ? "form-control is-invalid" : "form-control"
              }
              placeholder='Enter Your Name'
              name='name'
              id='name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
            {errors.name && (
              <div className='invalid-feedback'>{errors.name}</div>
            )}
          </div>
          <div className='form-group'>
            <input
              type='text'
              className={
                errors.email || errors.message
                  ? "form-control is-invalid"
                  : "form-control"
              }
              placeholder='Enter Your Email'
              name='email'
              id='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {errors.email || errors.message ? (
              <div className='invalid-feedback'>
                {errors.email || errors.message}
              </div>
            ) : null}
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
          <div className='form-group'>
            <input
              type='password'
              className={
                errors.password2 ? "form-control is-invalid" : "form-control"
              }
              placeholder='Confirm Your Password'
              name='password2'
              id='password2'
              value={password2}
              onChange={e => setPassword2(e.target.value)}
            />
            {errors.password2 && (
              <div className='invalid-feedback'>{errors.password2}</div>
            )}
          </div>
          <button className='btn btn-primary my-3 d-block'>Register</button>
          <Link className='badge badge-light' to='/login'>
            Already Have Account? Login Here
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
  { register }
)(Register);
