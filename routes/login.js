const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const dbmodel = require('../models/dbmodel');
const passport = require('passport');

router.post('/register',(req,res,next)=>{
    console.log('entered');
    let newUser = {
        FIRSTNAME: req.body.firstname,
        LASTNAME:  req.body.lastname,
        PASSWORD:  req.body.password,
        EMAIL:     req.body.email
    }
    dbmodel.addUser(newUser,(err,wow)=>{
        if(err)
        {
            res.json({success:false,msg:'failed to register user'})
        }
        else
        {
            res.json({success:true,msg:'registered'});
        }
    });
});


router.post('/login',(req,res,next)=>{
    const firstname = req.body.firstname;
    const password = req.body.password;
   
    dbmodel.getOneUser(firstname,(err,user)=>{
        if(err) throw err;
        if(!user){
            return res.json({success:false,msg:'user not found'});
        }
       
        
        //console.log(user[0].PASSWORD);
        
        dbmodel.passwordMatch(password,user[0].PASSWORD,(err,isMatch)=>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({user},'mySecret',{
                    expiresIn:604800
                });
                res.json({
                    success:true,
                    token: 'JWT '+token,
                    user:{
                        id: user[0].id,
                        firstname:user[0].FIRSTNAME,
                        lastname:user[0].LASTNAME,
                        password:user[0].PASSWORD,
                        email:user[0].EMAIL
                    }
                });

            }
            else{
                return res.json({success:false,msg:'wrong password'});  
            }
        });
    
    });

});


router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
   
    res.json({user: req.user});
});

module.exports = router;