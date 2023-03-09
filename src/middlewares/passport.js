const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {userModel} = require('../models/user.model');
const {hashPassword, validPassword} = require('../utils/hash');
// const {cookieExtractor} = require('../utils/utils')
// const {SECRET_KEY} = require('../constants/constants')
// const jwtPassport = require('passport-jwt');


passport.use('register', new LocalStrategy({passReqToCallback:true, usernameField:'email'},
async(req,username,password,done)=>{
    const {firts_name, last_name, age} = req.body;
const user = await userModel.findOne({email: username});

try {
    if(user){
        return done(null,false)
    }else{
        const newUser = {
    firts_name,
    last_name,
    age,
    email:username,
    password: hashPassword(password)
        }
    const response = await userModel.create(newUser);
    const sessionUser = {
        _id: response._id,
        firts_name: response.first_name,
        last_name: response.last_name,
        email: response.email,
        age: response.age
    }
    return done(null,sessionUser)
    }

} catch (error) {
    done(error)
}

}))

passport.use('login', new LocalStrategy({usernameField:'email'},
async(username,password,done)=>{
    try {
        const user = await userModel.findOne({email:username})
    if(!user && !validPassword(user,password)){
        return done(null,false)
    }else{
        return done(null,user)
    }

    } catch (error) {
        done(error)
    }

}))

// const JwtStrategy = jwtPassport.Strategy;
// const ExtractJwt = jwtPassport.ExtractJwt;


// passport.use(new JwtStrategy(
//     {
//       jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
//       secretOrKey: SECRET_KEY,
//     },
//     async (jwt_payload, done) => {
//       try {
//         // const user = await userModel.findOne({ email: jwt_payload.email});
//         // if (!user) {
//         //   return done(null, false, { messsages: 'User not found'});
//         // }
//         return done(null, jwt_payload);
//       }
//       catch(error) {
//         return done(error);
//       }
//     }
//   ));
  


passport.serializeUser((user,done)=>{
    return done(null,user._id)
    })

passport.deserializeUser(async(id,done)=>{
        const user = await userModel.findById(id);
      done(null, user);
    })

module.exports = passport;