var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mysql = require('mysql');
var cors = require('cors');


var app = express();
const routes= require('./routes/login');
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
//port initialization
const port =8080;
//middleware
app.use(cors());
//get static folder for front-end
app.use(express.static(path.join(__dirname,'public')));
//body-parser
app.use(bodyParser.json());
//routing
app.use('/routes',routes);
app.get('/',(req,res)=>{
    res.send("Invalid end point");
});

app.listen(port,()=>{
    console.log("server has been started on port "+port);
});