var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mysql = require('mysql');
var cors = require('cors');
var passport = require('passport');

var app = express();
const routes= require('./routes/login');

//port initialization
const port = 8080;
//middleware
app.use(cors());
//get static folder for front-end
app.use(express.static(path.join(__dirname,'public')));
//body-parser

app.use(bodyParser.json());
//routing
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


app.use('/routes',routes);
app.get('/',(req,res)=>{
    res.send("Invalid end point");
});

app.listen(port,()=>{
    console.log("server has been started on port "+port);
});