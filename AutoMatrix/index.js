const express = require('express')
const cors = require('cors')
const connectToDB = require('./config/connectToDB')
const courseRoutes = require('./routes/courseRoutes')
const studentRouter = require('./routes/studentRoutes')
const employeeRouter = require('./routes/staffRoutes')
const TicketRouter = require('./routes/ticket.route')
const sessionRoutes = require('./routes/sessionRoutes')
const studentSessionRoutes = require('./routes/studentSessionRoutes')
const InstructorRouter = require('./routes/instructor')
const PaymentRouter = require('./routes/payment')
const FeedbackRouter = require('./routes/feedback')
const exam = require('./routes/exam.js')
const app = express()
const port = process.env.PORT || 80

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '20mb', extended: true }))

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

// DSK => Connect to LM_DB
connectToDB()

// Student Routes
app.use('/students', studentRouter)

// Employee Routes
app.use('/api/employee', employeeRouter)

//tickets Routes
app.use('/ticket', TicketRouter)

// DSK

// course routes
app.use('/course', courseRoutes)

// session routes
app.use('/session', sessionRoutes)

// scs routes
app.use('/studentSession', studentSessionRoutes)

//Shukri

app.use('/instructor', InstructorRouter)
app.use('/payment', PaymentRouter)
app.use('/feedback', FeedbackRouter)

//
app.use('/exam', exam)
//Rosara

// MongoDb connection
//studentDB()

// listening the server
app.listen(port, () => console.log(`Server is running at ${port}`))
