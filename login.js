"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
require("express-session");
var path = require("path");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var connection_js_1 = require("./connection/connection.js");
var express_session_1 = require("express-session");
connection_js_1.default.connect(function (err) {
    if (err)
        throw err;
    console.log("Connected!");
});
var app = (0, express_1.default)();
app.use((0, express_session_1.default)({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path.join(__dirname, 'static')));
// http://localhost:3000/
app.get('/', function (req, res) {
    // Render login template
    res.sendFile(path.join(__dirname, 'login.html'));
});
// http://localhost:3000/auth
app.post('/auth', function (req, res) {
    // Capture the input fields
    var username = req.body.username;
    var password = req.body.password;
    // Ensure the input fields exists and are not empty
    if (username && password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        connection_js_1.default.query('SELECT * FROM accounts WHERE username = $1 AND password = $2', [username, password], function (error, results) {
            // If there is an issue with the query, output the error
            if (error)
                throw error;
            // If the account exists
            if (results.rowCount > 0) {
                // Authenticate the user
                req.session.loggedin = true;
                req.session.username = username;
                req.session.password = password;
                // Redirect to home page
                res.redirect('/home');
            }
            else {
                res.send('Incorrect Username and/or Password!');
            }
            res.end();
        });
    }
    else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});
// http://localhost:3000/home
app.get('/home', function (req, res) {
    // If the user is loggedin
    if (req.session.loggedin) {
        // Output username
        res.send('Welcome back, ' + req.session.username + '!');
    }
    else {
        // Not logged in
        res.send('Please login to view this page!');
    }
    res.end();
});
app.listen(Number(process.env.PORT));
