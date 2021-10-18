/* === External Module === */
const mongoose = require('mongoose');

/* === Schema === */
const UserAnswerSchema = new mongoose.Schema(
    {
        question_id: {
            type: String,
            required: true,
        },
        user_id: {
            type: String,
            required: true,
        },
    }
);

/* === Model === */
const UserAnswer = mongoose.model('UserAnswer', UserAnswerSchema);

/* === Exports === */
module.exports = UserAnswer;