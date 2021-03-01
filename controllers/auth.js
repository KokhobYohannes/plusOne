const mysql = require('mysql');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const {promisify} = require('util');
let connection = require('./../database/connect');
exports.login = async (req,res) => {
    try{
        const{email, password} = req.body;
        if(!email || !password ){
            return res.status(400).render('login', {
                message: 'please provide an email and password'
            })
        }
        connection.query('SELECT * from users where email = ?', [email], async (error,results) =>{
            if(error){
              return res.status(400).render('login', {
                message: 'Email is incorrect'
              })
            }
            if (results.length<1 || !(await bcrypt.compare(password,results[0].password))){
              res.status(401).render('login',{
                  message: 'Password is incorrect'
              })
              }else{
                const id = results[0].id;

                const token = jwt.sign({id},process.env.JWT_SECRET,{
                    expiresIn: process.env.JWT_EXPIRES_IN
                }
                    );

                    console.log("the token is:" + token);
                    const cookieOptions= {
                        expires: new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 *1000
                        ),

                        httpOnly: true
                    }

                    res.cookie('jwt', token, cookieOptions);
                    res.status(200).redirect("/");
            }
        })
        console.log("results");

    }catch(error){
        console.log(error);
    }
}








// signup function
 exports.signup = async (req,res)=> {
    console.log(req.body)

  const {first_name, last_name, phone_number, email, password, passwordConfirm} = req.body;
// look into db to select the column of email
// db.query('SELECT email FROM user WHERE email = ?',[email], async(error,results)=>{
// if (error){
//     console.log(error);
// }
// if(results.length >0){
//     return res.render('signup',{
//         message:'That email is already in use'
//     })
// }else if(password !==passwordConfirm){
//     return res.render('signup',{
//         message: 'Password do not match'
//     });
// }

// the password need to be stored in safe place
       const hashedPassword = await bcrypt.hash(password, 8);

       connection.query('INSERT INTO users SET ? ',{first_name:first_name, last_name: last_name, phone_number: phone_number, email:email, password:hashedPassword}, (error, results)=>{
        if(error){
          console.log(error);
        }
        else{
            
            return res.render('signup', {
                message: 'user registered'
            });
        }

  })

   
}





exports.isLoggedIn = async (req, res, next) => {
    // console.log(req.cookies);
    if( req.cookies.jwt) {
      try {
        //1) verify the token
        const decoded = await promisify(jwt.verify)(req.cookies.jwt,
        process.env.JWT_SECRET
        );
  
        console.log(decoded);
  
        //2) Check if the user still exists
        connection.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, result) => {
          console.log(result);
  
          if(!result) {
            return next();
          }
  
          req.user = result[0];
          console.log("user is")
          console.log(req.user);
          return next();
  
        });
      } catch (error) {
        console.log(error);
        return next();
      }
    } else {
      next();
    }
  }
  

  //logout function
  exports.logout = async (req, res) => {
    res.cookie('jwt', 'logout', {
      expires: new Date(Date.now() + 2*1000),
      httpOnly: true
    });
  
    return res.redirect('/');
  }