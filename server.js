/* === External Modules === */
const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// Security Basic pack
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const sanitize = require('express-mongo-sanitize');  // Uses secret key to sanitizes, prevent MongoDB Operator Injection.
const morgan = require('morgan'); // HTTP request logger
const hpp = require("hpp"); // Query pollution

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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

// Use security packages
app.use(helmet({contentSecurityPolicy: false,}));
app.use(sanitize());
app.use(hpp());
app.use(rateLimit(limiter));
app.use(morgan('dev'));

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