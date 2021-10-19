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
        exercise_id: '616f3ab99d1e99ac72374147',
        prompt: 'Add the following property and value to the person object: country: Norway.',
        text_before_inputs: 'const person = {"',
        text_between_inputs: `": "`,
        text_after_inputs: `"};`,
        correct_answer_1: 'country',
        correct_answer_2: 'Norway',
        order: 1,

    },
    {
        exercise_id: '616f3ab99d1e99ac72374147',
        prompt: `Alert that 'Winter Is Coming'.  Use dot notation and assume const GoT = {a: 'Winter Is ', b:'Coming'}`,
        text_before_inputs: 'alert(',
        text_between_inputs: ' + ',
        text_after_inputs: '};',
        correct_answer_1: 'GoT.a',
        correct_answer_2: 'GoT.b',
        order: 2,
    },
    {
        exercise_id: '616f3ab99d1e99ac72374147',
        prompt: `Alert that 'Winter Is Coming'.  Use bracket notation and assume const GoT = {a: 'Winter Is', b:'Coming'}`,
        text_before_inputs: 'alert(',
        text_between_inputs: ' + ',
        text_after_inputs: '};',
        correct_answer_1: 'GoT[a]',
        correct_answer_2: 'GoT[b]',
        order: 3,
    }
]

/* === Seed Function: async, try await, catch === */

const seedData = async (collection, data) => {
    try {
        // FIXME Hard code delete many to one exercise_id
        await collection.deleteMany({ exercise_id: '616f3ab99d1e99ac72374147' });
        await collection.insertMany(data);
        console.log(`=== Seeded Questions Data ===`);
        console.log(data);
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

seedData(Question, questions);