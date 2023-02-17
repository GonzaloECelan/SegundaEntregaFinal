const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');

// importaciones archivos
const conexionMD = require('./config/db.config');
const routerProduct = require('./routes/product.routes');
const routerCart = require('./routes/cart.routes');
const {button} = require('./dom');


const app = express();

// middlewares
app.use(express.static(__dirname + './public'));
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({extended:true}));





const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, ()=>{
    console.log('Conexion exitosa al puerto 8080')
});

app.use('/api/product',routerProduct);
app.use('/api/carts',routerCart);


