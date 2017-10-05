const express = require('express');
const router = express.Router();

router.post('/register',(req,res,next)=>{
    res.send('registeration page');
});


router.get('/login',(req,res,next)=>{
    res.send('Login page');
});


router.get('/profile',(req,res,next)=>{
    res.send('profile page');
});

module.exports = router;