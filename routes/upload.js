let express = require("express");
let router = express.Router();
var multer  = require('multer'); 
let path = require("path");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //path save file
        cb(null, path.join(__dirname,"../public/upload"))
    },
    filename: function (req, file, cb) {
        // save file name
        cb(null,  Date.now()+ file.originalname)
    }
})
var upload = multer({storage:storage});
router.post("/",upload.single("file"),(req,res)=>{
    //console.log(req.file);
    console.log(req.files);
    
    // change avatar in DB
})
module.exports = router ;