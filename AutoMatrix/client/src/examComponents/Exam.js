import React, { useState, useEffect } from 'react'
import {
  MDBIcon,
  MDBCardImage,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBTableBody,
  MDBTable,
  MDBTableHead,
} from 'mdb-react-ui-kit'
import { TextField } from '@mui/material'
import axios from 'axios'
import Swal from 'sweetalert2'
import jsPDF from 'jspdf'

function Exam() {
  const [examList, setExamList] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [startBtn, setstartBtn] = useState(true)
  const [finish, setFinish] = useState(false)

  function print() {
    let x = 100
    var doc = new jsPDF('p', 'pt')
    doc.setTextColor(254, 8, 8)
    doc.text(20, 20, 'Answer Sheet')
    doc.addFont('helvetica', 'normal')
    doc.setFontSize(12)
    doc.setTextColor(3, 3, 3)
    doc.text(25, 60, ' Appointment Report ')
    for (let i = 0; i < examList.length; i++) {
      doc.text(25, x, 'Question : ' + ' ' + examList[i].question)
      x = x + 15
      doc.text(25, x, 'Answer :' + ' ' + examList[i].correctAnswer)
      x = x + 20
    }
    doc.save('Answer Sheet.pdf')
  }

  const getQuestionList = async () => {
    try {
      const res = await axios.get('http://localhost:80/exam/allexam/')
      console.log(res.data)
      setExamList(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < examList.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      console.log('No')
      setFinish(true)
    }
  }

  const start = () => {
    setstartBtn(false)
  }

  useEffect(() => {
    getQuestionList()
  }, [])

  return (
    <div>
      {/* <Navbar /> */}
      <br />
      <br />
      {startBtn ? (
        <center>
          <div
            className='card'
            style={{
              backgroundColor: '',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
              width: '90%',
              height: '700px',
            }}
          >
            <h1
              style={{
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '100px',
              }}
            >
              Start Your Exam
            </h1>
            <div style={{ paddingBottom: '290px' }}>
              <button
                size='lg'
                className='btn btn-success'
                style={{ fontWeight: 'bold', fontSize: '16px', width: '200px' }}
                onClick={start}
              >
                Start
              </button>
            </div>
          </div>
        </center>
      ) : (
        <center>
          {finish ? (
            <div
              className='card'
              style={{
                backgroundColor: '',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                width: '90%',
                height: '700px',
              }}
            >
              <h1
                style={{
                  fontWeight: 'bold',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  fontSize: '100px',
                }}
              >
                Finish !
              </h1>
              <div style={{ paddingBottom: '30px', paddingLeft: '1048px' }}>
                <button
                  size='lg'
                  className='btn btn-dark'
                  style={{
                    fontWeight: 'bold',
                    fontSize: '12px',
                    width: '200px',
                  }}
                  onClick={print}
                >
                  Answer Sheet
                </button>
              </div>
            </div>
          ) : (
            <div
              className='card'
              style={{
                backgroundColor: '',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                width: '90%',
                height: '700px',
              }}
            >
              {examList.length > 0 && (
                <div>
                  <h3
                    style={{
                      textAlign: 'left',
                      paddingLeft: '181px',
                      paddingTop: '170px',
                    }}
                  >
                    {examList[currentIndex].code}
                  </h3>
                  <br />
                  <h4 style={{ textAlign: 'left', paddingLeft: '181px' }}>
                    Question : {examList[currentIndex].question}
                  </h4>
                  <br />
                  <div style={{ textAlign: 'left', paddingLeft: '293px' }}>
                    <h5>1. {examList[currentIndex].answer1}</h5>
                    <h5 style={{ paddingTop: '8px' }}>
                      2. {examList[currentIndex].answer2}
                    </h5>
                    <h5 style={{ paddingTop: '8px' }}>
                      3. {examList[currentIndex].answer3}
                    </h5>
                    <h5 style={{ paddingTop: '8px' }}>
                      4. {examList[currentIndex].answer4}
                    </h5>
                  </div>
                </div>
              )}
              <div className='row' style={{ paddingTop: '95px' }}>
                <div className='col'>
                  <div style={{ paddingRight: '300px' }}>
                    <button
                      size='lg'
                      className='btn btn-success'
                      color='danger'
                      style={{ fontWeight: 'bold', fontSize: '12px' }}
                      onClick={handlePrevious}
                    >
                      Previous
                    </button>
                  </div>
                </div>
                <div className='col'>
                  <div style={{ paddingLeft: '300px' }}>
                    <button
                      size='lg'
                      className='btn btn-success'
                      color='danger'
                      style={{ fontWeight: 'bold', fontSize: '12px' }}
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </center>
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* <Footer /> */}
    </div>
  )
}

export default Exam
