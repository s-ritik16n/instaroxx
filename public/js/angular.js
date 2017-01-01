'use strict'

var app = angular.module('myapp',['ngRoute','ngResource']);

app.config(function($routeProvider,$locationProvider){
  $routeProvider.
  when('/',{
    templateUrl: "partials/main.html",
    controller: "main"
  }).
  when('/home',{
    templateUrl: "partials/home.html",
    controller: "main"
  })
  $locationProvider.html5Mode({
    enabled: true
  })
});

app.controller("main",function($scope,$location){
  $scope.loadHash = function(){
    $scope.hash = $location.hash()
  }
})
