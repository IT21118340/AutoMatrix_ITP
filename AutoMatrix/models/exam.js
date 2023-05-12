const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exam = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        },
        question: {
            type: String,
            required: true,
        },
        answer1: {
            type: String,
            required: true,
        },
        answer2: {
            type: String,
            required: true,
        },
        answer3: {
            type: String,
            required: true,
        },
        answer4: {
            type: String,
            required: true,
        },
        correctAnswer: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
const exam_Schema = mongoose.model(
    "exam",
    exam
);
module.exports = exam_Schema;
