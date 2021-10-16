/* === External Modules === */
const express = require('express');

/* === System Variables: route === */
const route = express.Router();

/* === Routes | base url: / === */

// Show: Signup
route.get('/signup', (req, res) => {
    res.send({msg: `You are in signup !!!`, body: req.body});
})

// Show: Login
route.get('/login', (req, res) => {
    res.send({msg: `You are in login !!!`, body: req.body});
})

/* === Exports: route === */
module.exports = route;
