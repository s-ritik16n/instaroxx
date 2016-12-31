var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var exec = require('child_process').exec;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){
  res.render('index')
})

app.listen('8000',function(){
  console.log("All eyes at 8000");
});
