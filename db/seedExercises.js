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
    // },
    // {
    //     language: 'css',
    //     topic: 'CSS Background',    /* SKIP SECOND EXERCISE */
    // },
    // {
    //     language: 'css',
    //     topic: 'CSS Border',
    // },
    // {
    //     language: 'html',
    //     topic: 'HTML Attributes',
    // },
    // {
    //     language: 'html',
    //     topic: 'HTML Headings',
    // },
    // {
    //     language: 'html',
    //     topic: 'HTML Paragraph'
    // }
];

/* === Seed Function: async, try await, catch === */

const seedData = async (collection, data) => {
    try {
        await collection.deleteMany({});
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