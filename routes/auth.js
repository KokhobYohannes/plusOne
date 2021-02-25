const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

//router.post("/signup", authController.signup);
//router.post("/signup", authController.login);
//router.get('/logout', authController.logout);

router.post("/signup", function(req,res){
    authController.signup
});

router.post("/login", function(req,res){
    authController.login
});


router.post("/logout", function(req,res){
    authController.logout
});


module.exports = router;