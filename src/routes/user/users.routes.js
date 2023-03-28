const {CustomRouter} = require('../../routes/custom.routes')
const config = require('../../config/env.config')


class UserCustom extends CustomRouter{
   
   
    init(){

this.post('/register',async (req,res)=>{
    const {firts_name, last_name, email, age, password} = req.body
    const Admin = process.env.ADMIN;
    const PaswordAdmin = process.env.PASSWORD
    try {
        const user = {
            
        }
        
        
    } catch (error) {
        console.log(error)
    }
})

   }
}