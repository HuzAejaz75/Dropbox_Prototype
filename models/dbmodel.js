const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const db = mysql.createPool({
    connectionLimit:50,
    host:'localhost',
    user:'root',
    password:'12345',
    database:'dropbox_userdb'
});
db.getConnection((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('connected to db');
    }
});

module.exports={
    addUser: function(newUser,callback){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.PASSWORD,salt,(err,hash)=>{
                if(err) throw err;
                newUser.PASSWORD=hash;
                let sql = 'INSERT INTO UserCredentials SET ?';
                let query = db.query(sql,newUser,callback);   
            });
        });
    },
    getOneUser: function(firstname,callback){
        console.log('what?')
        console.log(firstname);
        let sql = `SELECT * FROM UserCredentials WHERE FIRSTNAME = ?`;
        let query = db.query(sql,firstname,callback);
        console.log('querying');
        console.log(query);
    },
    passwordMatch:function(sentPassword,hash,callback){
       console.log(hash);
        bcrypt.compare(sentPassword,hash,(err,isMatch)=>{
            if (err) throw err;
            callback(null,isMatch);
        })
    }
}

    

