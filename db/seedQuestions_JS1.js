/* === Internal Modules === */
require('../config/db.connection');
const Question = require('../models/Question');

/* === Seed Data: [{}, ..., {}] === */
const questions = [
    {
        // FIXME THIS IS STILL HARD CODE
        exercise_id: '61721972107375b10b1e79d8',
        prompt: 'Create a variable called carName, assign the value Volvo to it.',
        text_before_inputs: 'var ',
        text_between_inputs: ` = `,
        text_after_inputs: ``,
        correct_answer_1: 'carName',
        correct_answer_2: 'Volvo',
        topic_order: 1,
        order: 1,
    },
    {
        exercise_id: '61721972107375b10b1e79d8',
        prompt: 'Create a variable called x, assign the value 50 to it.',
        text_before_inputs: 'var ',
        text_between_inputs: ` = `,
        text_after_inputs: ``,
        correct_answer_1: 'x',
        correct_answer_2: '50',
        topic_order: 2,
        order: 2,
    },
    {
        exercise_id: '61721972107375b10b1e79d8',
        prompt: 'Display the sum of 5 + 10, using two variables: x and y.  Assume: const y = 10;',
        text_before_inputs: 'var ',
        text_between_inputs: ` = `,
        text_after_inputs: `; console.log(x + y);`,
        correct_answer_1: 'x',
        correct_answer_2: '5',
        topic_order: 3,
        order: 3,
    }
]

/* === Seed Function: async, try await, catch === */

const seedData = async (collection, data) => {
    try {
        // FIXME Hard code delete many to one exercise_id
        await collection.deleteMany({ exercise_id: '61721972107375b10b1e79d8' });
        await collection.insertMany(data);
        console.log(`=== Seeded Questions Data ===`);
        console.log(data);
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

seedData(Question, questions);