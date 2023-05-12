import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import AdminHome from './AdminHome'
import AdminLogin from './adminLogin'
import './App.css'
import HomePage from './HomePage'
import NavBar from './NavBar'
import EditStudent from './studentComponents/editStudent'
import StudentProfileCard from './studentComponents/StudentCard'
import StudentLogin from './studentComponents/studentLogin'
import StudentDetails from './studentDetails'
// DSK
import AddCourse from './pages/admin/AddCourse'
import AddSession from './pages/admin/AddSession'
import AddStudentSession from './pages/admin/AddStudentSession'
import AdminLMHome from './pages/admin/AdminHome'
import AdminViewCourses from './pages/admin/AdminViewCourses'
import AdminViewSchedule from './pages/admin/AdminViewSchedule'
import EditCourse from './pages/admin/EditCourse'
import EditSession from './pages/admin/EditSession'
import EditStudentSession from './pages/admin/EditStudentSession'
import ViewStudentSession from './pages/admin/ViewStudentSession'
import LessonsPage from './pages/LessonsPage'
import ViewTimetable from './pages/ViewTimetable'
import EmployeeDetails from './staffComponents/staffDetails'
import EditEmployee from './staffComponents/editStaff'
import AddEmployee from './staffComponents/addStaff'
import { CreateTicket } from './ticketComponent/ticket-add.component'
import { TicketList } from './ticketComponent/ticket-list.component'
import { InstructorList } from './instructorComponents/instructor-list.component'
import { InstructorDetails } from './instructorComponents/instructor-details.component'
import { CreateInstructor } from './instructorComponents/instructor-add.component'
import { PaymentList } from './paymentComponents/payment-list.component'
import { CreatePayment } from './paymentComponents/payment-add.component'
import { FeedbackList } from './feedbackComponents/feedback-list.component'
import { CreateFeedback } from './feedbackComponents/feedback-add.component'
import EditFeedback from './feedbackComponents/feedback-edit.component'
import EditPayment from './paymentComponents/payment-edit.component'
import EditInstructor from './instructorComponents/instructor-edit.component'
import ExamPage from './pages/ExamPage'
import AddExam from './examComponents/AddExam'
import Exam from './examComponents/Exam'

const App = () => {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          {/* Start - Sabeel */}
          <Route path='/' element={<HomePage />} />
          <Route path='/adminHome' element={<AdminHome />} />
          <Route path='/adminLogin' element={<AdminLogin />} />
          <Route path='/studentdetails' element={<StudentDetails />} />
          <Route path='/editStudent/:id' element={<EditStudent />} />
          <Route path='/login' element={<StudentLogin />} />
          <Route path='/studentCard' element={<StudentProfileCard />} />
          {/* End - DSK */}

          {/* Start - DSK */}

          <Route path='/adminLMHome' element={<AdminLMHome />} />
          <Route path='/lessons' element={<LessonsPage />} />
          <Route path='/viewTimetable' element={<ViewTimetable />} />

          {/* Courses */}
          <Route path='/adminViewCourses' element={<AdminViewCourses />} />
          <Route path='/addCourse' element={<AddCourse />} />
          <Route path='/editCourse' element={<EditCourse />} />

          {/* Sessions */}
          <Route path='/adminViewSchedule' element={<AdminViewSchedule />} />
          <Route path='/addSession' element={<AddSession />} />
          <Route path='/editSession' element={<EditSession />} />

          {/* Student-Session */}
          <Route path='/viewStudentSession' element={<ViewStudentSession />} />
          <Route path='/addStudentSession' element={<AddStudentSession />} />
          <Route path='/editStudentSession' element={<EditStudentSession />} />

          {/* End - DSK */}

          {/* Employee */}
          <Route path='/staffDetails' element={<EmployeeDetails />} />
          <Route path='/editStaff/:id' element={<EditEmployee />} />
          <Route path='/addStaff' element={<AddEmployee />} />

          {/* Ticket */}
          <Route path='/createTicket' element={<CreateTicket />} />
          <Route path='/ticket' element={<TicketList />} />

          {/* instructor */}
          <Route exact path='/instructor' element={<InstructorList />} />
          <Route exact path='/creatInstructor' element={<CreateInstructor />} />
          <Route exact path='/editInstructor/:id' element={EditInstructor} />

          {/* payment */}
          <Route exact path='/payment' element={<PaymentList />} />
          <Route exact path='/creatPayment' element={<CreatePayment />} />
          <Route exact path='/editPayment/:id' element={EditPayment} />

          <Route exact path='/feedback' element={<FeedbackList />} />
          <Route exact path='/creatfeedback' element={<CreateFeedback />} />
          <Route exact path='/editFeedback/:id' element={EditFeedback} />

          <Route exact path='/idetails/:id' element={<InstructorDetails />} />

          {/*Sujeevan*/}
          <Route exact path='/exam' element={<ExamPage />} />
          <Route exact path='/AddExam' element={<AddExam />} />
          <Route exact path='/StartQuiz' element={<Exam />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
