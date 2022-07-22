import React from 'react'

const Header = ({ children }) => {
  const { right } = children

  return (
    <>
      <div className="d-flex justify-content-between">
        <div style={{minWidth: '100px'}}></div>
        <h1>Job Tracker</h1>
        <div className="d-flex justify-content-end" style={{minWidth: '100px'}}>
          {right}
        </div>
      </div>
      <hr />
    </>
  )
}

export default Header