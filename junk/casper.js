var casper = require('casper').create({
  'logLevel':'debug'
});
var mouse = require('mouse').create(casper);

casper.options.pageSettings.javascriptEnabled = true;

casper.start('https://www.instagram.com/accounts/login',function(){
  this.echo(this.getCurrentUrl())
  this.sendKeys('input[name="username"]','',{keepFocus: true});
  this.sendKeys('input[name="password"]','',{keepFocus: true});
  this.click('button._taytv');
  this.capture('screen.png');
});

casper.waitForSelector("form._taytv",function(){
  this.sendKeys('input[name="username"]','',{keepFocus: true});
  this.sendKeys('input[name="password"]','',{keepFocus: true});
  this.click('button._taytv');
  casper.waitTimeOut(5000,function(){
    this.capture('/home/ritik/screen.png');
  });
},10000)

casper.run()
