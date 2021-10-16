/* === External Modules === */
const express = require('express');
const methodOverride = require('method-override');

/* === Internal Modules === */
const controllers = require('./controllers');

/* === System Variables === */
const app = express();
const PORT = 5000;

/* === System Config === */
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded( {extended: false} ))
app.use(express.static('public'));

/* === Middleware === */
// NavBar: app.use(require('/utils/navlinks'));

/* === Routes === */

// == Home
app.get('/', (req, res) => res.render('index'));

// == Auth
app.use('/', controllers.auth);

// == Exercise & Question
app.use('/exercises', controllers.exercise);

// == User Answers

// == 404
app.get('/*', (req, res) => res.render('404'));

/* === Server Listeners === */
app.listen(PORT, () => console.log(`Listening on ${PORT} ❤️`));















/* === NOTE: Base packages === */

// == npm i
// express
// mongoose
// method-override
// nodemon

// == base implementation
// methodOverride: CRUD - So we can use UPDATE as PUT
// urlEncoded: CRUD - So we can use CREATE and UPDATE with req.body

// == Test URL 
// Test 'http://localhost:5000/exercises/js/1/1' 
// W3 URL: www.w3schools.com/js/exercise_js.asp?filename=exercise_js_variables1

/* === ANCHOR: SECTIONS TO ADD BY DAY === */

// == add these folders & files

// Day 1 for home page
// sass: src, variables
// public: scripts, styles 
// npm i SESSION: session-module, connect-mongo

// Day 1 for Auth
// server.js: sessio module
// utils: auth, navlinks

// Day 2 for Exercise (no sidebar)
// db: seed.js & connect to MongoDB Atlas

// Day 3 for test deploy
// .env

// Day 4 for security
// npm i: morgan, rateLimit, helmet, mongoSanitize, hpp
    // server.js: require
    // server.js MIDDLEWARES: app.use()