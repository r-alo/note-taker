// Require express, path and fs
const express = require('express');
const path = require('path');
const fs = require('fs');
//Route for database
const notesDb = './db/db.json';

// Set up for express app and port
const app = express();
const PORT = 3001;

//Set up middle-wares 
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Port for the app to run
app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);

