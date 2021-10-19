/* === External Module === */
const mongoose = require('mongoose');

/* === Define Schema === */
const ExerciseSchema = new mongoose.Schema(
    {
        language: {
            type: String,
            required: true,
        },
        topic: {
            type: String,
            required: true,
        },
        exercise_id: {
            type: mongoose.Types.ObjectId,
            require: true,
            ref: 'Question',
        },
    },
    {
        timestamp: true,
    }
)

/* === Generate Model === */
const Exercise = mongoose.model('Exercise', ExerciseSchema);

/* === Exports Model === */
module.exports = Exercise;