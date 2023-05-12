import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function EmployeeDetails(props) {
  const [employee, setEmployee] = useState(null)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const fetchEmployee = async (search = '') => {
    try {
      const res = await axios.get(`http://localhost:80/api/employee/employees`)
      setEmployee(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteEmployee = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:80/api/employee/employees/${id}`
      )
      console.log(res.data)
      props.history.push('/employees')
      navigate('/employeeDetails')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchEmployee(search)
  }, [search])

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div
        style={{
          marginBottom: '20px',
          width: '50%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <label htmlFor='search' style={{ marginRight: '10px' }}>
          Search by position:{' '}
        </label>
        <input
          type='text'
          id='search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '5px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </div>
      {employee ? (
        <>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th
                  style={{
                    backgroundColor: 'orange',
                    padding: '10px',
                    textAlign: 'left',
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    backgroundColor: 'orange',
                    padding: '10px',
                    textAlign: 'left',
                  }}
                >
                  Age
                </th>
                <th
                  style={{
                    backgroundColor: 'orange',
                    padding: '10px',
                    textAlign: 'left',
                  }}
                >
                  Email
                </th>
                <th
                  style={{
                    backgroundColor: 'orange',
                    padding: '10px',
                    textAlign: 'left',
                  }}
                >
                  Position
                </th>
                <th
                  style={{
                    backgroundColor: 'orange',
                    padding: '10px',
                    textAlign: 'left',
                  }}
                >
                  Phone
                </th>
                <th
                  style={{
                    backgroundColor: 'orange',
                    padding: '10px',
                    textAlign: 'left',
                  }}
                >
                  Salary
                </th>
                <th
                  style={{
                    backgroundColor: 'orange',
                    padding: '10px',
                    textAlign: 'left',
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {employee.map((e, index) => {
                return (
                  <tr key={e._id}>
                    <td
                      style={{
                        border: '1px solid black',
                        padding: '5px',
                        textAlign: 'left',
                      }}
                    >
                      {e.name}
                    </td>
                    <td
                      style={{
                        border: '1px solid black',
                        padding: '5px',
                        textAlign: 'left',
                      }}
                    >
                      {e.age}
                    </td>
                    <td
                      style={{
                        border: '1px solid black',
                        padding: '5px',
                        textAlign: 'left',
                      }}
                    >
                      {e.email}
                    </td>
                    <td style={{ border: '1px solid black', padding: '5px' }}>
                      {e.position}
                    </td>
                    <td style={{ border: '1px solid black', padding: '5px' }}>
                      {e.phone}
                    </td>
                    <td style={{ border: '1px solid black', padding: '5px' }}>
                      {e.salary}
                    </td>
                    <td style={{ border: '1px solid black', padding: '5px' }}>
                      <button
                        onClick={() => navigate(`/editStaff/${e._id}`)}
                        style={{
                          backgroundColor: 'green',
                          color: 'white',
                          border: 'none',
                          padding: '5px',
                          borderRadius: '5px',
                          marginRight: '5px',
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteEmployee(e._id)}
                        style={{
                          backgroundColor: 'red',
                          color: 'white',
                          border: 'none',
                          padding: '5px',
                          borderRadius: '5px',
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <br />
          <a href='/addStaff'>Add new employee</a>
          <br></br>
          <a href='/addStaff'>Download as table view</a>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
