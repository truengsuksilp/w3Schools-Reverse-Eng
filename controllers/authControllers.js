/* === External Modules === */
const express = require('express');

/* === System Variables: route === */
const route = express.Router();
const User = require('../models/User');

/* === Routes | base url: / === */

// GET: Show Signup
route.get('/signup', (req, res) => {
    // res.send({msg: `You are in signup !!!`, body: req.body});
    res.render('auth/signup');
})

// POST: Execute Signup by creating user in DB
route.post('/signup', (req, res) => {
    // res.send({msg: `User Signup Data POSTED`, body: req.body})
    data = req.body;

    User.create(data, (error, userCreated) => {
        if (error) console.log(error);      
        console.log(userCreated);
        return res.redirect('/login');
    })
})

// Show: Login
route.get('/login', (req, res) => {
    // res.send({msg: `You are in login !!!`, body: req.body});
    res.render('auth/login');
})

// POST: Authenticate User
// 
route.post('/login', (req, res) => {
    // res.send({msg: `User Login Data POSTED`, body: req.body});
    // Test: { blah@blah.com, blah }

    data = req.body;
    
    User.findOne(req.body, (error, foundUser) => {
        if (error) console.log(error);
        console.log('=== Log in sucess ===')
        console.log(foundUser);
        return res.redirect('/');
    })
})



/* === Exports: route === */
module.exports = route;





/* === TODO === */

// == Show
// res.render('/auth/login');
// res.render('/auth/signup');

// == POST 
// Add async try{await}, error{}
// try signup
    // CREATE: User.create(req.body, (req, res) => { return res.redirect('/login')})
// error signup
    // console.log(error)
    // res.render('/auth/signupError)
    // CREATE NEW VIEW MODULE: /views/auth/signup_error.ejs
// try login
    // Check EMAIL in DB: foundUser = User.findOne({ email: req.body.email })
    // Check PASSWORD in DB: foundPassword = User.findOne({ password: req.body.password })
    // Redirect: req.redirect('/');
// error login
    // console.log(error)
    // res.resder('/auth/loginError)
    // CREATE NEW VIEW MODULE: /view/auth/login_error.ejs
    
    // ANCHOR - Ask Dalton on how to show login message without reloading the page
    // jQuery Example 1: $('#err').show() )
    // jQuery Example 2: $('#err').onclick( (event) => $('#login').append(`<h4>Invalid Email or Password </h4>`)

// == POST - Login tracking with cookie
// SERVER.JS: require('session');
// POST: req.session.currentUser = {id: foundUser._id, username: foundUser.username};