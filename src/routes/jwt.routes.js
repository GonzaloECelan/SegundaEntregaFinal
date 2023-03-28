const {Router} = require('express');
const passport = require('../middlewares/jtw.passport');
const {generateToken,authToken} = require('../utils/utils');
const {authorization} = require('../middlewares/authorization')
const {passportCustom} = require('../middlewares/passport.custum');
const {hashPassword, validPassword} = require('../utils/hash')
const {userModel} = require('../models/user.model');



const router = Router()


router.get('/login', async (req,res)=>{
  
  return res.render('login')
 
})

router.get('/register', async (req,res)=>{
  return res.render('register')
})


router.post('/register', async(req,res)=>{
 const {firts_name, last_name, email, age, password} = req.body
 
  try {
    const user = await userModel.findOne({email:email})
    // if(user){
    //   return res.send({message:'Este usuario ya esta registrado'})
    // }else{

      const newUser = {
        firts_name,
        last_name,
        age,
        email,
        provider: null,
        password:hashPassword(password)
      }
      const response = await userModel.create(newUser)
      const token = generateToken({firts_name});
      res.cookie('User',token,{
        maxAge:60*60
      })
  
      return res.redirect('/login');
     
    


  } catch (error) {
    console.log(error)
  }
})

router.post('/login', async (req, res) => {
    const { email, password} = req.body;
    try {
      const user = await userModel.findOne({email:email});
      if (email === user.email && validPassword(user,password)) {
        const access_token = generateToken({email,password, role:'user'});
        res.cookie('userLogin', access_token, {
          maxAge: 60*60*1000,
          httpOnly:true,
         
      
        });
        return res.send({status:'succes', message:'ingreso correctamente'});
      }else{
        return res.send('datos incorrectos')
      }
    } catch (error) {
      console.log(error)
    }
  });

router.get('/current',authToken , async(req,res)=>{
    res.send({payload: req.user})
})


module.exports = router;