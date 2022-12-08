const express = require('express');
const app = express();

const port = 8000;

const helloword = (req, res) => {
    res.send("hello world!");   
}

app.get('/hello', helloword);

app.get('/hello', (req, res) =>{
    res.send('hellow world!');
    
})
app.post('/login', (req, res) =>{
    const {username, password} = req.body;
})



app.listen = // ecoute les requetes 
app.listen(port);