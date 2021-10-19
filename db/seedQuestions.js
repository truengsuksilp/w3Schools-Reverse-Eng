/* === Internal Modules === */
require('../config/db.connection');
const Exercise = require('../models/Exercise');
const Question = require('../models/Question');

// FIXME: Get ID out of function scope
// Exercise.findOne({})
//     .exec( (err, foundExercise) => {
//         if (err) console.log(err);
//         console.log(foundExercise._id);
// });

/* === Seed Data: [{}, ..., {}] === */
const questions = [
    {
        // FIXME THIS IS STILL HARD CODE
        exercise_id: '616dba0a973491c2b32725e7',
        prompt: 'Create a variable called carName, assign the value Volvo to it.',
        correct_answer_1: 'carName',
        correct_answer_2: 'Volvo',
        order: 0,

    },
    {
        exercise_id: '616dba0a973491c2b32725e7',
        prompt: 'Create a variable called x, assign the value 50 to it.',
        correct_answer_1: 'x',
        correct_answer_2: '50',
        order: 1,
    },
    {
        exercise_id: '616dba0a973491c2b32725e7',
        prompt: 'Display the sum of 5 + 10, using two variables: x and y.  Assume: const y = 10; console.log(x + y);',
        correct_answer_1: 'x',
        correct_answer_2: '5',
        order: 2,
    }
]

/* === Seed Function: async, try await, catch === */

const seedData = async (collection, data) => {
    try {
        // await collection.deleteMany({});
        await collection.insertMany(data);
        console.log(`=== Seeded Questions Data ===`);
        console.log(data);
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

seedData(Question, questions);