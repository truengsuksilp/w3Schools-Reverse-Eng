/* === External Modules: express === */
const express = require('express');

/* === Internal Modules: SESSIONS === */
// req.session.currentUser

/* === System Variables: route === */
const router = express.Router();
const Exercise = require('../models/Exercise');
const Question = require('../models/Question');
const UserAnswer = require('../models/UserAnswer');

/* === Routes | base url: /exercises === */

// Show: Unspecified
router.get('/:language', async (req, res) => {
    try {
        const foundExercise = await Exercise.findOne({order: 1, language: req.params.language})
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

        // ANCHOR Check if user is logged in

        const userProgress = async () => {
            if (req.session.currentUser) {
                const userProgress = await UserAnswer.count({email: req.session.currentUser.email});
                return userProgress
            } else {
                const userProgress = null;
                return Promise.resolve(null)
            }    
        }
        

        const foundQuestion = await Question.findOne({_id: req.params.question_id, order: req.params.order})
            .populate('exercise_id');

        const foundAllExercises = await Exercise.find({language: req.params.language});

        // Nested array.  Each element is an array of 3 question objects.
        const allQuestions = [];

        for ( i in foundAllExercises ) {
            const questions = await Question.find({exercise_id: foundAllExercises[i]._id});
            allQuestions.push(questions);
        }

        const currentURL = `/exercises/${req.params.language}/${req.params.question_id}/${req.params.order}`
        
        const context = {
            question: foundQuestion,
            allQuestions: allQuestions,
            allExercises: foundAllExercises,
            url: currentURL,
        };

        // Add Progress to context
        if (req.session.currentUser) {
            context.progress = await UserAnswer.count({user_id: req.session.currentUser.email});   
        } else {
            context.progress = null;
        }  
        
        // Logic: Decide whether to route it to IDE
        isExerciseCSS = req.params.language.localeCompare('css') === 0;

        if (isExerciseCSS) {
            return res.render('exercises/exerciseCss', context);
        } else {
            return res.render('exercises/exercise', context);
        }

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

        // ANCHOR LOG USER ANSWER
        const userAnswerLog = { 
            user_id: req.session.currentUser.email, 
            question_id: req.params.question_id, 
        };

        // ANCHOR Checks answer and edge case
        checkAns1 = user_answer_1 === foundQuestion.correct_answer_1;
        checkAns2 = user_answer_2 === foundQuestion.correct_answer_2;
        isLastQuestion = parseInt(req.params.order) === noOfQuestions;

        if ( checkAns1 && checkAns2 && !isLastQuestion) { 
            UserAnswer.create(userAnswerLog);
            console.log(`Logged user progress`);

            const nextQuestion = parseInt(req.params.order) + 1
            
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