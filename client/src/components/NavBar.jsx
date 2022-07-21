import React from 'react'
import ButtonLogout from './ButtonLogout'

const NavBar = (props) => {
  const { leftContent=<h3></h3>, title='Job Tracker', rightContent } = props.children
  
  return (
    <div className="d-flex justify-content-between">
      <h2>{title}</h2>
      <ButtonLogout />
  </div>
  )
}

export default NavBar