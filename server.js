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

// Make this available to
app.use(function (req, res, next) {
    if (req.session.currentUser) {
      res.locals.user = req.session.currentUser;
      next();
    } else {
      next();
    }
});

// Use Security packages: helmet, mongoSanitize, morgan, rate limit, hpp

/* === Routes === */

// == Home
app.get('/', (req, res) => res.render('index'));

// == Auth
app.use('/', controllers.auth);

// == Exercise & Question
app.use('/exercises', controllers.exercise);

// == 404
app.get('/*', (req, res) => res.render('404'));

/* === Server Listeners === */
app.listen(PORT, () => console.log(`Listening on ${PORT} ❤️`));