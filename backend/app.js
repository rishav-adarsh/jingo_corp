const express = require("express") ;
const mongoose = require("mongoose") ;
const dotenv = require("dotenv") ;
const cookieParser = require("cookie-parser") ;
const app = express() ;

const port = 5000 ;

// app.use(cookieParser()) ;

console.log('hello to my first node js project !!');

dotenv.config({path : './config.env'}) ;  
// const userSchema = require('./models/userSchema')  

app.use(express.json()) ;
app.use(require('./router/auth')) ;

require('./db/conn')
// const dataBase = process.env.DATABASE ;
// mongoose.connect(dataBase ,{
//     useNewUrlParser : true ,
//     // useCreateIndex : true ,
//     useUnifiedTopology : true ,
//     // useFindAndModify : false
// }).then(() => {
//     console.log('connection successful !!');
// }).catch((err) => {
//     console.log('connection failed !!');
//     console.log(err);
// }) ;


// Middleware


// const middleware = (req ,res ,next) => {
//     console.log("Here's my middleware");
//     next() ;
// } 

// app.get("/" ,(req ,res) => {
//     res.send("Welcome to Home Page !!") ;
//     console.log("Entered to home page") ;
// }) ;

// app.get("/about" ,middleware ,(req ,res) => {
//     res.send("<h1>Welcome to About Page !!</h1>") ;
//     console.log("Entered to about page") ;
// }) ;

// app.get("/contact" ,(req ,res) => {
//     res.send("Welcome to Contact Page !!") ;
//     console.log("Entered to contact page") ;
// }) ;

app.listen(port ,() => {
    console.log(`Server runing at port no. : ${port}`) ;
}) ;
