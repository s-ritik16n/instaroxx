var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var https = require('https');
var session = require('express-session');
var querystring = require('querystring');
var async = require('async');

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
  var data = querystring.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "authorizaton_code",
      redirect_uri: "https://igroxx.herokuapp.com/",
      code: req.session.code
  })
  var options = {
    headers:{
      'content-type': 'application/x-www-form-urlencoded'
    },
      hostname: 'api.instagram.com',
      path: '/oauth/access_token',
      method:'POST',
      port:443
    }
    req.session.data = '';
    async.waterfall([
      function(callback){
        var request = https.request(options,function(resp){
          resp.on('data',function(chunk){
            req.session.data = chunk.toString();
          })
        })
        request.write(data);
        request.end();
        callback(null,req.session.data);
      }
    ],function(err,results){
      res.redirect(303,'/home2');
    })

    /*setTimeout(function(){
    },5000);*/
})

app.get('/home2',function(req,res){
  res.json(req.session.data+"sds");
})

app.listen(app.get('port'),function(){
  console.log("All eyes at "+process.env.PORT);
});
