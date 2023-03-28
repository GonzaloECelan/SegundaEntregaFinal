const {Router} = require('express');

class CustomRouter {
    constructor(){
        this.router = Router(),
        this.init()
    }

    init(){

    }

    getRouter(){
        return this.router;
    }
    
    applyCallbacks(callbacks){
        return callbacks.map((callbacks)=>async(...params)=>{
            try {
                await callbacks.apply(this,params); 
            } catch (error) {
                console.log(error)
                params[1].status(500).send(error)
            }
        })
            }
        
            generateCustomResponses = (req, res, next) => {
                res.sendSuccess = (payload) => res.status(200).json({ status: 'success', payload });
                res.sendError = (error) => res.status(500).json({ status: 'error', error });
                next();
            }

            get(path, ...callbacks) {
                this.router.get(
                path,
                this.generateCustomResponses,
        
                this.applyCallbacks(callbacks)
                );
              }
            
              post(path, ...callbacks) {
                this.router.post(
                path,
                this.generateCustomResponses,
              
                this.applyCallbacks(callbacks)
                );
              }
            
              put(path, ...callbacks) {
                this.router.put(
                path,
                this.generateCustomResponses,
              
                this.applyCallbacks(callbacks)
                );
              }
            
              delete(path, ...callbacks) {
                this.router.delete(
                path,
                this.generateCustomResponses,
                
                this.applyCallbacks(callbacks),
                );
              }
}


module.exports = {CustomRouter};