const mongoose = require('mongoose');
const db = require('../config/db');
var otpSchema = new mongoose.Schema({
    email:String,
    code:String,
    expireIn:Number
},{
    timestamps:true
})

let otp = db.model('otp' , otpSchema,'otp');