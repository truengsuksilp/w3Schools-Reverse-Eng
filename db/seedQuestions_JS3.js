/* === Internal Modules === */
require('../config/db.connection');
const Question = require('../models/Question');

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
        topic_order: 1,
        order: 7,
    },
    {
        exercise_id: '616f3ab99d1e99ac72374147',
        prompt: `Alert that 'Winter Is Coming'.  Use dot notation and assume const GoT = {a: 'Winter Is ', b:'Coming'}`,
        text_before_inputs: 'alert(',
        text_between_inputs: ' + ',
        text_after_inputs: '};',
        correct_answer_1: 'GoT.a',
        correct_answer_2: 'GoT.b',
        topic_order: 2,
        order: 8,
    },
    {
        exercise_id: '616f3ab99d1e99ac72374147',
        prompt: `Alert that 'Winter Is Coming'.  Use bracket notation and assume const GoT = {a: 'Winter Is', b:'Coming'}`,
        text_before_inputs: 'alert(',
        text_between_inputs: ' + ',
        text_after_inputs: '};',
        correct_answer_1: 'GoT[a]',
        correct_answer_2: 'GoT[b]',
        topic_order: 3,
        order: 9,
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