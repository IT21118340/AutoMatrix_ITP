const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const liabilitySchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: [
       
        "BankLoan",
        "Creditor",
      ],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    account: {
      type: String,
      enum: ["Cash"],
    },
    notes: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Liability", liabilitySchema);
