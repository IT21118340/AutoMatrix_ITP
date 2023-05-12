const router = require('express').Router();
let exam_Schema = require('../models/exam');

router.route('/addexam').post((req, res) => {
    const { code, question, answer1, answer2, answer3, answer4, correctAnswer } = req.body;
    const exam = new exam_Schema({ code, question, answer1, answer2, answer3, answer4, correctAnswer });
    exam.save()
        .then(() => res.json('Qusetion Add!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/updateexam/").put(async (req, res) => {
    const { code, question, answer1, answer2, answer3, answer4, correctAnswer } = req.body;

    const exam = {
        code, question, answer1, answer2, answer3, answer4, correctAnswer
    }
    const update = await exam_Schema.findOneAndUpdate({ code: code }, exam).then(() => {
        res.status(200).send({ status: "Qusetion Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Qusetion Data", error: err.message });
    });
});

router.route("/deleteexam/:code").delete(async (req, res) => {
    let code = req.params.code;
    exam_Schema.findOneAndDelete({ code: code })
        .then(() => {
            res.status(200).send({ status: "Qusetion Deleted" });

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Deleting Data", error: err.message });
        });
});

router.route("/allexam").get(async (req, res) => {
    exam_Schema.find()
        .then(exam => res.json(exam))
        .catch(err => res.status(400).json('No Data'))
});


module.exports = router;