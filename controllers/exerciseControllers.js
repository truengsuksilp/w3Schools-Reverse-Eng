/* === External Modules: express === */
const express = require('express');

/* === System Variables: route === */
const router = express.Router();
const Exercise = require('../models/Exercise');
const Question = require('../models/Question');
const UserAnswer = require('../models/UserAnswer');

/* === Routes | base url: /exercises === */

// Show
router.get('/:language/:exercise_id/:question_id', (req, res) => {
    language = req.params.language;
    exercise_id = req.params.exercise_id;
    question_id = req.params.question_id;

    // FIXME MongooseError: Query was already executed: https://stackoverflow.com/questions/68945315/mongooseerror-query-was-already-executed
        // Update: Question.findById(req.params.question_id)

    const question = Question.findOne({})
        .populate('exercise_id')
        .exec( (err, foundQuestion) => {
            if (err) console.log(err);
            const exercise_id = foundQuestion._id;

            context = { question: foundQuestion };
            return res.render('exercises/exercise', context);
        });

});

// Show : Get Answers
router.post('/:language/:exercise_id/:question_id', (req, res, next) => {

    // res.send({msg: 'POSTED ANSWERS', body: req.body, params: req.params});

    const user_answer_1 = req.body.user_answer_1;
    const user_answer_2 = req.body.user_answer_2;

    console.log('working on it');

    Question.findById(req.params.question_id, (error, foundQuestion) => {

        if (error) {
            console.log(error)
        } else {
            const correct_answer_1 = foundQuestion.correct_answer_1;
            const correct_answer_2 = foundQuestion.correct_answer_2;
            const userAnswerLog = { 
                user_id: 'admin', 
                question_id: req.params.question_id, 
            };

            if (user_answer_1 === correct_answer_1 && user_answer_2 === correct_answer_2) { 
                UserAnswer.create(userAnswerLog);
                console.log(`Logged user progress`);
            } else {
                console.log('Incorrect ans, not logged');
                console.log([user_answer_1, correct_answer_1]);
            }
        }
    });
});

// Show: DAY 3 - Skip to next exercise

// Show: DAY 3 - Reset score©


/* === Exports: route === */
module.exports = router;









// * === TODO === */

// == DAY 2 - Correct Answer
// Current approach: Same as Update Product
// New approach: Ask how to show answer without reload

// router.get('/:language/:exercise_id/:question_id/answer', (req, res) => { res.render('/../answer')});

// Show: DAY 2 - Correct Answer


// == Show: DAY 3 - Reset Score
// router.post('/:exercise_id/:question_id', (res, req) => {
    
    // Grab id from cookie generated by authController
        // userId = req.session.currentUser.id
    // Delete data in UserAnswer    
        // UserAnswer.deleteMany( {userId} )

// });

// Show : Get Answers - SPARE
// Locale Compare: Try this when equality fails
// if(user_answer_1.localeCompare(correct_answer_1) === 0 && user_answer_localeCompare(correct_answer_2) === 0) {

// Stretch Goal
// setTimeout(() => {
//     console.log('redirect after 1 seconds')
// }, 1000);

// ANCHOR - SHOW: ASYNC ATTEMPT
    // Why doesn't it AWAIT?
    // TypeError: Cannot read properties of null (reading '_id')

// try {
//     const foundQuestion = await Question.findById(req.params.question_id).populate('exercise_id');
//     const exercise_id = await foundQuestion._id;
//     context = { question: foundQuestion };
//     return res.render('exercises/exercise', context);
// } catch (error) {
//     console.log(error);
// }