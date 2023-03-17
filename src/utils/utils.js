const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../constants/constants');

const generateToken = (user)=>{
    const token = jwt.sign({...user},SECRET_KEY,{expiresIn:'24h'})

    return token
};

const authToken = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).send({error:'Not authenticated'})
    }else{
        const token = authHeader.split(" ")[1];
        jwt.verify(token,SECRET_KEY,(error,credential)=>{
            if(error){
                return res.status(403).send({error:'Not authorized'})
            }else{
                req.user = credential.user
                next();
            }
        })
    }
}

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies['userData'];
    }
    return token;
  };
  
  module.exports = {
    generateToken,
    cookieExtractor,
    authToken
  };