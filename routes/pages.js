const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const path = require('path');

router.get('/',authController.isLoggedIn,(req, res)=>{
    res.render('index',{
        user: req.user
    });
})


router.get("/login",(req,res)=>{
   
    res.render('login');
});

router.get('/signup',(req,res)=>{
    
    res.render('signup');
});

router.get('/eventsinvite',(req,res)=>{
    
    res.sendFile(path.join(__dirname,'../public/') +'eventinvite.html');
});

router.get('/profile', authController.isLoggedIn, (req,res)=>{

    console.log(req.user);
    if(req.user){
        res.render('profile',{
            user: req.user
        });
    } else{
        res.redirect('/login')
    }
})

module.exports = router;


