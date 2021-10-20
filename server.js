/* === External Modules === */
const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');

/* === Internal Modules === */
const controllers = require('./controllers');
require("dotenv").config();

/* === System Variables === */
const app = express();
const PORT = process.env.PORT;

/* === System Config === */
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded( {extended: false} ))
app.use(express.static('public'));
app.use(express.static('assets'));
require('./config/db.connection.js');

// Session Config
app.use(
    session({
        store: MongoStore.create({mongoUrl: process.env.MONGODB_URI}),
        secret: process.env.SECRET,
        resave: false,  // LazyUpdate, so don't separate session between refresh of users
        saveUninitialized: false,  // create cookie for only successful logins
        cookie: {maxAge: 1000 * 60 * 60 * 24* 7 *2, }, // Cookie exp. after 2 weeks
        
}));


/* === Middleware === */
// NavBar: 
app.use(require('./utils/navlinks'));

// Use Security packages: helmet, mongoSanitize, morgan, rate limit, hpp

/* === Routes === */

// == Home
app.get('/', (req, res) => res.render('index'));

// == Bulma
app.get('/bulma', (req, res) => res.render('bulma'));

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
// dotenv
// @creativebulma/bulma-collapsible

// == base implementation
// methodOverride: CRUD - So we can use UPDATE as PUT
// urlEncoded: CRUD - So we can use CREATE and UPDATE with req.body

// NavBar MVP Middleware
// app.use(function (req, res, next) {
//     if (req.session.currentUser) {
//       res.locals.user = req.session.currentUser;
//       next();
//     } else {
//       next();
//     }
// });