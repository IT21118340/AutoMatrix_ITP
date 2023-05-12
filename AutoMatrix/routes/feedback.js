const router = require('express').Router();
const { response } = require('express');
let Feedback = require("../models/feedback.model");

const {
    addFeedback,
    getFeedback,
    updateFeedback,
    getFeedbackById,
    deleteFeedback,
    // scheduleByEmployee
   
  } = require("../controllers/feedback.controller");

  router.post("/", addFeedback);

  router.get("/", getFeedback);

  router.get("/:id", getFeedbackById);

  router.put("/:id", updateFeedback);

  router.delete("/:id", deleteFeedback);

module.exports = router;