/* === Internal Modules === */
require('../config/db.connection');
const Exercise = require('../models/Exercise');
const Question = require('../models/Question');

// FIXME: Get ID out of function scope
Exercise.findOne({})
    .exec( (err, foundExercise) => {
        if (err) console.log(err);
        console.log(foundExercise._id);
});

/* === Seed Data: [{}, ..., {}] === */
const questions = [
    {
        exercise_id: '616c5b9943613f7d93c87408',
        prompt: 'Create a variable called carName, assign the value Volvo to it.',
        correct_ans_1: 'carName',
        correct_ans_2: 'Volvo',
        order: 0,

    },
    {
        exercise_id: '616c5b9943613f7d93c87408',
        prompt: 'Create a variable called x, assign the value 50 to it.',
        correct_ans_1: 'x',
        correct_ans_2: '50',
        order: 1,
    }
]

/* === Seed Function: async, try await, catch === */

const seedData = async (collection, data) => {
    try {
        await collection.deleteMany({});
        await collection.insertMany(data);
        console.log(`=== Seeded Questions Data ===`);
        console.log(data);
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

seedData(Question, questions);