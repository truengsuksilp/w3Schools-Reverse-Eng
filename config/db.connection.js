/* === External Modules === */
const mongoose = require("mongoose");


/* === System Variables === */

// == set mongoose connection with connection string
const connectionString = "mongodb://localhost:29017/test";

/* === Connect & Log === */

// connection.on('connected')
mongoose.connection.on("connected", function () {
    console.log("Mongoose connected to ${connectionString}")
})

// connection.on('error')
// connectio.on('disconnected')