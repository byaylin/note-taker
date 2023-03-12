//packages
const express = require('express');
const fs = require('fs');
const path = require('path');
//const { v4:uuidv4 }  = require('uuid')
const app = express();
const PORT = process.env.PORT ||  3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('./public'));

//route to main page
app.get('/', (req,res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

//route to notes.html
app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

//route notes to db.json to be read
app.get('/api/notes', (req,res) =>{
    res.sendFile(path.join(__dirname, 'db/db.json'))
});

//creates new note and store in db 
app.post('/api/notes/', (req, res) => {
    var newNote = req.body;
    var noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    newNote.id = Math.floor(Math.random() * 10000);
    noteList.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
    res.json(noteList)
})


app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
