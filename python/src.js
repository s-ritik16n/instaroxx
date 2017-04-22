const request = require('request');
const child_process = require('child_process');
const http = require('http');
const express = require('express');
const path = require('path');
//var spawn = child_process.spawnSync("python",["src.py"])
//console.log(spawn.stdout.toString());
var app = express()

app.set("public",__dirname)

app.route("/").
get(function(req,res){
  res.sendFile(path.join(__dirname,"index.html"))
}).
post(function(req,res){
  var spawn = child_process.spawnSync("python",["src.py"])
  res.end(spawn.stdout.toString())
})
app.listen(5000,function(){
  console.log("all eyes at 5000");
})
