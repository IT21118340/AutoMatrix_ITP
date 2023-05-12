import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login.css'
import logo from '../LOGO.jpg'

const StudentLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async () => {
    try {
      const response = await axios.get(
        `http://localhost:80/students/find/${email}`
      )
      const person = response.data[0]
      const account = person.email === email && person.password === password

      if (account) {
        window.localStorage.setItem('token', response.data)
        window.localStorage.setItem('loggedIn', true)
        localStorage.setItem('userEmail', email)
        navigate('/studentCard', {
          state: { message: 'Successfully logged in!' },
        })
      } else {
        setError('Invalid email or password')
      }
    } catch (error) {
      console.error(error)
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <div className='login-container'>
      <img src={logo} alt='Profile' className='logo' />
      {/* <h1>Auto Matrix</h1> */}
      <h2>Sign in to Your Account</h2>
      <div className=''>
        <label>Email or phone:</label>
        <input type='email' value={email} onChange={handleEmailChange} />
      </div>
      <div className=''>
        <label>Password:</label>
        <input
          type='password'
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className=''>
        <button className='button' onClick={handleLogin}>
          Sign In
        </button>
      </div>
      <div className='help-links'>
        <a href='#'>Forgot email?</a>
        <a href='#'>Forgot password?</a>
      </div>
      <div className='bottom-text'>
        Not your computer? Use Guest mode to sign in privately.
        <a href='#'>Learn more</a>
      </div>
      <div className='bottom-text'>
        <span>© 2023 MyWebsite</span>
        <a href='#'>Privacy</a>
        <a href='#'>Terms</a>
      </div>
      {error && <div className='error-message'>{error}</div>}
    </div>
  )
}

export default StudentLogin
