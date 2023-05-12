const Payment = require("../models/payment.model");

const addPayment = async (req, res) => {
    const { bank,accNumber, name, branch } =
      req.body;
  
    const payment = new Payment({
        
        bank,
        accNumber,
        name,
        branch
    });
  
    await payment
      .save()
      .then(() => res.json('Payment added!'))
      .catch((error) => res.status(400).json("Error: " + error));
  };

  const getPayment = async (req, res) => {
    try {
      const payment = await Payment.find();
      res.json(payment);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const getPaymentById = async (req, res) => {
    try {
      const payment = await Payment.findById(req.params.id);
      res.json(payment);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const updatePayment = async (req, res) => {
    Payment.findByIdAndUpdate(req.params.id)
      .then((existingPayment) => {
        existingPayment.bank = req.body.bank;
        existingPayment.accNumber = req.body.accNumber;
        existingPayment.name = req.body.name;
        existingPayment.branch = req.body.branch
       
        
        existingPayment
          .save()
          .then(() => res.json('Payment updated!'))
          .catch((error) => res.status(400).json("Error: " + error));
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  
  const deletePayment = async (req, res) => {
    Payment.findByIdAndDelete(req.params.id)
      .then((deletedPayment) => {
        res.json('Payment deleted');
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  
  module.exports = {
    addPayment,
    getPayment,
    getPaymentById,
    updatePayment,
    deletePayment,
   
  }