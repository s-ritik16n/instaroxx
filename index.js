var bodyParser = require('body-parser');
var express = require('express');
var app = express();
//var login = require('./login');
var https = require('https');
var session = require('express-session');
var request = require('request');
var spawn = require('child_process').spawn;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: false
}))

app.set('port',process.env.PORT);

app.get('/',function(req,res){
  res.render('index')
})

app.get('/home',function(req,res){
  res.render('index')
})

app.get('/home2/:resp',function(req,res){
  res.send(req.params.resp);
})

app.listen(app.get('port'),function(){
  console.log("All eyes at "+process.env.PORT);
});
