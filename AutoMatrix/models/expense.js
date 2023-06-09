const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema(
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
       
        "Advertising",
        "Interest Expense",
        "Meals & Entertainment",
        "Office Supplies",
        "Payroll Expense",
        "Rent Expense",
        "Repairs & Maintenance",
        "Telephone",
        "Travel Expense",
        "Utilities",
        "Vehicle Expense",
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

module.exports = mongoose.model("Expense", expenseSchema);
