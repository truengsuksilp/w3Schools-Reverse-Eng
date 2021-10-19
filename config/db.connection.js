/* === External Modules === */
const mongoose = require('mongoose');

/* === System Variables === */
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;

/* === Connect & Log === */
mongoose.connect(MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected: ${MONGODB_URI} 🦇🦇🦇`);
});

mongoose.connection.on('error', (error) => {
    console.log(`Connection err: ${MONGODB_URI} 😭`);
    console.log(error);
});

mongoose.connection.on('disconnected', () => {
    console.log(`Disconnected: ${MONGODB_URI}`);
    console.log('byeee 👋');
});
