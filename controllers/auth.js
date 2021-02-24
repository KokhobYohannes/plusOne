const mysql = require('mysql');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

// make sure the server to wait for an action
exports.login = async (req,res) => {
    try{
        const{email, password} = req.body;

        if(!email || !password ){
            return res.status(400).render('login', {
                message: 'please provide an email and password'
            })
        }
    
    db.query('SELECT * from users where email = ?' [email], async (error,result) =>{
        if (!results || await bcrypt.compare(password,results[0].password))
        res.status(401).render('login',{
            message: 'Email or Password is incorrect'
        })
        else{
            const id = results[0].id;

            const token = jwt.sign({id: id},process.env.JWT_SECRET,{
                expiresIn: process.env.JWT_EXPIRES_IN
            }
                );

                console.log("the token is:" + token);
                const cookieOptions= {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60
                    ),

                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions);
                res.status(200). redirect("/");
        }
    })

    }catch(error){
        console.log(error)
    }
}









exports.register = (req,res)=> {
    console.log(req.body);

const {first_name, email, password, passwordConfirm} = req.body;

// look into db to select the column of email
db.query('SELECT email FROM users WHERE email = ?',[email], async(error,result)=>{
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

// the password need to be store in safe place
    let hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);
    //res.send("testing");

    db.query('INSERT INTO users SET ?',{first_name:first_name, email:email, password:hasedPassword}, (error, results)=>{

   
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        return res.render('signup', {
            message: 'user registered'
        });
    }

})
})
   
}