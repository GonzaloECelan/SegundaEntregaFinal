const mongoose = require('mongoose');
const {Router} = require('express');

const {productModel} = require('../models/product.model');

const router = Router();

router.get('/home', async(req,res)=>{
    const limit = req.query.limit;

    
    try {
        if(!limit){
            const response = await productModel.find().lean().sort({price:1}).limit(10);
            const data = {
                title: "Productos",
                product:response
            }
            res.render('product',data);
        }else{
            const response = await productModel.find().lean().limit(parseFloat(limit));
            const data = {
                title: "Productos",
                product:response
            }
            res.render('product',data);
        }
 
        // res.status(200).send({result:'success', products: response})

    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async(req,res)=>{
    const productId = req.params.id;
    try {
        const response = await productModel.find({_id:productId});
        res.status(200).send({result:'success', ProductId: response})
    } catch (error) {
        console.log(error)
    }
})

router.post('/add', async(req,res)=>{
   const createProduct = req.body
    try {
        const response = await productModel.create(createProduct)
        res.status(200).send({result:'success', addProduct: response})
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async(req,res)=>{
    const updateId = req.params.id;
    const updateProduct = req.body;

    try {
        const response = await productModel.findByIdAndUpdate(updateId,updateProduct,{new:true});
        res.status(200).send({result:'success', update: response})
    } catch (error) {
        console.log(error)
    }
})

router.delete('/delete/:id', async(req,res)=>{
    const deleteId = req.params.id;
    try {
        const response = await productModel.findByIdAndDelete(deleteId);
        res.status(200).send({result:'success', productDelete: response})
    } catch (error) {
        console.log(error)
    }
})



module.exports = router;