const mongoose = require('mongoose');
const {productCollection} = require('./product.model');

const collection = 'carts';

const cartSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true
    
    },
    carrito:{
      type:[{
        producto:{
        type:mongoose.Schema.Types.ObjectId,
        ref:productCollection
        },
        cantidad:{type:Number}
        
      }],
      default:[]

    }
})

cartSchema.pre('findOne',function(next){
    this.populate('carrito.producto')
    next()
})

const cartModel = mongoose.model(collection,cartSchema);

module.exports = {cartModel};


