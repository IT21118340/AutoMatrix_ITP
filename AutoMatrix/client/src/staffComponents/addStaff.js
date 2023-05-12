import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './staff.css'

export default function AddEmployee() {
  const [employeeID, setID] = useState('')
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [position, setPosition] = useState('')
  const [phone, setPhone] = useState('')
  const [salary, setSalary] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        'http://localhost:80/api/employee/employees',
        {
          employeeID,
          name,
          age,
          email,
          position,
          phone,
          salary,
        }
      )
      console.log(res.data)
      alert('Successfully inserted!')
      navigate('/staffDetails')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='employeeID'>employeeID:</label>
        <input
          type='text'
          id='employeeID'
          value={employeeID}
          onChange={(e) => setID(e.target.value)}
          required
        />
        <br />
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <label htmlFor='age'>Age:</label>
        <input
          type='number'
          id='age'
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <br />
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label htmlFor='position'>Position:</label>
        <input
          type='text'
          id='position'
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
        <br />
        <label htmlFor='phone'>Phone:</label>
        <input
          type='text'
          id='phone'
          text-size='10'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <br />
        <label htmlFor='salary'>Salary:</label>
        <input
          type='text'
          id='salary'
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />
        <br />

        <button type='submit' onChange={AddEmployee}>
          Add Employee
        </button>
      </form>
    </div>
  )
}
