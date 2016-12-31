var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');
var session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.use(session({
  secret: process.env.SECRET,
}))

app.set('port',process.env.PORT);

app.get('/',function(req,res){
  res.render('index')
})

app.get('/home',function(req,res){
  var code  = req.query.code;
  var resstr = code;
  var data = JSON.stringify({
    client_id: "e3ec1ae4440a4ac8b08ec3c79d3bcae9",
    client_secret: "f44f191ee332442f855d8e7cf003d77c",
    grant_type: "authorizaton_code",
    redirect_url: "https://igroxx.herokuapp.com/home",
    code: code
  })
  var options = {
    host: 'https://api.instagram.com',
    path:'/oauth/access_token',
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    }
  }
  var req = http.request(options,function(resp){
    resp.on('data',function(chunk){
      resstr += chunk;
    })
    resp.on('end',function(){
      res.redirect(303,'/home2');
    })
  })
  req.write(data);
  res.redirect(303,'/home2/'+resstr);
})

app.get('/home',function(req,res){
  res.send(req.session.response);
})

app.listen(app.get('port'),function(){
  console.log("All eyes at "+process.env.PORT);
});
