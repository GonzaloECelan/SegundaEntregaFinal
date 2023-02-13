const mongoose = require('mongoose');
const {productCollection} = require('./product.model');

const collection = 'carts';

const cartSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true
    
    },
    productos:{
      type:[{
        quantity:{type:Number},
        type:mongoose.Schema.Types.ObjectId,
        ref:productCollection
      }]

    }
})

cartSchema.pre('findOne',function(next){
    this.populate('productos')
    next()
})

const cartModel = mongoose.model(collection,cartSchema);

module.exports = {cartModel};


