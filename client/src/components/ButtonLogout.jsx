import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ButtonLogout = () => {
  const navigate = useNavigate()
  
  const logout = () => {
    axios.post('http://localhost:8000/api/logout',
    {},
    // need to send cookie in request so the server can clear it
    {withCredentials: true}) 
      .then(res => {
        console.log(res)
        localStorage.clear()
        navigate('/')
      })
      .catch(err => console.log(err))
  }
  
  return (
    <button onClick={logout} className='btn btn-secondary'>Logout</button>
  )
}

export default ButtonLogout