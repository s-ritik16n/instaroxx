var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var exec = require('child_process').exec;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));

app.route('/')
.get(function(req,res){
  res.render('index');
})
.post(function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  var cmd = ['phantomjs','phantom.js',username,password].join(' ');
  exec(cmd,function(err){
    if(err){
      return
    }
    return res.json({saved: true})
  });
})

app.listen('3000')
