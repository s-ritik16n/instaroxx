var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var https = require('https');
var fs = require('fs');
var session = require('express-session');
var request = require('request');
var url = require('url');

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

app.get('/home*',function(req,res){
  //urlObj = url.parse(req.path).hash()
  res.json(req);
  /*
  var code  = req.query.code;
  var resstr = {};
  resstr['code'] = code;

  var data = JSON.stringify({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: "authorizaton_code",
    redirect_url: "https://igroxx.herokuapp.com/home",
    code: code
  })

  var options = {
    host: 'https://api.instagram.com',
    path:'/oauth/access_token',
    method:'POST',
    port: 80,
    headers:{
      'Content-Type':'application/json',
    }
  }
  var timeout = false;
  var req = https.request(options,function(resp){
    resp.on('data',function(chunk){
      resstr['data'] = chunk;
      timeout = true;
    })
    resp.on('end',function(){
      timeout = true;
    })
    resp.on('error',function(e){
      res.json(e);
    })
  })
  setTimeout (function() {
    req.write(data);
  },8000);
  req.end()
  res.json(resstr);*/
  /*
  var p1 = new Promise(function(resolve, reject) {

  });
  p1.then(
    function(val){
      res.redirect('/home2/'+val);
    }
  )
  req.setTimeout(50000,function(){
    res.send(resstr.data)
  });*/
});

app.get('/home2/:resp',function(req,res){
  res.send(req.params.resp);
})

app.listen(app.get('port'),function(){
  console.log("All eyes at "+process.env.PORT);
});
