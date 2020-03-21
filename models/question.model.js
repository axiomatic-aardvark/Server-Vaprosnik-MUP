const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    text: { type: String, required: true },
    option1: { type: String, required: true },
    option2: { type: String, required: true },
    option3: { type: String, required: true },
    option4: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
