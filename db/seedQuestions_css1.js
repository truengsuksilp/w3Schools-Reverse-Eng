/* === Internal Modules === */
require('../config/db.connection');
const Question = require('../models/Question');

/* === Seed Data: [{}, ..., {}] === */
const questions = [
    {
        // FIXME - HARDCODE
        exercise_id: "61706078f6b21961de98d326",
        prompt: 'Change the color of all <p> elements to "red".',
        text_before_inputs: '',
        text_between_inputs: '',
        text_after_inputs: '',
        correct_answer_1: '',
        correct_answer_2: '',
        topic_order: 1,
        order: 1,
        __v: 0
      },
      {
        exercise_id: "61706078f6b21961de98d326",
        prompt: 'Change the color of the element with id="para1", to "red".',
        text_before_inputs: '',
        text_between_inputs: '',
        text_after_inputs: '',
        correct_answer_1: '',
        correct_answer_2: '',
        topic_order: 2,
        order: 2,
        __v: 0
      },
      {
        exercise_id: "61706078f6b21961de98d326",
        prompt: 'Change the color of all elements with the class "colortext", to "red".',
        text_before_inputs: '',
        text_between_inputs: '',
        text_after_inputs: '',
        correct_answer_1: '',
        correct_answer_2: '',
        topic_order: 3,
        order: 3,
        __v: 0
      },
]

/* === Seed Function: async, try await, catch === */

const seedData = async (collection, data) => {
    try {
        // FIXME Hard code delete many to one exercise_id
        await collection.deleteMany({ exercise_id: '61706078f6b21961de98d326' });
        await collection.insertMany(data);
        console.log(`=== Seeded Questions Data ===`);
        console.log(data);
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

seedData(Question, questions);