/* === External Modules: express === */
const express = require('express');

/* === System Variables: route === */
const router = express.Router();
const Exercise = require('../models/Exercise');
const Question = require('../models/Question');
const UserAnswer = require('../models/UserAnswer');

/* === Routes | base url: /exercises === */

// Reset progress
router.get('/:language/reset', async (req, res, next) => {
    try {
        if (!req.session.currentUser) {
            return res.redirect(`/exercises/${req.params.language}`);
        };
        const deletedAnswers = await UserAnswer.deleteMany({
            user_id: req.session.currentUser.email
        });
        return res.redirect(`/exercises/${req.params.language}`);
    } catch (error) {
        console.log(error);
        req.error = error;
        next();
    }
})

// Show: Unspecified order, then find the first question for the languague
router.get('/:language', async (req, res, next) => {
    try {
        const foundExercise = await Exercise.findOne({
            order: 1, 
            language: req.params.language,
        });
        const foundQuestion = await Question.findOne({exercise_id: foundExercise._id, order: 1})
            .populate('exercise_id');

        // NOTE: Pass into the next router: Show exercise page of a specified question
        const url = `/exercises/${req.params.language}/${foundQuestion._id}/${foundQuestion.order}`
        return res.redirect(url);
    } catch (error) {
        console.log(error);
        req.error = error;
        next();
    }
});

// Show: Specified
router.get('/:language/:question_id/:order', async (req, res, next) => {
    try {    
        const foundQuestion = await Question.findOne({_id: req.params.question_id, order: req.params.order})
            .populate('exercise_id');

        // Create an array of exercises in order defined by DB
        const foundAllExercises = await Exercise.find({language: req.params.language, order: 1});
        const noOfTopics = await Exercise.count({language: req.params.language});
        for ( i = 2; i <= noOfTopics; i++ ) {
            const foundExercise = await Exercise.findOne({language: req.params.language, order: i});
            foundAllExercises.push(foundExercise);
        };
        console.log(foundAllExercises);

        // NOTE: Nested array of topics and questions to render on sidebar
        const allQuestions = [];
        for ( i in foundAllExercises ) {
            const questions = await Question.find({exercise_id: foundAllExercises[i]._id}).sort({topic_order: 1});
            allQuestions.push(questions);
        }

        // URL to pass into form for POST request
        const currentURL = `/exercises/${req.params.language}/${req.params.question_id}/${req.params.order}`
        
        // NOTE Define context and enhance it
        const context = {
            question: foundQuestion,
            allQuestions: allQuestions,
            allExercises: foundAllExercises,
            url: currentURL,
        };
        if (req.session.currentUser) {
            context.progress = await UserAnswer.count({user_id: req.session.currentUser.email});   
        } else {
            context.progress = null;
        };
        
        // Logic: Decide whether to route it to IDE
        const isExerciseCSS = req.params.language.localeCompare('css') === 0;
        if (isExerciseCSS) {
            return res.render('exercises/exerciseCss', context);
        } else {
            return res.render('exercises/exercise', context);
        }
    } catch (error) {
        console.log(error);
        req.error = error;
        next();
    }

});

// SHOW : Get Answers

router.post('/:language/:question_id/:order', async (req, res, next) => {
    try {
        // Get User Id function
        const getId = () => {
            if (req.session.currentUser) {
                return req.session.currentUser.email;
            } else {
                return 'unregistered';
            }
        }
        
        // Ger user's identity and answers
        const user_answer_1 = req.body.user_answer_1;
        const user_answer_2 = req.body.user_answer_2;
        const userAnswerLog = { 
            user_id: getId(), 
            question_id: req.params.question_id, 
        };

        // Get correct answers and check user's answers
        const foundQuestion = await Question.findById(req.params.question_id);
        const checkAns1 = user_answer_1 === foundQuestion.correct_answer_1;
        const checkAns2 = user_answer_2 === foundQuestion.correct_answer_2;

        // Check if user is on the last question
        const noOfQuestions = await Question.count({});
        const isLastQuestion = parseInt(req.params.order) === noOfQuestions;

        // LOGIC: Decide whether to LOG and REDIRECT to the next question
        if ( checkAns1 && checkAns2 && !isLastQuestion) { 
            UserAnswer.create(userAnswerLog);
            const nextQuestion = parseInt(req.params.order) + 1
            const foundQuestion = await Question.findOne({order: nextQuestion}); 
            
            // Context: Pass URL to pass into form for next POST request   
            const nextURL = `/exercises/${req.params.language}/${foundQuestion._id}/${nextQuestion}`;           
            const context = {question: foundQuestion, url: nextURL};
            return res.redirect(nextURL);
        } else if (isLastQuestion) {
            res.send({ msg: " You've done the last question!! " });
        } else {
            console.log(`Incorrect.  Not logged.  Answers: ${user_answer_1}, ${user_answer_2}`);
        }
    } catch (error) {
        console.log(error);
        req.error = error;
        next();
    }   
});


/* === Exports: route === */
module.exports = router;





/* Nested Array: DID NOT WORK CONSISTENTLY */
        // // NOTE: Nested array of topics and questions to render on sidebar
        // const allQuestions = [];
        // for ( i in foundAllExercises ) {
        //     const arr = [];
        //     const questionsInTopic = await Question.count({
        //         exercise_id: foundAllExercises[i]._id
        //     });
        //     console.log(questionsInTopic);
        //     console.log(foundAllExercises[0]._id);
        //     console.log(await Question.findOne({
        //         exercise_id: foundAllExercises[i]._id,
        //         order: i+1,
        //     }));

        //     for ( j = 0; j < questionsInTopic; j++ ) {
        //         const questions = await Question.findOne({
        //             exercise_id: foundAllExercises[j]._id,
        //             order: j+1,
        //         });
        //         arr.push(questions)
        //     }
        //     allQuestions.push(arr);
        // }
        // console.log(allQuestions);