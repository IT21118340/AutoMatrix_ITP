const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const instructorSchema = new Schema({
    
    fullName: {type :String, required : true},
    nic: {type :String, required : true, unique : true},
    dob : {type : String, required : true},
    contactNo : {type : String, required : true},
    email: {type :String, required : true},
    address: {type :String, required : true},
    position : {type : String, required : true},
    password : {type : String, required : true},
    cpassword : {type : String, required : true},
    
    // workingSchedule : {type: mongoose.Schema.Types.ObjectId, ref:'workingSchedule'}
    
     
},{
        timestamps : true,
    
});


const Instructor = mongoose.model("Instructor", instructorSchema);

module.exports = Instructor;