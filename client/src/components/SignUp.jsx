import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from './Header'

const SignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationErrors, setValidationErrors] = useState({})

  const navigate = useNavigate()
  
  const register = e => {
    e.preventDefault()
    axios.post('http://localhost:8000/api/register',
      {firstName, lastName, email, password, confirmPassword},
      {withCredentials: true}
    )
    .then(res => {
      console.log(res)
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setValidationErrors({})
      localStorage.setItem('userId', res.data.user._id)
      localStorage.setItem('firstName', res.data.user.firstName)
      localStorage.setItem('lastName', res.data.user.lastName)
      localStorage.setItem('email', res.data.user.email)
      navigate('/jobs')
    })
    .catch(err => {
      console.log(err)
      setValidationErrors(err.response.data.errors)
      console.log(validationErrors)
    })
  }
  
  return (
    <>
      <Header>
          {{right: <Link to='/login'>Login</Link>}}
      </Header>
      <div className='flex-fill'>
        <h2>Register</h2>
        <form onSubmit={register}>
          <label>First Name:</label>
          { validationErrors.firstName && <div className='text-danger mb-1'>{validationErrors.firstName.message}</div> }
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control mb-2"/>

          <label>Last Name:</label>
          { validationErrors.lastName && <div className='text-danger mb-1'>{validationErrors.lastName.message}</div> }
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control mb-2"/>

          <label>Email:</label>
          { validationErrors.email && <div className='text-danger mb-1'>{validationErrors.email.message}</div> }
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-2"/>

          <label>Password:</label>
          { validationErrors.password && <div className='text-danger mb-1'>{validationErrors.password.message}</div> }
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control mb-2"/>

          <label>Confirm Password:</label>
          { validationErrors.confirmPassword && <div className='text-danger mb-1'>{validationErrors.confirmPassword.message}</div> }
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control mb-2"/>

          <input type="submit" className="btn btn-primary" />
      </form>
    </div>
    </>
  )
}

export default SignUp