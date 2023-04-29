import { Client } from 'pg';
import express, { Request, Response } from 'express';
import "express-session";
declare module "express-session" {
    interface SessionData {
    loggedin: boolean;
    username: string;
    password: string; }
}
import * as path from 'path';
import dotenv from 'dotenv';
dotenv.config();

import client from './connection/connection.js';
import session from 'express-session';

client.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
const app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// http://localhost:3000/
app.get('/', (req:Request, res: Response) => {
    // Render login template
    res.sendFile(path.join(__dirname, 'login.html'));

});

// http://localhost:3000/auth
app.post('/auth', function(req:Request, res: Response) {
    // Capture the input fields
    let username = req.body.username;
    let password = req.body.password;
    // Ensure the input fields exists and are not empty
    if (username && password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        client.query('SELECT * FROM accounts WHERE username = $1 AND password = $2', [username, password], function ( error: Error, results: any ) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.rowCount > 0) {
                // Authenticate the user
                req.session.loggedin = true;
                req.session.username = username;
                req.session.password = password;
                // Redirect to home page
                res.redirect('/home');
            } else {
                res.send('Incorrect Username and/or Password!');
            }           
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});

// http://localhost:3000/home
app.get('/home', function(req:Request, res: Response) {
    // If the user is loggedin
    if (req.session.loggedin) {
        // Output username
        res.send('Welcome back, ' + req.session.username + '!');
    } else {
        // Not logged in
        res.send('Please login to view this page!');
    }
    res.end();
});
app.listen(Number(process.env.PORT));