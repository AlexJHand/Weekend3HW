// Requires 
var express = require('express');
var app = express();
var bodyparser = require('body-parser');

// Require routers
var indexRouter = require('./routes/index');
var tasksRouter = require('./routes/tasks');

// Global variables
var port = 3001;

// Uses
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static('public'));

// Routes
app.use('/', indexRouter);
app.use('/tasks', tasksRouter);


// Listener
app.listen(port, function(){
    console.log('Listening on port: ', port);
});