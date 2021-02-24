const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth')

router.post("/signup",(req,res)=>{
   
    res.render('index');
});


module.exports = router;