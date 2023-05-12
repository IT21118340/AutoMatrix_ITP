import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import './StudentCard.css'
import profilePicture from '../userLogo.png'
import { Link } from 'react-router-dom'

const StudentProfileCard = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)
  const [id, setId] = useState('')
  const [studentID, setStudentID] = useState('')
  const [courseCode, setCourse] = useState('')
  const [age, setAge] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')
  const userEmail = window.localStorage.getItem('userEmail')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:80/students/find/${userEmail}`
        )
        console.log(res)
        setStudent(res.data[0])
        setId(res.data[0]._id) // extract the ID and store it in state
        setStudentID(res.data[0].studentID)
        setCourse(res.data[0].courseCode)
        setAge(res.data[0].age)
        setName(res.data[0].name)
        setEmail(res.data[0].email)
        setPhone(res.data[0].phone)
        setAddress(res.data[0].address)
      } catch (error) {
        console.error(error)
        setError('Could not fetch student details')
      }
    }
    fetchData()
  }, [location.state.email])

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setPhone(event.target.value)
  }

  const handleAddressChange = (event) => {
    setAddress(event.target.value)
  }

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:80/students/${id}`, {
        name: name,
        phone: phone,
        address: address,
      })
      console.log(res)
      setError('')
      alert('Profile updated successfully')
    } catch (error) {
      console.error(error)
      setError('Could not update profile')
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('userEmail')
    navigate('/login')
  }

  return (
    <div className='card'>
      <img
        src={profilePicture}
        alt='Profile Picture'
        className='profile-picture'
      />
      <h1> {name}'s Profile</h1>
      {student ? (
        <div>
          <div className='input-container'>
            <label className='label'>Student ID:</label>
            <input
              className='input'
              type='studentID'
              value={studentID}
              disabled
            />
          </div>
          <div className='input-container'>
            <label className='label'>Course Code:</label>
            <input
              className='input'
              type='courseCode'
              value={courseCode}
              disabled
            />
          </div>
          <div className='input-container'>
            <label className='label'>Name:</label>
            <input
              className='input'
              type='text'
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className='input-container'>
            <label className='label'>Age:</label>
            <input className='input' type='age' value={age} disabled />
          </div>
          <div className='input-container'>
            <label className='label'>Email:</label>
            <input
              className='input'
              type='email'
              value={email}
              onChange={handleEmailChange}
              disabled
            />
          </div>
          <div className='input-container'>
            <label className='label'>Phone:</label>
            <input
              className='input'
              type='text'
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>
          <div className='input-container'>
            <label className='label'>Address:</label>
            <input
              className='input'
              type='text'
              value={address}
              onChange={handleAddressChange}
            />
          </div>
          <div className='button-container'>
            <button className='button' onClick={handleUpdate}>
              Update
            </button>
            <button className='button' onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div className='button-container'>
            <Link to='/exam'>Go to the Exam page</Link>
          </div>

          {error && <div className='error-message'>{error}</div>}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default StudentProfileCard
