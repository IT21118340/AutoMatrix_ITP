const express = require('express')
const router = new express.Router()
const employeeController = require('../controllers/StaffController')

router.post('/employees', employeeController.createEmployee)
router.get('/employees', employeeController.getEmployees)
router.get('/employees/:id', employeeController.getEmployeeById)
router.put('/employees/:id', employeeController.updateEmployeeById)
router.delete('/employees/:id', employeeController.deleteEmployeeById)

module.exports = router
