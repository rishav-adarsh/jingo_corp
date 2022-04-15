const mongoose = require('mongoose') ;

const feedbackSchema = mongoose.Schema({
    name : {
        type : String ,
        required : true
    } ,
    email : {
        type : String ,
        required : true
    } ,
    query : {
        type : String ,
        required : true
    } ,
}) ;

const Feedback = mongoose.model("FEEDBACK" ,feedbackSchema) ;
module.exports = Feedback ;