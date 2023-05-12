
const Feedback = require("../models/feedback.model");

const addFeedback = async (req, res) => {
    const { feedback,instructor } =
      req.body;
  
    const feedback1 = new Feedback({
        
        feedback,
        instructor
    });
  
    await feedback1
      .save()
      .then(() => res.json('Feedback added!'))
      .catch((error) => res.status(400).json("Error: " + error));
  };

  const getFeedback = async (req, res) => {
    try {
      const feedback = await Feedback.find();
      res.json(feedback);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const getFeedbackById = async (req, res) => {
    try {
      const feedback = await Feedback.findById(req.params.id);
      res.json(feedback);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const updateFeedback = async (req, res) => {
    Feedback.findByIdAndUpdate(req.params.id)
      .then((existingFeedback) => {
        existingFeedback.feedback = req.body.feedback;
        existingFeedback.instructor = req.body.instructor
       
        
        existingFeedback
          .save()
          .then(() => res.json('Feedback updated!'))
          .catch((error) => res.status(400).json("Error: " + error));
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  
  const deleteFeedback = async (req, res) => {
    Feedback.findByIdAndDelete(req.params.id)
      .then((deletedFeedback) => {
        res.json('Feedback deleted');
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  
  module.exports = {
    addFeedback,
    getFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
   
  }