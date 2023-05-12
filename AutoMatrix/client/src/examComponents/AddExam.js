import React, { useState, useEffect } from 'react'
import { MDBTableBody, MDBTable, MDBTableHead } from 'mdb-react-ui-kit'
import { TextField } from '@mui/material'
import axios from 'axios'
import Swal from 'sweetalert2'

function AddExam() {
  const [code, setCode] = useState('')
  const [question, setQuestion] = useState('')
  const [answer1, setAnswer1] = useState('')
  const [answer2, setAnswer2] = useState('')
  const [answer3, setAnswer3] = useState('')
  const [answer4, setAnswer4] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [submit, setSubmit] = useState(true)
  const [editBtn, setEditBtn] = useState(false)
  const [disable, setDisable] = useState(false)
  const [examList, setExamList] = useState([])

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      codeError ||
      questionError ||
      answer1Error ||
      answer2Error ||
      answer3Error ||
      answer4Error ||
      correctAnswerError
    ) {
      Swal.fire({
        title: 'Warning!',
        text: 'Please fill all required fields...',
        icon: 'error',
        confirmButtonText: 'OK',
        type: 'success',
      })
    } else {
      const addQuestion = {
        code,
        question,
        answer1,
        answer2,
        answer3,
        answer4,
        correctAnswer,
      }
      try {
        const response = await axios.post(
          'http://localhost:80/exam/addexam',
          addQuestion
        )
        console.log(response.data)
        Swal.fire({
          title: 'Success!',
          text: 'Question Added',
          icon: 'success',
          confirmButtonText: 'OK',
          type: 'success',
        })
        setTimeout(() => {
          window.location.href = '/AddExam'
        }, 1000)
      } catch (error) {
        console.log(error.message)
        Swal.fire({
          title: 'Error!',
          text: 'Question Not Added',
          icon: 'error',
          confirmButtonText: 'OK',
          type: 'success',
        })
        setTimeout(() => {
          window.location.href = '/AddExam'
        }, 1000)
      }
    }
  }

  // Edit Function
  const edit = async (e) => {
    e.preventDefault()
    const editQuestion = {
      code,
      question,
      answer1,
      answer2,
      answer3,
      answer4,
      correctAnswer,
    }
    try {
      const response = await axios.put(
        'http://localhost:80/exam/updateexam',
        editQuestion
      )
      console.log(response.data)
      Swal.fire({
        title: 'Success!',
        text: 'Question Edited',
        icon: 'success',
        confirmButtonText: 'OK',
        type: 'success',
      })
      setTimeout(() => {
        window.location.href = '/AddExam'
      }, 1000)
    } catch (error) {
      console.log(error.message)
      Swal.fire({
        title: 'Error!',
        text: 'Question Not Edited',
        icon: 'error',
        confirmButtonText: 'OK',
        type: 'success',
      })
      window.location.href = '/AddExam'
    }
  }

  // Valid Function
  const valid = () => {
    if (
      code !== '' &&
      question !== '' &&
      answer1 !== '' &&
      answer2 !== '' &&
      answer3 !== '' &&
      answer4 !== '' &&
      correctAnswer !== ''
    ) {
      setSubmit(false)
    } else {
      setSubmit(true)
    }
  }

  const getQuestionList = async () => {
    try {
      const res = await axios.get('http://localhost:80/exam/allexam/')
      setExamList(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const preedit = (
    code,
    question,
    answer1,
    answer2,
    answer3,
    answer4,
    correctAnswer
  ) => {
    console.log(
      code,
      question,
      answer1,
      answer2,
      answer3,
      answer4,
      correctAnswer
    )

    setCode(code)
    setQuestion(question)
    setAnswer1(answer1)
    setAnswer2(answer2)
    setAnswer3(answer3)
    setAnswer4(answer4)
    setCorrectAnswer(correctAnswer)
    setEditBtn(true)
    setDisable(true)
  }

  // Search Function
  const [searchQuery, setSearchQuery] = useState('')

  const filteredList = examList.filter((exam) => {
    const query = searchQuery.toLowerCase()
    return (
      exam.code.toLowerCase().includes(query) ||
      exam.question.toLowerCase().includes(query) ||
      exam.answer1.toLowerCase().includes(query) ||
      exam.answer2.toLowerCase().includes(query) ||
      exam.answer3.toLowerCase().includes(query) ||
      exam.answer4.toLowerCase().includes(query) ||
      exam.correctAnswer.toLowerCase().includes(query)
    )
  })

  // Delete Function
  function remove(code) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this records? This process can not be undone.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete('http://localhost:80/exam/deleteexam/' + code)
          .then(() => {
            window.location.href = '/AddExam'
          })
          .catch((err) => {
            Swal.fire({
              title: 'Error!',
              text: 'Question Not Delete',
              icon: 'error',
              confirmButtonText: 'OK',
              type: 'success',
            })
          })
      }
    })
  }

  useEffect(() => {
    getQuestionList()
    valid()
  }, [code, question, answer1, answer2, answer3, answer4, correctAnswer])

  const [codeError, setCodeError] = useState(false)
  const [questionError, setQuestionError] = useState(false)
  const [answer1Error, setAnswer1Error] = useState(false)
  const [answer2Error, setAnswer2Error] = useState(false)
  const [answer3Error, setAnswer3Error] = useState(false)
  const [answer4Error, setAnswer4Error] = useState(false)
  const [correctAnswerError, setCorrectAnswerError] = useState(false)

  // Form Validation
  const checkCodeValidation = (value) => {
    if (value.length === 0) {
      setCodeError(true)
    } else {
      setCodeError(false)
      setCode(value)
    }
  }

  const checkQuestionValidation = (value) => {
    if (value.length === 0) {
      setQuestionError(true)
    } else {
      setQuestionError(false)
      setQuestion(value)
    }
  }

  const checkAnswer1Validation = (value) => {
    if (value.length === 0) {
      setAnswer1Error(true)
    } else {
      setAnswer1Error(false)
      setAnswer1(value)
    }
  }

  const checkAnswer2Validation = (value) => {
    if (value.length === 0) {
      setAnswer2Error(true)
    } else {
      setAnswer2Error(false)
      setAnswer2(value)
    }
  }

  const checkAnswer3Validation = (value) => {
    if (value.length === 0) {
      setAnswer3Error(true)
    } else {
      setAnswer3Error(false)
      setAnswer3(value)
    }
  }

  const checkAnswer4Validation = (value) => {
    if (value.length === 0) {
      setAnswer4Error(true)
    } else {
      setAnswer4Error(false)
      setAnswer4(value)
    }
  }

  const checkCorrectAnswerValidation = (value) => {
    if (value.length === 0) {
      setCorrectAnswerError(true)
    } else {
      setCorrectAnswerError(false)
      setCorrectAnswer(value)
    }
  }

  return (
    <div>
      {/* <Navbar /> */}
      <br />
      <br />
      <center>
        <div
          className='card'
          style={{
            backgroundColor: '',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            width: '60%',
          }}
        >
          {editBtn ? (
            <h3 style={{ marginTop: '40px' }}>Edit Question</h3>
          ) : (
            <h3 style={{ marginTop: '40px' }}>Add Question</h3>
          )}
          <div
            class='row container-fluid'
            style={{ marginTop: '7%', marginBottom: '7%' }}
          >
            <form>
              <div class='row mb-4'>
                <div className='col'>
                  <TextField
                    className='form-control'
                    id='outlined-basic'
                    label='Question Code'
                    variant='outlined'
                    style={{ width: '700px' }}
                    placeholder='Q01'
                    onChange={(e) => {
                      checkCodeValidation(e.target.value)
                    }}
                    defaultValue={code}
                    disabled={disable}
                  />
                  {codeError && (
                    <p style={{ color: 'red', marginBottom: 'auto' }}>
                      Code is Required
                    </p>
                  )}
                </div>
              </div>
              <div class='row mb-4'>
                <div className='col'>
                  <TextField
                    className='form-control'
                    id='outlined-basic'
                    label='Question'
                    variant='outlined'
                    style={{ width: '700px' }}
                    onChange={(e) => {
                      checkQuestionValidation(e.target.value)
                    }}
                    defaultValue={question}
                  />
                  {questionError && (
                    <p style={{ color: 'red', marginBottom: 'auto' }}>
                      Question is Required
                    </p>
                  )}
                </div>
              </div>
              <div class='row mb-4'>
                <div className='col'>
                  <TextField
                    className='form-control'
                    id='outlined-basic'
                    label='Answer 1'
                    variant='outlined'
                    style={{ width: '700px' }}
                    onChange={(e) => {
                      checkAnswer1Validation(e.target.value)
                    }}
                    defaultValue={answer1}
                  />
                  {answer1Error && (
                    <p style={{ color: 'red', marginBottom: 'auto' }}>
                      Answer 1 is Required
                    </p>
                  )}
                </div>
              </div>
              <div class='row mb-4'>
                <div className='col'>
                  <TextField
                    className='form-control'
                    id='outlined-basic'
                    label='Answer 2'
                    variant='outlined'
                    style={{ width: '700px' }}
                    onChange={(e) => {
                      checkAnswer2Validation(e.target.value)
                    }}
                    defaultValue={answer2}
                  />
                  {answer2Error && (
                    <p style={{ color: 'red', marginBottom: 'auto' }}>
                      Answer 2 is Required
                    </p>
                  )}
                </div>
              </div>
              <div class='row mb-4'>
                <div className='col'>
                  <TextField
                    className='form-control'
                    id='outlined-basic'
                    label='Answer 3'
                    variant='outlined'
                    style={{ width: '700px' }}
                    onChange={(e) => {
                      checkAnswer3Validation(e.target.value)
                    }}
                    defaultValue={answer3}
                  />
                  {answer3Error && (
                    <p style={{ color: 'red', marginBottom: 'auto' }}>
                      Answer 3 is Required
                    </p>
                  )}
                </div>
              </div>
              <div class='row mb-4'>
                <div className='col'>
                  <TextField
                    className='form-control'
                    id='outlined-basic'
                    label='Answer 4'
                    variant='outlined'
                    style={{ width: '700px' }}
                    onChange={(e) => {
                      checkAnswer4Validation(e.target.value)
                    }}
                    defaultValue={answer4}
                  />
                  {answer4Error && (
                    <p style={{ color: 'red', marginBottom: 'auto' }}>
                      Answer 4 is Required
                    </p>
                  )}
                </div>
              </div>
              <div class='row mb-4'>
                <div className='col'>
                  <TextField
                    className='form-control'
                    id='outlined-basic'
                    label='Correct Answer'
                    variant='outlined'
                    style={{ width: '700px' }}
                    onChange={(e) => {
                      checkCorrectAnswerValidation(e.target.value)
                    }}
                    defaultValue={correctAnswer}
                  />
                  {correctAnswerError && (
                    <p style={{ color: 'red', marginBottom: 'auto' }}>
                      Correct Answer is Required
                    </p>
                  )}
                </div>
              </div>
              <br />
              <br />
              {editBtn ? (
                <button
                  type='submit'
                  class='btn btn-dark btn-block mb-5'
                  style={{ width: '500px' }}
                  disabled={submit}
                  onClick={edit}
                >
                  Edit
                </button>
              ) : (
                <button
                  type='submit'
                  class='btn btn-dark btn-block mb-5'
                  style={{ width: '500px' }}
                  disabled={submit}
                  onClick={handleSubmit}
                >
                  Add
                </button>
              )}
            </form>
          </div>
        </div>
      </center>
      <br />
      <br />
      <br />
      <br />
      <br />
      <center>
        <div
          className='card'
          style={{
            backgroundColor: '',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            width: '95%',
          }}
        >
          <h4
            className='mt-5'
            id='#current'
            style={{ color: '#606060FF', paddingBottom: '1%' }}
          >
            <u>Questions List</u>
          </h4>
          <div style={{ paddingLeft: '1050px', paddingBottom: '5px' }}></div>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search questions...'
          />
          <MDBTable className='mt-2' hover>
            <MDBTableHead className='bg-warning'>
              <tr>
                <th scope='col'>
                  <h6
                    className='text-white'
                    style={{
                      fontWeight: '300',
                      letterSpacing: '2px',
                      fontSize: '18px',
                    }}
                  >
                    Q_Code
                  </h6>
                </th>
                <th scope='col'>
                  <h6
                    className='text-white'
                    style={{
                      fontWeight: '100',
                      letterSpacing: '2px',
                      fontSize: '18px',
                    }}
                  >
                    Question
                  </h6>
                </th>
                <th scope='col'>
                  <h6
                    className='text-white'
                    style={{
                      fontWeight: '100',
                      letterSpacing: '2px',
                      fontSize: '18px',
                    }}
                  >
                    Answer 1
                  </h6>
                </th>
                <th scope='col'>
                  <h6
                    className='text-white'
                    style={{
                      fontWeight: '100',
                      letterSpacing: '2px',
                      fontSize: '18px',
                    }}
                  >
                    Answer 2
                  </h6>
                </th>
                <th scope='col'>
                  <h6
                    className='text-white'
                    style={{
                      fontWeight: '100',
                      letterSpacing: '2px',
                      fontSize: '18px',
                    }}
                  >
                    Answer 3
                  </h6>
                </th>
                <th scope='col'>
                  <h6
                    className='text-white'
                    style={{
                      fontWeight: '100',
                      letterSpacing: '2px',
                      fontSize: '18px',
                    }}
                  >
                    Answer 4
                  </h6>
                </th>
                <th scope='col'>
                  <h6
                    className='text-white'
                    style={{
                      fontWeight: '100',
                      letterSpacing: '2px',
                      fontSize: '18px',
                    }}
                  >
                    Correct Answer
                  </h6>
                </th>
                <th scope='col'>
                  <h6
                    className='text-white'
                    style={{
                      fontWeight: '100',
                      letterSpacing: '2px',
                      fontSize: '18px',
                    }}
                  >
                    Action
                  </h6>
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {filteredList.map((examList, key) => (
                <tr className='bg-light'>
                  <td style={{ fontSize: '17px' }}>{examList.code}</td>
                  <td style={{ fontSize: '17px' }}>{examList.question}</td>
                  <td style={{ fontSize: '17px' }}>{examList.answer1}</td>
                  <td style={{ fontSize: '17px' }}>{examList.answer2}</td>
                  <td style={{ fontSize: '17px' }}>{examList.answer3}</td>
                  <td style={{ fontSize: '17px' }}>{examList.answer4}</td>
                  <td style={{ fontSize: '17px' }}>{examList.correctAnswer}</td>
                  <td>
                    <button
                      size='lg'
                      className='btn btn-danger'
                      color='danger'
                      style={{ fontWeight: 'bold', fontSize: '12px' }}
                      onClick={() => remove(examList.code)}
                    >
                      Delete
                    </button>
                    {''}&nbsp;&nbsp;
                    <button
                      size='lg'
                      className='btn btn-dark'
                      style={{ fontWeight: 'bold', fontSize: '12px' }}
                      onClick={() =>
                        preedit(
                          examList.code,
                          examList.question,
                          examList.answer1,
                          examList.answer2,
                          examList.answer3,
                          examList.answer4,
                          examList.correctAnswer
                        )
                      }
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>
      </center>
      <br />
      <br />
      <br />
      {/* <Footer /> */}
    </div>
  )
}

export default AddExam
