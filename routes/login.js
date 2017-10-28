const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const dbmodel = require('../models/dbmodel');
const passport = require('passport');
var fs = require("fs");
var formidable = require('formidable');
var multer = require('multer');
var path = require('path');
var uuid = require('uuid');
var UserCreds  = require('../models/mongomodels');
var FileData = require('../models/filedatamodel');
var GroupData = require('../models/group_names');

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        console.log(file);
        cb(null,path.join(__dirname,'../images/'));
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.fieldname);
    }
});

var upload = multer({storage:storage});

router.post('/register',(req,res,next)=>{
    console.log('entered');
    let newUser = new UserCreds({
        FIRSTNAME: req.body.firstname,
        LASTNAME:  req.body.lastname,
        PASSWORD:  req.body.password,
        EMAIL:     req.body.email
    });
    UserCreds.addUser(newUser,(err,user)=>{
        if(err)
        {
            res.json({success:false,msg:'failed to register user'})
        }
        else
        {
            res.json({success:true,msg:'registered'});
        }
    });
    
    /*mysql code
    dbmodel.addUser(newUser,(err,wow)=>{
        if(err)
        {
            res.json({success:false,msg:'failed to register user'})
        }
        else
        {
            res.json({success:true,msg:'registered'});
        }
    });*/

//mongodb code


});
/*
router.post('/upload',(req,res,next)=>{

    
    var form = new formidable.IncomingForm();
    console.log(req.body.filepath);
    form.parse(req, function (err, fields, files) {
        console.log('if you persist resist and keep on moving.very easy.');
        var oldpath = files.filetoupload.path;
        console.log('oldpath');
        console.log(oldpath);
    });
   // console.log(req.body.filepath);
    //let filepath = req.body.filepath;

    dbmodel.uploadfile(filepath,(err,file)=>{
        if(err){
            console.log(err);
            res.json({success:false,msg:'failed to upload'});
        }
        else{
            res.json({success:true,msg:'upload successful'});
        }
    });
});
*/

router.post('/upload',upload.single('fileup'),(req,res,next)=>{
    var data = {
        "id": uuid.v4(),
        "filename":req.file.originalname
    }
    //dbmodel.uploadfile(data,(err,file)=>{
 FileData.uploadfile(data,(err,file)=>{
        if(err){
            console.log(err);
            res.json({success:false,msg:'failed to upload'});
        }
        else{
           
            res.json({success:true,msg:'upload successful',});
        }
    });
});

router.get('/getsessiondata',(req,res,next)=>{

});



router.post('/download',(req,res,next)=>{
    
    console.log(req.body.email);
    let email = req.body.email;

    dbmodel.downloadfile(email,(err,rows, file)=>{
        if(err){
            console.log(err);
            res.json({success:false,msg:'failed to download'});
        }
        else
        if(rows[0]!=null){
           var hey =rows[0];
           console.log(hey.FILE_DATA);
           fs.writeFile("../images/test.jpg", hey.FILE_DATA, (err,file)=>{
            if(err){
                console.log(err);
                res.json({success:false,msg:'failed to upload'});
            }
            else{
                res.json({success:true,msg:'download successful'});
            }
        });
           //console.log(bufferBase64);
            
            res.json({success:true,msg:'download was successful'});
        }
        else{
            res.json({success:false,msg:'failed to download'});
        }
       
            
        
        /*else{
            
            var buffer = new Buffer( file );
            var bufferBase64 = buffer.toString('base64');
            console.log("yahan pyaar");
            console.log(bufferBase64);
            /*var matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};
        
            if (matches.length !== 3) {
                return new Error('Invalid input string');
            }
        
            response.type = matches[1];
            response.data = new Buffer(matches[2], 'base64');
            
            //var buffer = new Buffer( file );
            //var bufferBase64 = data.toString('base64');
           
            fs.writeFile("/Users/huzaifa.aejaz/Documents/DropBox/images/test.jpg", bufferBase64, (err,file)=>{
                if(err){
                    console.log(err);
                    res.json({success:false,msg:'failed to upload'});
                }
                else{
                    res.json({success:true,msg:'download successful'});
                }
            });
            res.json({success:true,msg:'download.....successful'});
    }*/
    });
});



router.post('/login',(req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
   
//dbmodel.getOneUser(email,(err,user)=>{
    UserCreds.getUserByEmail(email,(err,user)=>{
        if(err) throw err;
        if(!user){
            return res.json({success:false,msg:'user not found'});
        }
       
        UserCreds.passwordMatch(password,user.PASSWORD,(err,isMatch)=>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({user},'mySecret',{
                    expiresIn:604800
                });
                    res.json({
                        success:true,
                        token: 'JWT '+token,
                        user:{
                            id: user.id,
                            firstname:user.FIRSTNAME,
                            lastname:user.LASTNAME,
                            password:user.PASSWORD,
                            email:user.EMAIL
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


router.get('/getalldata',(req,res,next)=>{
    var email = req.query.email;
    FileData.getfiles(email,(err,data)=>{
        if(err){
            res.json({success:false,msg:'Data is mismatched'});
        }
        else{
            res.json(data);
        }
    });
})

router.post('/groupadd',(req,res,next)=>{
    var groupname = req.body.grp_name;
    var admin = req.body.admin;
    console.log('group name to be deleted'+ groupname);
    var data = {
        groupname: groupname,
        admin:admin
    }
    GroupData.addGroup(data,(err,group)=>{
        if(err) throw err;
        else{
            GroupData.getAllGroups(admin,(err,groups)=>{
                res.json(groups);
            })
        }
    });
});

router.get('/groupsget',(req,res,next)=>{
   var email=req.query.email;
   console.log(email);
    GroupData.getAllGroups(email,(err,groups)=>{
        if(err) throw err;
        else{
                res.json(groups);
            }
        });
    });

module.exports = router;