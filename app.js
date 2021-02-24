const express = require('express');
const app = express();
const path = require('path');
const dotenv = require("dotenv");
dotenv.config({path:'./.env'})

const PORT= 3000;
const mysql = require("mysql");
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

app.set('view engine', 'hbs');

const publicDirectory = path.join(__dirname,'./public')
app.use(express.static(publicDirectory));
db.connect((error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log("MySQL connected")
    }
})

//define Routes

app.use('/', require('/routes/pages.js'));
app.use('/auth',require('./routes/auth'));

//make sure we can grab the data from any form
app.use(express.urlencoded({extended: false}));

//grab the form coming in as json
app.use(express.json());


app.listen(PORT, ()=>{
    console.log('Server listening on: http://localhost:${PORT}');
})