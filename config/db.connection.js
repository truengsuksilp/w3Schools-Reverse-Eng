/* === External Modules === */
const mongoose = require('mongoose');

/* === System Variables === */
const MONGODB_URI = 'mongodb://localhost:27017/w3schools';


// == set mongoose connection with connection string
const connectionString = "mongodb://localhost:29017/test";

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
