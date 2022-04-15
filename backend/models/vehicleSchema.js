const mongoose = require('mongoose') ;

const vehicleSchema = mongoose.Schema({
    modelName : {
        type : String ,
        required : true
    } ,
    image : {
        type : String ,
        required : true
    } ,
    type : {
        type : String ,
        enum: ["two-wheeler", "four-wheeler"] ,
        required : true
    } ,
    availableQty : {
        type : Number ,
        required : true ,
        default : 1
    } ,
    rate : { // pricing
        type : Number , // "55"
        required : true
    } ,
    state : {
        type : String ,
        required : true
    } ,
    city : {
        type : String ,
        required : true
    } ,
    substation : {
        type : String ,
        required : true
    }
}) ;

const Vehicle = mongoose.model("VEHICLE" ,vehicleSchema) ;
module.exports = Vehicle ;