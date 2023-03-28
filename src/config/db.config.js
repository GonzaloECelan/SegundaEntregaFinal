const mongoose = require('mongoose');
const config = require('../config/env.config')

const url = process.env.MONGO_URI;


mongoose.set('strictQuery', false);

mongoose.connect(url,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('Conexion exitosa a MD')
    }
})