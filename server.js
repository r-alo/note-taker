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

//Create public site w/ Express
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//API service for note manipulation

    //Get database notes
app.get('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(notesDb, 'utf8'))
    res.json(notes)
}
);

    //Post new notes
app.post('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(notesDb, 'utf8'));
    const note = req.body;
    console.log(note);
    note.id = notes.length + 1;
    notes.push(note);
    fs.writeFileSync(notesDb, JSON.stringify(notes));
    res.json(notes)
}
);

    //Delete existing notes
app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    let notes = JSON.parse(fs.readFileSync(notesDb, 'utf8'));
    notes.forEach((note, index) => {
        if (note.id === parseInt(id)) {
            notes.splice(index, 1)
        }
    })
    fs.writeFileSync(notesDb, JSON.stringify(notes));
    res.json(notes)
}
);





