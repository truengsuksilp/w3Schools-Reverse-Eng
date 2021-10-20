/* === External Modules: express === */
const express = require('express');

/* === System Variables: route === */
const router = express.Router();
const Exercise = require('../models/Exercise');
const Question = require('../models/Question');
const UserAnswer = require('../models/UserAnswer');

/* === Routes | base url: /exercises === */

// Show: CSS
router.get('/css', async (req, res) => {
    try {
        // res.send({msg: "CSS link", body: res.body})
        const foundExercise = await Exercise.findOne({language: 'css', order: 1})
        const foundQuestion = await Question.findOne({exercise_id: foundExercise._id, order: 1})
            .populate('exercise_id')
        
        // Hard code for CSS
        const foundAllExercises = await Exercise.find({language: 'css'})

        // Nested array.  Each element is an array of 3 question objects.
        const allQuestions = [];
    
        for ( i in foundAllExercises ) {
                const questions = await Question.find({exercise_id: foundAllExercises[i]._id});
                allQuestions.push(questions);
        }
        // console.log(allQuestions);

        context = {
            question: foundQuestion,
            allQuestions: allQuestions,
            allExercises: foundAllExercises,
            // url: currentURL,
        };

        return res.render('exercises/ide', context);

    } catch (error) {
        console.log(error)
    }

});


// Show: Unspecified
router.get('/:language', async (req, res) => {
    try {
        const foundExercise = await Exercise.findOne({order: 1})
        const foundQuestion = await Question.findOne({exercise_id: foundExercise._id, order: 1})
            .populate('exercise_id')

        const url = `/exercises/${req.params.language}/${foundQuestion._id}/${foundQuestion.order}`

        return res.redirect(url);

    } catch (error) {
        console.log(error)
    }

});

// Show: Specified
router.get('/:language/:question_id/:order', async (req, res) => {

    // res.send({msg:'Specified', body: req.params});

    try {
        const foundQuestion = await Question.findOne({_id: req.params.question_id, order: req.params.order})
            .populate('exercise_id');

        const foundAllExercises = await Exercise.find({language: req.params.language})

        // Nested array.  Each element is an array of 3 question objects.
        const allQuestions = [];

        for ( i in foundAllExercises ) {
            const questions = await Question.find({exercise_id: foundAllExercises[i]._id});
            allQuestions.push(questions);
        }
        // console.log(allQuestions);

        const currentURL = `/exercises/${req.params.language}/${req.params.question_id}/${req.params.order}`
        console.log(currentURL);
        
        context = {
            question: foundQuestion,
            allQuestions: allQuestions,
            allExercises: foundAllExercises,
            url: currentURL,
        };
        
        return res.render('exercises/exercise', context);

    } catch (error) {
        console.log(error);
    }

});

// SHOW : Get Answers

router.post('/:language/:question_id/:order', async (req, res, next) => {

    // res.send({msg: 'POSTED ANSWERS', body: req.body, params: req.params});

    const user_answer_1 = req.body.user_answer_1;
    const user_answer_2 = req.body.user_answer_2;

    try {
        const foundQuestion = await Question.findById(req.params.question_id);
        const noOfQuestions = await Question.count({});

        const userAnswerLog = { 
            user_id: 'admin', 
            question_id: req.params.question_id, 
        };

        checkAns1 = user_answer_1 === foundQuestion.correct_answer_1;
        checkAns2 = user_answer_2 === foundQuestion.correct_answer_2;
        isLastQuestion = parseInt(req.params.order) === noOfQuestions;

        if ( checkAns1 && checkAns2 && !isLastQuestion) { 
            UserAnswer.create(userAnswerLog);
            console.log(`Logged user progress`);

            const nextQuestion = parseInt(req.params.order) + 1
            
            // TO DO - Add a congrats page!!!
            
            const foundQuestion = await Question.findOne({order: nextQuestion});    
            const nextURL = `/exercises/${req.params.language}/${foundQuestion._id}/${nextQuestion}`;
            
            const context = {
                question: foundQuestion, 
                url: nextURL
            };
            
            return res.redirect(nextURL);

        } else if (isLastQuestion) {

            res.send({
                msg: " You've done the last question!! ", 
                params: req.params 
            })
            
        } else {
            console.log('Incorrect ans, not logged');
            console.log([user_answer_1, user_answer_2]);
        }

    } catch (error) {
        console.log(error);
        next()
    }
    
});



// Show: DAY 3 - Reset score


/* === Exports: route === */
module.exports = router;









// * === TODO === */

// == Show: DAY 3 - Reset Score
// router.post('/:exercise_id/:question_id', (res, req) => {
    
    // Grab id from cookie generated by authController
        // userId = req.session.currentUser.id
    // Delete data in UserAnswer    
        // UserAnswer.deleteMany( {userId} )

// });

// Stretch Goal
// setTimeout(() => {
//     console.log('redirect after 1 seconds')
// }, 1000);