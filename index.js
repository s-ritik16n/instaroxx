var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var https = require('https');
var session = require('express-session');

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
      redirect_uri: "...",
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
    var request = https.request(options,function(resp){
      resp.on('data',function(chunk){
        req.session.data = chunk.toString();
      })
    })
    request.write(data);
    request.end();
    setTimeout(function(){
      res.json(data)
    },5000);
})

app.listen(app.get('port'),function(){
  console.log("All eyes at "+process.env.PORT);
});
