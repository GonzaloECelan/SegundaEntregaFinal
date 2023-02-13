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

 

    const {cartId,productId} = req.body;
    try {
        const response = await cartModel.findOneAndUpdate({_id:cartId},
        {$push:{productos:productId}})
        res.status(200).send({result:'success', addProduct: response})
       
        
    } catch (error) {
        console.log(error)
    }
})

// metodo para traer productos de carrito con populate

router.get('/populate/:cid', async(req,res)=>{
    const cartId = req.params.cid;
    try {
        const response = await cartModel.findOne({_id:cartId}).lean();
        const data = {
            h1:'Mi carrito',
            username: response.username,
            cart: response.productos,
            cantidad:0
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
        const findIndex = cart.productos.findIndex((element)=>element._id == productId);
        cart.productos.splice(findIndex,1)
        const response = await cartModel.findOneAndUpdate({_id:cartId},cart);
        

    

        res.send({response})

    } catch (error) {
        console.log(error)
    }
})

// metodo para eliminar todo los productos del carrito

router.get('/:cid', async(req,res)=>{
    const cartId = req.params.cid;
    try {
        const cart = await cartModel.findOne({_id:cartId});
        const length = cart.productos.length;
        const deleteProduct = cart.productos.splice(0,length)

        const response = await cartModel.findOneAndUpdate({_id:cartId},cart);
        
        res.status(200).send({result:'succes', message:'Su carrito fue vaciado correctamente'})

    } catch (error) {
        console.log()
    }
})

// metodo para actualizar cantidad de productos

router.get('/:cid/products/:pid',async(req,res)=>{
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const {cantidad} = req.body;
    try {
        const cart = await cartModel.findOne({_id:cartId});
        const findProduct = cart.productos.find(elemet => elemet._id == productId );
        if(findProduct == productId){
        
            const cantidad = findProduct.quantity
        }
        console.log(findProduct)


    } catch (error) {
        console.log(error)
    }
})






module.exports = router;