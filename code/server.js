var app = require('./controller/app.js');

var port=8081

var server = app.listen(port, function () {

    console.log('Web App Hosted at http://localhost:%s',port);

});

// const express = require('express');
// const app = express();
// const http = require('http');
// const hostname = 'localhost';
// const port = 3000;

// app.get("/index", function(req,res){
//   res.send("Hi there, Welcome first assigment");
// })

// app.get("/animal", function(req,res){
//   res.send("Hi there, animal");
// })

// app.get("/bye", function(req,res){
//   res.send("Hi there, Bye");
// })

// app.get("*", function(req,res){
//   res.send("!@#!$@$@$");
// })



// app.listen(port, hostname, () => {
//   console.log(`Server started and accessible via http://${hostname}:${port}/`);
// });
