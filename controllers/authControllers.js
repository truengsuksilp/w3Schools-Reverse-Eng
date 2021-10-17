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
route.post('/signup', async (req, res, next) => {
    // res.send({msg: `User Signup Data POSTED`, body: req.body})
    data = req.body;

    try {

        // Check if User Exists
        const userExist = await User.exists({ email: data.email });
        if (userExist) {
            console.log('=== ERROR: USER ALREADY EXIST ===')
            return res.send('Username already exist')
        }

        // Create User
        await User.create(data);
        return res.redirect('/login');

    } catch (error) {
        console.log(error);   
        return next();
    }

});

// Show: Login
route.get('/login', (req, res) => {
    // res.send({msg: `You are in login !!!`, body: req.body});
    res.render('auth/login');
})

// POST: Authenticate User
// 
route.post('/login', async (req, res, next) => {
    // res.send({msg: `User Login Data POSTED`, body: req.body});
    // Test: { blah@blah.com, blah }

    data = req.body;
    
    try {
        const foundUser = await User.findOne({ 
            email: data.email
        });

        if (!foundUser) {
            console.log('=== ERROR: User does not exist ===');
            return res.send("Invalid Email or Password");
        }
        
        const passMatch = (data.password === foundUser.password);

        if (!passMatch) {
            console.log('=== ERRROR: Password');
            return res.send("Invalid Email or Password");
        }

        console.log('=== LOGIN SUCCESSFUL ===')
        console.log(`User: ${req.body.email}`)
        return res.redirect('/');


    } catch (error) {
        console.log(error);
        return next();
    }
    User.findOne(req.body, (error, foundUser) => {
        console.log('=== Log in sucess ===')
        console.log(foundUser);
        return res.redirect('/');
    })
})



/* === Exports: route === */
module.exports = route;





/* === TODO === */

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
    // res.resder('/auth/loginError')
    // CREATE NEW VIEW MODULE: /view/auth/login_error.ejs
    
    // ANCHOR - Ask Dalton on how to show login message without reloading the page
    // jQuery Example 1: $('#err').show() )
    // jQuery Example 2: $('#err').onclick( (event) => $('#login').append(`<h4>Invalid Email or Password </h4>`)

// == POST - Login tracking with cookie
// SERVER.JS: require('session');
// POST: req.session.currentUser = {id: foundUser._id, username: foundUser.username};