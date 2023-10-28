const express=require("express");
const loginRoute = express();
const bodyParser = require("body-parser");

loginRoute.use(bodyParser.json());
loginRoute.use(bodyParser.urlencoded({extended:true}));
/////


/////// multer
const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
    destination:function(req,file,cb){
    cb(null,path.join(__dirname,'../public/adminimage'),function(error,success){
        if(error){
            console.log(error);
        }
    });
    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name,function(error,success){
            if(error){
                console.log(error);
            }
        });


    }
});


const adminimageupload = multer({storage:storage});
loginRoute.use(express.static('public'));
/////////



const loginController = require("../controllers/loginController");

loginRoute.get('/get-posts',loginController.getPosts);
loginRoute.post('/create-post',adminimageupload.single('image'),loginController.createPost);

loginRoute.get('/delete-post/:id',loginController.deletePost);
loginRoute.post('/update-post',adminimageupload.single('image'),loginController.updatePost);




module.exports = loginRoute;  