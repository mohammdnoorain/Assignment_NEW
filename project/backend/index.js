
require('dotenv').config()


const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()



const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

const bodyParser = require('body-parser');

//////////


const path = require('path');


const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(req,file,cb){
    cb(null,path.join(__dirname,'/public/productimage'));
    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name);


    }
});
const upload = multer({storage:storage});

////////////////

const App=express();
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({extended: true}));

App.use(express.static('public'));

App.use(express.static('public'));

App.use(cors({
    origin:'*'
}));

 




/// define routes

const loginRoute = require("./routes/loginRoute");
App.use('/api',loginRoute);


App.listen(8000,()=>{
    console.log('Server is Running on 8000');
 })

