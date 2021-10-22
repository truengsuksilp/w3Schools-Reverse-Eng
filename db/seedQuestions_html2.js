/* === Internal Modules === */
require('../config/db.connection');
const Question = require('../models/Question');

/* === Seed Data: [{}, ..., {}] === */
const questions = [
    {
        // FIXME THIS IS STILL HARD CODE
        exercise_id: '6171f393bd094e71fad717e5',
        prompt: 'Use the correct HTML tag to add a heading with the text "London".',
        //text_before_inputs: '',
        //text_between_inputs: '',
        text_after_inputs: `London is the capital city of England. It is the most populous city in the United Kingdom, with a metropolitan area of over 13 million inhabitants.</p>`,
        correct_answer_1: '<h1>London</h1>',
        //correct_answer_2: '',
        topic_order: 1,
        order: 4,
    },
    {
        exercise_id: '6171f393bd094e71fad717e5', 
        prompt: 'Add two headings to the document with the text "Hello".</br></br> The first should be the most important heading (the largest) and the second should be the least important heading (the smallest).',
        text_before_inputs: '<html></br><body>',
        //text_between_inputs: '',
        text_after_inputs: '</html></br></body>',
        correct_answer_1: '<h1>Hello</h1>',
        correct_answer_2: '<h6>Hello</h6>',
        topic_order: 2,
        order: 5,
    },
    {
        exercise_id: '6171f393bd094e71fad717e5',
        prompt: 'The following headline is the second most important title on the page. Mark up the text with the appropriate tags.',
        //text_before_inputs: '',
        //text_between_inputs: ``,
        text_after_inputs: `Florida Man Charged With Assault With A Deadly Weapon After Throwing Alligator Through Wendy's Drive-Thru Window`,
        correct_answer_1: '<h2>',
        correct_answer_2: '</h2>',
        topic_order: 3,
        order: 6,
    }
]

/* === Seed Function: async, try await, catch === */

const seedData = async (collection, data) => {
    try {
        // FIXME Hard code delete many to one exercise_id
        await collection.deleteMany({ exercise_id: '6171f393bd094e71fad717e5' });
        await collection.insertMany(data);
        console.log(`=== Seeded Questions Data ===`);
        console.log(data);
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

seedData(Question, questions);