var args = require('system').args;
var page = require('webpage').create();
var username = args[1];
var password = args[2];
var redirectURL = '';
/*
page.open('https://www.instagram.com/accounts/login',function(){
  page.includeJs('https://code.jquery.com/jquery-1.12.4.js',function(){
    page.evaluate(function(){
      $("input[name='username']").val("trialaccount012");
      $("input[name='password']").val("#Date20111995");
      $("button[class='_aj7mu']").click();
      redirectURL = page.onResourceReceived(function(response){
        return response.url;
      })
  });
})
  console.log(redirectURL);

  phantom.exit();
})
*/
var loadInProgress = false;

var settings = {
  operation : "POST",
  encoding: "UTF-8",
  headers:{
    "Content-Type": "application/json"
  },
  data: JSON.stringify({
    username: "",
    password: ""
  })
};

page.onLoadStarted = function() {
  loadInProgress = true;
  console.log("load in progress");
}

page.onLoadFinished = function(){
  loadInProgress = false;
  console.log("load finished");
}

page.onConsoleMessage = function(msg){
  console.log("Message: "+msg);
}

page.onNavigationRequested = function(url, type, willNavigate, main){
  console.log("URL: "+url);
  console.log("type: "+type);
  console.log("willNavigate? : "+willNavigate);
  console.log("frame?: "+main);
}

function login(){
  page.open('https://www.instagram.com/accounts/login',function(status){
    console.log(status);
  })
}

function home(){
  page.open('https://www.instagram.com/accounts/login',function(status){
    console.log(page.content);
    page.includeJs('https://code.jquery.com/jquery-1.12.4.js',function(){
      page.evaluate(function(){
        $("input[name='username']").val("");
        $("input[name='password']").val("");
        $("button[class='_aj7mu']").click();
    });
  });
  })
}

setInterval(function(){
  if(!loadInProgress){
    home();
  }
},5)
