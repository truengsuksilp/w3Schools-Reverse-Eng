/* === External Modules === */
const express = require('express');

/* === System Variables: route === */
const route = express.Router();
const User = require('../models/User');

/* === Routes | base url: / === */

// GET: Show Signup
route.get('/signup', (req, res) => {
    res.render('auth/signup');
})

// POST: Signup - creates user in DB
route.post('/signup', async (req, res, next) => {
    try {

        // Check if User Exists
        const userExist = await User.exists({ email: req.body.email });
        if (userExist) {
            console.log('=== ERROR: USER ALREADY EXISTS ===')
            return res.send('Username already exists')
        }

        // Create User
        await User.create(req.body);
        return res.redirect('/login');

    } catch (error) {
        console.log(error);   
        return next();
    }

});

// Show: Login
route.get('/login', (req, res) => {
    res.render('auth/login');
})

// POST: Authenticate User
route.post('/login', async (req, res, next) => {
    try {
        const foundUser = await User.findOne({ 
            email: req.body.email
        });

        if (!foundUser) {
            console.log('=== ERROR: User does not exist ===');
            return res.send("Invalid Email or Password");
        }
        
        const passMatch = (req.body.password === foundUser.password);

        if (!passMatch) {
            console.log('=== ERRROR: Password');
            return res.send("Invalid Email or Password");
        }

        // MATCH: Print in console
        console.log('=== LOGIN SUCCESSFUL ===')
        console.log(`User: ${req.body.email}`)

        // MATCH: Issue cookie
        req.session.currentUser = {
            id: foundUser._id,
            email: foundUser.email,
        }

        return res.redirect('/');


    } catch (error) {
        console.log(error);
        return next();
    }
})


/* === Exports: route === */
module.exports = route;





/* === TODO: Improvements === */

// == POST 
// try signup renders new page for signup error  
    // res.render('/auth/signupError)
    // res.render('/auth/loginError)