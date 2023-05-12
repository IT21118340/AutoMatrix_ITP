const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    
    bank : {type :String, required : true},
    accNumber : {type : String, required : true},
    name : {type : String, required : true},
    branch: {type :String, required : true}
    
     
},{
        timestamps : true,
    
});


const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;