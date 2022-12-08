import db from "./database";
const mysql = require('mysql');
const express = require('express');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const cors =require('cors');
const myConnection = require ('express-myconnection');
const port = 8000;
const SECRET = 'mykey'

//init express
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : true }))

//middleware db
app.use(myConnection(mysql, db(), 'pool'));

app.get("./", (req, res) => {

    req.getConnection((erreur, connection)=>{
            if(erreur) {
                console.log(erreur);
            }else {
                connection.query('SELECT * FROM notes', [], (erreur, resultat)=>{
                if(erreur){
                    console.log(erreur);
                }else{
                    res.status(200).render("index", {resultat })
                }
            })
        }
    })
});
//how to connect in mysql with nodej