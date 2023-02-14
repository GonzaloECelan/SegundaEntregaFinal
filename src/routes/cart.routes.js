const mongoose = require('mongoose');
const {Router} = require('express');
const {cartModel} = require('../models/cart.model');

const router = Router();



// metodo para crear carrito con usuario
router.post('/', async(req,res)=>{
    const userName = req.body;

    try {
        if(!userName){
            res.send('Please! enter username')
        }else{
            const response = await cartModel.create(userName);
            
            res.status(200).send({result:'Cart created'})
        }
    
    } catch (error) {
        console.log(error)
    }
});



// metodo para agregar productos al carrito

router.post('/add', async (req,res)=>{

 

    const {cartId,productId,quantity} = req.body;
    try {
        // const cart = await cartModel.findOne({_id:cartId}).lean();
        
        const response = await cartModel.findOneAndUpdate({_id:cartId},{$push:{carrito:{producto:productId,cantidad:quantity}}})
        res.status(200).send({result:'success', addProduct: response});   
       
        
    } catch (error) {
        console.log(error)
    }
})

// metodo para traer productos de carrito con populate

router.get('/populate/:cid', async(req,res)=>{
    const cartId = req.params.cid;
    try {
        const cart = await cartModel.findOne({_id:cartId}).lean();

        const data = {
            h1:'Mi carrito',
            username: cart.username,
          
        }
        res.render('carrito',data)
    
    } catch (error) {
        console.log(error)
    }
})

// metodo para elimintar carrito

router.delete('/delete/:cid',async(req,res)=>{
    const cartId = req.params.cid;

    try {
        const response = await cartModel.deleteOne({_id:cartId});
        res.status(200).send({result:'Carrito eliminado con exito'})
    } catch (error) {
        console.log(error)
    }
})

// metodo para eliminar producto de carrito

router.delete('/:cid/product/:pid', async(req,res)=>{
    const cartId = req.params.cid;
    const productId = req.params.pid;
    try {
        const cart = await cartModel.findOne({_id:cartId})
        const findIndex = cart.carrito.findIndex((element)=>element.producto._id == productId);
        cart.carrito.splice(findIndex,1)
        const response = await cartModel.findOneAndUpdate({_id:cartId},cart);
        
        res.status(200).send({result:'Se elimino producto correctamente'})

    } catch (error) {
        console.log(error)
    }
})

// metodo para eliminar todo los productos del carrito

router.delete('/:cid', async(req,res)=>{
    const cartId = req.params.cid;
    try {
        const cart = await cartModel.findOne({_id:cartId});
        const length = cart.carrito.length;
        const deleteProduct = cart.carrito.splice(0,length)

        const response = await cartModel.findOneAndUpdate({_id:cartId},cart);
        
        res.status(200).send({status:'succes', result:'Su carrito fue vaciado correctamente'})

    } catch (error) {
        console.log()
    }
})






module.exports = router;