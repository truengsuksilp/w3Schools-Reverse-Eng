/* === Internal Modules === */
require('../config/db.connection');
const Exercise = require('../models/Exercise');

/* === Seed Data: [{}, ..., {}] === */
const exercises = [
    {
        language: 'js',
        topic: 'JS Variables',
        order: 1,
    },
    {
        language: 'js',
        topic: 'JS Functions',
        order: 2,
    },
    {
        language: 'js',
        topic: 'JS Objects',
        order: 3,
    },
    // {
    //     language: 'css',
    //     topic: 'CSS Selectors',
    //     order: 1,
    // },
    // {
    //     language: 'css',
    //     topic: 'CSS Background',    /* SKIP SECOND EXERCISE */
    //     order: 2,
    // },
    // {
    //     language: 'css',
    //     topic: 'CSS Border',
    //     order: 3,
    // },
    // {
    //     language: 'html',
    //     topic: 'HTML Attributes',
    //     order: 1,
    // },
    // {
    //     language: 'html',
    //     topic: 'HTML Headings',
    //     order: 2,
    // },
    // {
    //     language: 'html',
    //     topic: 'HTML Paragraph',
    //     order: 3,
    // }
];

/* === Seed Function: async, try await, catch === */

const seedData = async (collection, data) => {
    try {
        await collection.deleteMany({ language: 'js' });
        await collection.insertMany(data);
        console.log(`=== Seeded Exercise or Question Data ===`);
        console.log(data);
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

seedData(Exercise, exercises);

// ANCHOR -- Issue: CANNOT GET id from Exercise.findOne({})