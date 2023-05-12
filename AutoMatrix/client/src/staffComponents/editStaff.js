import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import './staff.css'

export default function EditEmployee(props) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [employeeID, setID] = useState('')
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [position, setPosition] = useState('')
  const [phone, setPhone] = useState('')
  const [salary, setSalary] = useState('')

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const res = await axios.get(
          `http://localhost:80/api/employee/employees/${id}`
        )
        setID(res.data.employeeID)
        setName(res.data.name)
        setAge(res.data.age)
        setEmail(res.data.email)
        setPosition(res.data.position)
        setPhone(res.data.phone)
        setSalary(res.data.salary)
      } catch (error) {
        console.error(error)
      }
    }
    getEmployee()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(
        `http://localhost:80/api/employee/employees/${id}`,
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
      alert('Successfully updated!')
      navigate('/staffDetails')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h2>Edit Employee</h2>
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

        <button type='button' onClick={handleSubmit}>
          Update Employee
        </button>
      </form>
    </div>
  )
}
