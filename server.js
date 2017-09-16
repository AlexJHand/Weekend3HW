// Requires 
var express = require('express');
var app = express();
var bodyparser = require('body-parser');

// Global variables
var port = 3001;

// Uses
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));

// Listener
app.listen(port, function(){
    console.log('Listening on port: ', port);
});