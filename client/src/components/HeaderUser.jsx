import React from 'react'
import ButtonLogout from './ButtonLogout'
import { Link } from 'react-router-dom'

const HeaderUser = ({ children }) => {
  
  const rightDefault = () =>
    <button className='btn btn-secondary me-2'>
      <Link to='/jobs' style={{ color: 'inherit', textDecoration: 'inherit'}}>Jobs</Link>
    </button>

  const firstName = localStorage.getItem('firstName')

  return (
    <>
      <div className="row">
        <h3 className='col-sm'>Welcome, {firstName}!</h3>
        <h1 className='col-sm d-flex justify-content-center'>Job Tracker</h1>
        <div className="col-sm d-flex justify-content-end">
          <div>
            {children ? children : rightDefault()}
            <ButtonLogout />
          </div>
        </div>
      </div>
      <hr className='mt-1 mb-3' />
    </>
  )
}

export default HeaderUser