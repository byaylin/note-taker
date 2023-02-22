//packages
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4:uuidv4 }  = require('uuid')

const app = express();
const PORT = process.env.PORT ||  3000;
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('./public'));

app.get('/', (req,res) => res.sendFile(path.join(__dirname, '/public/index.html')));
//routing
app.get('/notes', (req,res) =>{
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});
//post 
app.post('./api/notes',(req,res) => {
    const notes = fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf-8');
    const parseNotes = json.parse(notes);
    req.body.id = uuidv4();
    parseNotes.push(req.body);
//adds to db
   fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(parseNotes), 'utf-8');
    res.json('Note added successfully :)');
})

app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));