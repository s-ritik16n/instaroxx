var bodyParser = require('body-parser');
var express = require('express');
var app = express();
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
});

app.get('/home',function(req,res){
  req.session.code = req.query.code;
  var data = JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "authorizaton_code",
      redirect_url: "https://igroxx.herokuapp.com/home",
      code: "code"
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
    var p1 = new Promise(function(resolve, reject) {
      var req = https.request(options,function(response){
        response.on('data',function(chunk){
          resolve(chunk)
        })
      })
    });
    p1.then(function(val){
      req.session.data = chunk;
    })
    req.write(data);
    req.end();
    res.redirect('/home2')
})

app.get('/home2',function(req,res){
  res.send(req.session.data);
})

app.listen(app.get('port'),function(){
  console.log("All eyes at "+process.env.PORT);
});
