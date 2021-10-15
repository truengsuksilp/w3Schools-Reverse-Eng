/* === External Modules === */
const express = require("express");
const { appendFile } = require("fs");

/* === Internal Modules === */

// -- DB Connection --
require("./config/db.connection")

/* === System Variables === */


/* === System Configuration === */

// -- Tell Express we are using ejs --


// -- Make public directory available --


// -- Express use body data (form data) --


// -- Override request methods --


/* === Middleware === */

// -- Logger --


/* === Routes === */

// -- Default Routes --


// -- Utility Routes --

/* === Server Listener === */
app.listen(3000, function() {
    console.log("Listening on port 3000 🎉");
});
