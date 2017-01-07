var page = require('webpage').create();
var username = "myusername";
var password = "password";
page.viewportSize = { width: 1024 , height: 600 };
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36';

page.open('https:/instagram.com/accounts/login/', function() {

    var ig = page.evaluate(function() {
        function getCoords(box) {
            return  {
                x: box.left,
              y: box.top
            };
        }

        function getPosition(type, name) {
            // find fields to fill
            var input = document.getElementsByTagName(type);
            for(var i = 0; i < input.length; i++) {
                if(name && input[i].name == name)  return getCoords(input[i].getBoundingClientRect());
                else if(!name && input[i].className)    return getCoords(input[i].getBoundingClientRect()); // this is for login button
            }
        }
        return {
            user: getPosition('input', 'username'),
            pass: getPosition('input', 'password'),
            login: getPosition('button')
        };
			});

			     // fill in data and press login
			     page.sendEvent('click',ig.user.x, ig.user.y);
			     page.sendEvent('keypress', '');

			     page.sendEvent('click',ig.pass.x, ig.pass.y);
			     page.sendEvent('keypress', '');
			     page.sendEvent('click', ig.login.x, ig.login.y);
           var ig1 = [];
           var cookies = [];
           for(var i in phantom.cookies){
             console.log(phantom.cookies[i].name+": "+phantom.cookies[i].value+" : "+phantom.cookies[i].domain);
             phantom.addCookie({
               'name':phantom.cookies[i].name,
               'value': phantom.cookies[i].value,
               'domain':phantom.cookies[i].domain
             })
           }
           setTimeout(function(){
             ig1 = page.evaluate(function() {
                 function getCoords(box) {
                     return  {
                         x: box.left,
                       y: box.top
                     };
                 }

                 function getPosition(type, href) {
                     // find fields to fill
                     var input = document.getElementsByTagName(type);
                     for(var i = 0; i < input.length; i++) {
                         if(href && input[i].href == href)  return getCoords(input[i].getBoundingClientRect());
                     }
                 }
                 return {
                     prof: getPosition('a','')
                 };
         			});
           },2000);
           page.sendEvent('click',ig1.x,ig1.y);

			    setTimeout(function() {
              //console.log(cookies[0]);
			        page.render('/home/ritik/WEB/instagram.png');
			        phantom.exit();
			    }, 5000);
        })

page.onConsoleMessage = function(msg){
  console.log(msg);
}
