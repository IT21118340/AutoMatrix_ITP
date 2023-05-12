import React, { Component } from 'react'
import axios from 'axios'
import * as Swal from 'sweetalert2'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
  Button,
  Form,
  Table,
  ButtonGroup,
  Modal,
  Row,
  Col,
  InputGroup,
} from 'react-bootstrap'

export class CreateFeedback extends Component {
  constructor(props) {
    super(props)

    this.onChangefeedback = this.onChangefeedback.bind(this)
    this.onChangeinstructor = this.onChangeinstructor.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      feedback: '',
      instructors: [],
      instructor: '',
    }
  }

  getInstructors() {
    axios
      .get('http://localhost:80/instructor/')
      .then((response) => {
        this.setState({ instructors: response.data })
        console.log('List Of Instructors are' + response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  onChangefeedback(e) {
    this.setState({
      feedback: e.target.value,
    })
  }

  onChangeinstructor(e) {
    this.setState({
      instructor: e.target.value,
    })
  }

  onSubmit(e) {
    e.preventDefault()

    const feedback = {
      feedback: this.state.feedback,
      instructor: this.state.instructor,
    }

    console.log(feedback)

    axios
      .post('http://localhost:80/feedback/', feedback)
      .then((res) => {
        console.log(res)

        if (res.status === 200) {
          this.clearData()
          Swal.fire({
            icon: 'success',
            title: 'Successful',
            text: 'Feedback has been added!!',
            background: '#fff',
            confirmButtonColor: '#0a5bf2',
            iconColor: '#60e004',
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error in adding!',
            background: '#fff',
            confirmButtonColor: '#eb220c',
            iconColor: '#e00404',
          })
        }
      })
      .catch((err) => console.log(err))
  }

  clearData = () => {
    this.setState({
      feedback: '',
      instructors: [],
      instructor: '',
    })
  }

  render() {
    return (
      <div className='flex flex-col px-10'>
        <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
            <div className='items-center overflow-hidden'>
              <div className=''>
                <div class='grid grid-cols-1 gap-4 content-start pt-5 px-20'>
                  <form
                    className='px-12 py-3 border-2 rounded-lg shadow-md bg-gray-50'
                    onSubmit={this.onSubmit}
                  >
                    <div class='mt-3'>
                      <p className='text-4xl font-semibold text-black uppercase drop-shadow-lg'>
                        Add Feedback
                      </p>
                    </div>
                    <div className='grid grid-cols-2 gap-4 form-group'>
                      <div class=''>
                        <label className='block text-lg font-medium text-gray-900 dark:text-white'>
                          Feedback
                        </label>
                        <input
                          type='text'
                          required
                          className='form-control'
                          value={this.state.feedback}
                          onChange={this.onChangefeedback}
                        />
                      </div>

                      <div className='form-group'>
                        <label className='block text-lg font-medium text-gray-900 dark:text-white'>
                          Instructor{' '}
                        </label>
                        <input
                          type='text'
                          required
                          className='form-control'
                          value={this.state.instructor}
                          onChange={this.onChangeinstructor}
                        />
                      </div>
                    </div>

                    <div className='m-5 text-center align-middle form-group'>
                      <input
                        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                        type='submit'
                        value='Add Feedback'
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
