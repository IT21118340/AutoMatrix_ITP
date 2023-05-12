const router = require('express').Router();
const { response } = require('express');
let Payment = require("../models/payment.model");

const {
    addPayment,
    getPayment,
    updatePayment,
    getPaymentById,
    deletePayment,
    // scheduleByEmployee
   
  } = require("../controllers/payment.controller");

  router.post("/", addPayment);

  router.get("/", getPayment);

  router.get("/:id", getPaymentById);

  router.put("/:id", updatePayment);

  router.delete("/:id", deletePayment);

module.exports = router;