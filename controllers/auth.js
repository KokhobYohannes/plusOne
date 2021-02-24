const mysql = require('mysql');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const mysql = require("mysql");
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})




exports.register = (req,res)=> {
    console.log(req.body);

const {name, email, password, passwordConfirm} = req.body;

// look into db to select the column of email
db.query('SELECT email FROM users WHERE email = ?'[email], (error,result)=>{
if (error){
    console.log(error)
}
if(result.length >0){
    return res.render('signup',{
        message:'That email is already in use'
    })
}else if(password !==passwordConfirm){
    return res.render('signup',{
        message: 'Password do not match'
    });
}

})


    res.send("Form submitted")
   
}