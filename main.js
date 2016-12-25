//var Spooky = require('./SpookyJS/lib/spooky');
var Spooky = require('spooky');

var spooky = new Spooky({
  casper:{
    verbose: true
  },function(err){
    console.log("its working");
  }
})
console.log("sdlnl");

/*

var casper = require('casper').create({
  verbose: true,
  logLevel: 'debug'
});

var username, password;
casper.start();
casper.userAgent('Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:47.0) Gecko/20100101 Firefox/47.0');

casper.thenOpen("https://www.instagram.com/accounts/login/",function(){
  this.waitForSelector('form[class="rwf8p"]');
  this.fill('form[class="_rwf8p"]',{
    'username': casper.cli.get(0),
    'password': casper.cli.get(1)
  });
  casper.then(function(){
    casper.debug("r"+this.getHTML())
  })
});


casper.run();
*/
/*
const rl = readline.createInterface({
  input : process.stdin,
  output: process.stdout
});

console.log("Login with facebook(y/n)? ");

rl.on('line',function(flag){
  rl.close();
  if(flag == 'y'){

  }
  else {
    console.log("Enter username and password(space separated)...");
    rl.on('line',function(inp){
      username = inp.split(" ")[0];
      password = inp.split(" ")[1];

      casper.start();
      this.echo(process.argv[2]);
      casper.userAgent('Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:47.0) Gecko/20100101 Firefox/47.0');

      casper.thenOpen("https://www.instagram.com/accounts/login/",function(){
        this.waitForSelector('form[class="rwf8p"]');
      });

      casper.then(function(){
        this.fill('form[class="rwf8p"]',{
          'username': username,
          'password': password
        },true);
        console.log(this.getHTML());
      })

      casper.then(function(){
        this.clickLabel('Profile','a')
      });

      casper.then(function(){
        this.waitForSelector('section[class="_8f735"]');
      });
      casper.then(function(){
        this.echo(this.getHTML());
      })
    })
  }
});

casper.run();
*/
