import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import { REACT_APP_API_URI } from "../config";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const login = e => {
    e.preventDefault();
    console.log(`Logging in...`);
    axios.post(REACT_APP_API_URI + '/api/login',
      { email, password },
      { withCredentials: true }
    )
      .then(res => {
        console.log(`Fetching user object with credentials  ...`);
        axios.get(`${REACT_APP_API_URI}/api/users/loggedin`, { withCredentials: true })
          .then(res => {
            const user = res.data
            localStorage.setItem('userId', user._id)
            localStorage.setItem('firstName', user.firstName)
            localStorage.setItem('lastName', user.lastName)
            localStorage.setItem('email', user.email)
            navigate('/jobs')
          })
          .catch(err => console.log(err))
      })
      .catch(err => {
        if (err.code === 'ERR_NETWORK') {
          setErrorMessage('Could not connect to server')
        } else {
          console.log(err.code)
          setErrorMessage('Incorrect username or password')
        }
      })
  }

  return (
    <>
      <Header>
        {{ right: <Link to='/register'>Register</Link> }}
      </Header>
      <h2>Login</h2>
      <form onSubmit={login}>
        {errorMessage && <div className='text-danger mb-1'>{errorMessage}</div>}
        <label>Email:</label>
        <input type="text" onChange={(e) => setEmail(e.target.value)} className="form-control input-lg textbox mb-2" />
        <label>Password:</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control mb-2" />
        <input type="submit" className="btn btn-primary" />
      </form>
    </>
  )
}

export default SignIn