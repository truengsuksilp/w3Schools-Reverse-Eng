/* === Internal Modules === */
require('../config/db.connection');
const Question = require('../models/Question');

/* === Seed Data: [{}, ..., {}] === */
const questions = [
  {
    // FIXME - HARDCODE
    exercise_id: "61706078f6b21961de98d328",
    prompt: 'Set a "4px", "dotted" border for <p>.',
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
    exercise_id: "61706078f6b21961de98d328",
    prompt: 'Set the border color for <p> to "red".',
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
    exercise_id: "61706078f6b21961de98d328",
    prompt: 'Change the 3 border properties, so that they only show the border on the top side.',
    text_before_inputs: '',
    text_between_inputs: '',
    text_after_inputs: '',
    correct_answer_1: '',
    correct_answer_2: '',
    topic_order: 3,
    order: 3,
    __v: 0
  }
]

/* === Seed Function: async, try await, catch === */

const seedData = async (collection, data) => {
    try {
        // FIXME Hard code delete many to one exercise_id
        await collection.deleteMany({ exercise_id: '61706078f6b21961de98d328' });
        await collection.insertMany(data);
        console.log(`=== Seeded Questions Data ===`);
        console.log(data);
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

seedData(Question, questions);