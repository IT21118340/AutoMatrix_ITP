import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
  return (
    <nav className='navbar'>
      <div className='system-name'>Auto Matrix</div>

      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/lessons'>Lessons</Link>
        </li>
        <li>
          <Link to='/instructors'>Instructors</Link>
        </li>
        <li>
          <Link to='/staff'>Staff</Link>
        </li>
        <li>
          <Link to='/adminLogin'>Admin Login</Link>
        </li>
        <li>
          <Link to='/ticket'>Raise a ticket</Link>
        </li>
      </ul>
      <ul>
        <li className='right'>
          <Link to='/login'>
            <button className='login-btn'>Login</button>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
