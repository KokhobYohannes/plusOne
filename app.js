const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path:'./.env'});
const cookiesParser = require('cookie-parser');
const PORT= 4240;
const db = require("./models"); 

let connection = require('./database/connect');

/*
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE.PORT,
})*/ 

app.set('view engine', 'hbs');

const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));


//parse URL-encoded bodies (as sent by HTML forms)
//make sure we can grab the data from any form
app.use(express.urlencoded({extended: false}));
/*
db.connect((error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log("MySQL connected")
    }
})
*/




//grab the form coming in as json
app.use(express.json());
app.use(cookiesParser());

//define Routes

app.use('/', require('./routes/pages'));
app.use('/auth',require('./routes/auth'));
require('./routes/api-routes.js')(app);


// Syncing our sequelize models and then starting our Express app
db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
  });
  