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
        text_before_inputs: {
            type: String,
            require: true,
        },
        text_between_inputs: {
            type: String,
            require: true,
        },
        text_after_inputs: {
            type: String,
            require: true,
        },
        correct_answer_1: {
            type: String,
            require: true,
        },
        correct_answer_2: {
            type: String,
            require: true,
        },
        topic_order: {
            type: Number,
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