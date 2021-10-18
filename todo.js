/* === ANCHOR: SECTIONS TO ADD BY DAY === */

// == add these folders & files

// Day 1 for home page
// sass: src, variables
// npm i SESSION: session-module, connect-mongo

// Day 1 for Auth
// server.js: sessio module
// utils: auth, navlinks

// Day 2 for Exercise (no sidebar)
// exerciseController: pass context: { exercise: foundExercise }
// db: connect to MongoDB Atlas

// Day 3 for test deploy
// .env

// Day 4 for security
// npm i: morgan, rateLimit, helmet, mongoSanitize, hpp
    // server.js: require
    // server.js MIDDLEWARES: app.use()




// DUMP
// router.get('/:language/:exercise_id/:question_id', (req, res) => {
//     language = req.params.language;
//     exercise_id = req.params.exercise_id;
//     question_id = req.params.question_id;
    // res.send({
    //     msg: `Exercise page`, 
    //     language: language,
    //     exercise: exercise_id, 
    //     question: question_id,
    // });
// });