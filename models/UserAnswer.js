/* === External Module === */
const mongoose = require('mongoose');

/* === Schema === */
const UserAnswerSchema = new mongoose.Schema(
    {
        question_id: {},
        user_id: {},
    }
);

/* === Model === */
const UserAnswer = mongoose.model('UserAnswer', UserAnswerSchema);

/* === Exports === */
module.exports = UserAnswer;