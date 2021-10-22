/* === Internal Modules === */
require('../config/db.connection');
const Question = require('../models/Question');

/* === Seed Data: [{}, ..., {}] === */
const questions = [
    {
        // FIXME THIS IS STILL HARD CODE
        exercise_id: '61721972107375b10b1e79d9',
        prompt: 'Define function called myFunction.  Use function followed by function name and ()',
        text_before_inputs: '',
        text_between_inputs: ` `,
        text_after_inputs: ` { console.log("Hello World"); }`,
        correct_answer_1: `function`,
        correct_answer_2: `myFunction()`,
        topic_order: 1,
        order: 4,

    },
    {
        exercise_id: '61721972107375b10b1e79d9',
        prompt: 'Assign a function called myFunction to a variable.  Then execute the function.',
        text_before_inputs: `const `,
        text_between_inputs: ` = `,
        text_after_inputs: `{ console.log("Hello") }; `,
        correct_answer_1: `myFunction`,
        correct_answer_2: `myFunction()`,
        topic_order: 2,
        order: 5,
    },
    {
        exercise_id: '61721972107375b10b1e79d9',
        prompt: 'Define function to console log hello and execute the function.',
        text_before_inputs: `function myfunction() {`,
        text_between_inputs: `; }"`,
        text_after_inputs: `;`,
        correct_answer_1: `console.log("Hello")`,
        correct_answer_2: `myfunction()`,
        topic_order: 3,
        order: 6,
    }
]

/* === Seed Function: async, try await, catch === */

const seedData = async (collection, data) => {
    try {
        // FIXME Hard code delete many to one exercise_id
        // await collection.deleteMany({ exercise_id: '61721972107375b10b1e79d9' });
        await collection.insertMany(data);

        // FIXME Hard code delete many to one exercise_id
        const check = await collection.find({exercise_id: '61721972107375b10b1e79d9'});

        console.log(`=== Seeded Questions Data ===`);
        console.log(check);
        console.log(data);
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

seedData(Question, questions);