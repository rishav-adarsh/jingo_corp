const express = require("express") ;
const mongoose = require("mongoose") ;
const dotenv = require("dotenv") ;
const app = express() ;

const dataBase = process.env.DATABASE ;
mongoose.connect(dataBase ,{
    useNewUrlParser : true ,
    // useCreateIndex : true ,
    useUnifiedTopology : true ,
    // useFindAndModify : false
}).then(() => {
    console.log('connection successful !!');
}).catch((err) => {
    console.log('connection failed !!');
    console.log(err);
}) ;
