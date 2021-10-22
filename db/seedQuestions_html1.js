/* === Internal Modules === */
require('../config/db.connection');
const Question = require('../models/Question');

/* === Seed Data: [{}, ..., {}] === */
const questions = [
    {
        // FIXME THIS IS STILL HARD CODE
        exercise_id: '6171f393bd094e71fad717e4',
        prompt: 'Add a "tooltip" to the paragraph below with the text "About W3Schools".',
        text_before_inputs: '<p',
        //text_between_inputs: '',
        text_after_inputs: `="About W3Schools">W3Schools is a web developer's site.</p>`,
        correct_answer_1: 'title',
        //correct_answer_2: '',
        topic_order: 1,
        order: 1,
    },
    {
        exercise_id: '6171f393bd094e71fad717e4',
        prompt: 'Set the size of the image to 250 pixels wide and 400 pixels tall.',
        text_before_inputs: '<img src="w3schools.jjpg" width="',
        text_between_inputs: '" height="',
        text_after_inputs: '">',
        correct_answer_1: '250',
        correct_answer_2: '400',
        topic_order: 2,
        order: 2,
    },
    {
        exercise_id: '6171f393bd094e71fad717e4',
        prompt: 'Make the element below into a link that goes to "https://www.w3schools.com".',
        text_before_inputs: '<a ',
        //text_between_inputs: ``,
        text_after_inputs: '"https://www.w3schools.com">This is a link</a>',
        correct_answer_1: 'href=',
        //correct_answer_2: '',
        topic_order: 3,
        order: 3,
    }
]

/* === Seed Function: async, try await, catch === */

const seedData = async (collection, data) => {
    try {
        // FIXME Hard code delete many to one exercise_id
        // await collection.deleteMany({ exercise_id: '6171f393bd094e71fad717e4' });
        await collection.insertMany(data);
        console.log(`=== Seeded Questions Data ===`);
        console.log(data);
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

seedData(Question, questions);