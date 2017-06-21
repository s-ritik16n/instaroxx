var page = require('webpage').create();
page.settings.userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.82 Safari/537.36';

page.onConsoleMessage = function(msg){
  console.log(msg);
}

page.onUrlChanged  = function(targetUrl){
  console.log(targetUrl);
}

page.onResourceReceived = function(response){
  console.log(response.url);
}

page.open("https://www.instagram.com/accounts/login",function(){

  page.sendEvent('keypress','',null,null,0);
  page.sendEvent('keypress',page.event.key.Tab,null,null,0);
  //page.sendEvent('click',ig.pass.x, ig.pass.y);
  page.sendEvent('keypress', '',null,null,0);
  page.sendEvent('keypress',page.event.key.Tab,null,null,0);
  page.sendEvent('keypress',page.event.key.Tab,null,null,0);
  page.sendEvent('click',null,null,'left');
  phantom.exit();
});
