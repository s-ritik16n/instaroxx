var https = require('https');

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
var req = https.request(options,function(response){
    response.on('data',function(chunk){
      console.log("Data: "+chunk);
    })
    response.on('error',function(e){
      console.log("Error: "+e);
    })
  })
  req.write(data);
