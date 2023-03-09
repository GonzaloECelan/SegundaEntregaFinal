const {Router} = require('express');
const passport = require('../middlewares/passport');
// const {generateToken,authToken} = require('../utils/utils')



const router = Router();



router.get('/login', async (req,res)=>{
    return res.render('login')
  })

router.get('/register', async (req,res)=>{
    return res.render('register')
  })

router.post('/register', passport.authenticate('register',{failWithError:'/error'}),
async(req,res)=>{
    const sessionUser = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
      };
   req.session.user = sessionUser

    return res.redirect('/api/session/login')
      

    })

router.post('/login', passport.authenticate('login',{failWithError:'/error'}),
async(req,res)=>{
    if(!req.user){
        return res.status(400).send({status:'error', error:'Usuario invalido'})
    }else{
        const sessionUser = {
            firts_name: req.user.firts_name,
            last_name: req.user.last_name,
            age:req.user.age,
            email: req.user.email
            
        }
        req.session.user = sessionUser
    
        return res.redirect('/api/product/home')
    }
})

router.get('/logout', async (req,res)=>{
    try {
        req.session.destroy(err=>{
          if(err){
            console.log(error)
          }else{
            return res.redirect('/api/session/login')
          }
        })
    
      } catch (error) {
        console.log(error)
      }
})

router.get('/current',async(req,res)=>{
res.send({status:'succces',payload:req.user})
})




module.exports = router;