const Instructor = require("../models/instructor.model");

const addInstructor = async (req, res) => {
    const { fullName,nic, dob, contactNo, email, address, position, password, cpassword } =
      req.body;
  
    const instructor = new Instructor({
        
        fullName,
        nic,
        dob,
        contactNo,
        email,
        address,
        position,
        password,
        cpassword
    });
  
    await instructor
      .save()
      .then(() => res.json('Instructor added!'))
      .catch((error) => res.status(400).json("Error: " + error));
  };

  const getInstructors = async (req, res) => {
    try {
      const instructor = await Instructor.find();
      res.json(instructor);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const getInstructorById = async (req, res) => {
    try {
      const instructor = await Instructor.findById(req.params.id);
      res.json(instructor);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const updateInstructor = async (req, res) => {
    Instructor.findByIdAndUpdate(req.params.id)
      .then((existingInstructor) => {
        existingInstructor.fullName = req.body.fullName;
        existingInstructor.nic = req.body.nic;
        existingInstructor.dob = req.body.dob;
        existingInstructor.email = req.body.email;
        existingInstructor.contactNo = req.body.contactNo;
        existingInstructor.address = req.body.address;
        existingInstructor.position = req.body.position;
        existingInstructor.password = req.body.password;
        existingInstructor.cpassword = req.body.cpassword;
       
        
        existingInstructor
          .save()
          .then(() => res.json('Instructor updated!'))
          .catch((error) => res.status(400).json("Error: " + error));
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  
  const deleteInstructor = async (req, res) => {
    Instructor.findByIdAndDelete(req.params.id)
      .then((deletedInstructor) => {
        res.json('Instructor deleted');
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  
  module.exports = {
    addInstructor,
    getInstructors,
    getInstructorById,
    updateInstructor,
    deleteInstructor,
   
  }