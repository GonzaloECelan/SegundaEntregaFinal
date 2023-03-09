const mongoose = require('mongoose');


const userCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name:{type:String},
    last_name:{type:String},
    email:{type:String, required:true, unique:true},
    age:{type:Number},
    password:{type:String, required:true},
    rol:{type:String, default:'user'}
})


const userModel = mongoose.model(userCollection,userSchema);

module.exports = {userModel};