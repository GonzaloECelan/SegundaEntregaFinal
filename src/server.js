const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')




const conexionMD = require('./config/db.config');
const routerProduct = require('./routes/product.routes');
const routerCart = require('./routes/cart.routes');
const sessionRout = require('../src/routes/user.session.routes');
const config = require('./config/env.config');

// const jwtRout = require('../src/routes/jwt.routes')




const app = express();
const PORT = process.env.PORT || 8080;


// middlewares

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
// app.use(session({
//     resave:false,
//     saveUninitialized:false,
//     secret:'secret-51',
//     store: MongoStore.create({
//         ttl:1000,
//         mongoUrl: 'mongodb+srv://gonzalo:coder@ecommerce.exk6w0e.mongodb.net/ecommerce?retryWrites=true&w=majority'
//     })
// }))
app.use(passport.initialize());
// app.use(passport.session())





// rutas
// app.use('/api/product',routerProduct);
// // app.use('/api/carts',routerCart);
// // app.use(jwtRout)




const server = app.listen(PORT, ()=>{
    console.log('Conexion exitosa al puerto 8080')
});
