/* === External Module === */
const mongoose = require('mongoose');

/* === Define Schema === */
const QuestionSchema = new mongoose.Schema(
    {
        exercise_id: {
            type: mongoose.Types.ObjectId,
            require: true,
            ref: 'Exercise',
        },
        prompt: {
            type: String,
            require: true,
        },
        correct_ans_1: {
            type: String,
            require: true,
        },
        correct_ans_2: {
            type: String,
            require: true,
        },
        order: {
            type: Number,
            require: true,
        }
    },
    {
        timestamp: true,
    }
)

/* === Generate Model === */
const Question = mongoose.model('Question', QuestionSchema);

/* === Exports Model === */
module.exports = Question;