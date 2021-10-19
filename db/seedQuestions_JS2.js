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
        exercise_id: '616f3ab99d1e99ac72374146',
        prompt: 'Define function called myFunction.  Use function followed by function name and ()',
        text_before_inputs: '',
        text_between_inputs: ` `,
        text_after_inputs: `() { console.log("Hello World"); }`,
        correct_answer_1: `function`,
        correct_answer_2: `myFunction`,
        order: 1,

    },
    {
        exercise_id: '616f3ab99d1e99ac72374146',
        prompt: 'Assign a function called myFunction to a variable.  Then execute the function.',
        text_before_inputs: `const `,
        text_between_inputs: `" = "`,
        text_after_inputs: `"{ console.log("Hello") }; `,
        correct_answer_1: `myFunction`,
        correct_answer_2: `myFunction()`,
        order: 2,
    },
    {
        exercise_id: '616f3ab99d1e99ac72374146',
        prompt: 'Define function to console log hello and execute the function.',
        text_before_inputs: `function myfunction () {"`,
        text_between_inputs: `";}"`,
        text_after_inputs: `";`,
        correct_answer_1: `console.log("Hello")`,
        correct_answer_2: `myfunction()`,
        order: 3,
    }
]

/* === Seed Function: async, try await, catch === */

const seedData = async (collection, data) => {
    try {
        // FIXME Hard code delete many to one exercise_id
        await collection.deleteMany({ exercise_id: '616f3ab99d1e99ac72374146' });
        await collection.insertMany(data);
        console.log(`=== Seeded Questions Data ===`);
        console.log(data);
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

seedData(Question, questions);