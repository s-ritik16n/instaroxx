var username_field = document.getElementById('lfFieldInputUsername');

username_field.value = "";

var password_field = document.getElementById('lfFieldInputPassword');

password_field.value = "";

And instead of submitting the form, I sent a click event on the button element.

The following code is actually for PhantomJS, but you can probably convert it to the CasperJS API.

// Create a page object

var page = require('webpage').create();

page.onConsoleMessage = function(msg){
  console.log("Message: "+msg);
}

page.onNavigationRequested = function(url, type, willNavigate, main){
  console.log("URL: "+url);
  console.log("type: "+type);
  console.log("willNavigate? : "+willNavigate);
  console.log("frame?: "+main);
}


// Open the page


page.open('https://instagram.com/accounts/login/');
// do other stuff like filling the form fields

// Send the click event

var point = page.evaluate(function () {

var element = document.getElementsByTagName('button')[0];

var rect = element.getBoundingClientRect();

return {

x: rect.left + Math.floor(rect.width / 2),

y: rect.top + Math.floor(rect.height / 2)

};

});

page.sendEvent('click', point.x, point.y);
