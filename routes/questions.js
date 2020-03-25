const router = require("express").Router();
let Question = require("../models/question.model");

router.route("/").get((req, res) => {
  Question.find()
    .then(questions => res.json(questions))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  console.log("RES ", res);
  const text = req.body.text;
  const option1 = req.body.option1;
  const option2 = req.body.option2;
  const option3 = req.body.option3;
  const option4 = req.body.option4;
  const group = req.body.group || "";

  const date = Date.parse(req.body.date);

  const newQuestion = new Question({
    text,
    option1,
    option2,
    option3,
    option4,
    group,

    date
  });

  newQuestion
    .save()
    .then(() => res.json("Question added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Question.findById(req.params.id)
    .then(question => res.json(question))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  Question.findByIdAndDelete(req.params.id)
    .then(() => res.json("Question deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Question.findById(req.params.id)
    .then(question => {
      question.option1 = req.body.option1;
      question.option2 = req.body.option2;
      question.option3 = req.body.option3;
      question.option4 = req.body.option4;

      question.text = req.body.text;

      question.date = Date.parse(req.body.date);

      question
        .save()
        .then(() => res.json("Question updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
