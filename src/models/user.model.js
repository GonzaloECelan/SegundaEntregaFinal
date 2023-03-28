const mongoose = require('mongoose');


const userCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name:{type:String},
    last_name:{type:String},
    email:{type:String, unique:true},
    age:{type:Number},
    password:{type:String},
    rol:{type:String, default:'user'},
    provider:{type:String}
})


const userModel = mongoose.model(userCollection,userSchema);

module.exports = {userModel};