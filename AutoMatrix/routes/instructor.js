const router = require('express').Router();
const { response } = require('express');
let Instructor = require("../models/instructor.model");

const {
    addInstructor,
    getInstructors,
    updateInstructor,
    getInstructorById,
    deleteInstructor,
    // scheduleByEmployee
   
  } = require("../controllers/instructor.controller");

  router.post("/", addInstructor);

  router.get("/", getInstructors);

  router.get("/:id", getInstructorById);

  router.put("/:id", updateInstructor);

  router.delete("/:id", deleteInstructor);

module.exports = router;