const {Router} = require('express');
const passport = require('../middlewares/jtw.passport');
const {generateToken} = require('../utils/utils');
const {authorization} = require('../middlewares/authorization')
const {passportCustom} = require('../middlewares/passport.custum')
const router = Router()

router.post('/login', (req, res) => {
    const { email, password,role} = req.body;
    if (email === '1@gmail.com' && password === '12345') {
      const access_token = generateToken({ email, role});
      res.cookie('demopb22', access_token, {
        maxAge: 60*60*1000,
        httpOnly: true,
      });
      res.json({ payload: 'OK' });
    }
  });

router.get('/current', passportCustom('jwt') 
,authorization('user'), async(req,res)=>{
    res.send({payload: req.user})
})


module.exports = router;